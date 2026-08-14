# Dynamic Visitor Counter Implementation

## Purpose

The portfolio requires persistent application state that can change as visitors interact with `docdott.com`.

The first dynamic capability implemented is a visitor counter backed by Amazon DynamoDB and updated through AWS Lambda.

---

## Data Model

A DynamoDB table named `portfolio-metrics` was created using on-demand capacity.

### Partition Key

`metric_id`

### Initial Item

`metric_id = visitor_count`

`count = 0`

The counter is represented as one DynamoDB item containing multiple attributes rather than as separate records.

---

## Lambda Function

A Lambda function named `portfolio-visitor-counter` was created using Python.

Its responsibility is to:

1. Identify the `visitor_count` item.
2. Increment the `count` attribute.
3. Return the updated value.

The counter uses a DynamoDB atomic update rather than a read-modify-write sequence.

This reduces the risk of lost updates when multiple visitors arrive at nearly the same time.

---

## IAM Verification

The function initially failed with an `AccessDeniedException` when attempting the DynamoDB `UpdateItem` operation.

This confirmed that the Lambda execution role did not have implicit DynamoDB access.

A narrowly scoped IAM policy was then added allowing:

`dynamodb:UpdateItem`

only against:

`portfolio-metrics`

The same Lambda test was executed again and succeeded.

---

## Verification

### Initial State

`count = 0`

### Lambda Test

The function executed successfully after the least-privilege IAM permission was added.

### Observed State

`count = 1`

### Status

**PASS**

The test confirms:

**Lambda → IAM authorization → DynamoDB atomic update → updated count returned**

---

## Principle Reinforced

> Code requests an action. IAM determines whether AWS allows it.

Least privilege was verified through failure first, followed by the minimum required permission and a successful retest.

## API Gateway Integration

An HTTP API named `portfolio-api` was created to provide a controlled public interface for the visitor counter.

### Route

`POST /visitor-count`

### Integration

The route invokes:

`portfolio-visitor-counter`

### Stage

`$default`

Automatic deployment is enabled for the default stage.

---

## API Verification

The endpoint was tested from the command line using `curl`.

### Request

`POST /visitor-count`

### Observed Response

```json
{
  "count": 3
}
```

### Status

**PASS**

The successful request confirms the complete application path:

**Client → API Gateway → Lambda → IAM authorization → DynamoDB → Updated counter returned**

---

## Principle Reinforced

> Test one boundary at a time.

The Lambda-to-DynamoDB path was verified before introducing API Gateway.

API Gateway was then tested independently before browser integration.

This reduced troubleshooting scope and made the source of failure easier to identify.

## Engineering Guestbook Submission

A second dynamic capability was added to the portfolio to allow visitors to submit professional guestbook comments.

### DynamoDB

A table named `portfolio-guestbook` was created using on-demand capacity.

Partition key:

`comment_id`

Each guestbook item contains:

* `comment_id`
* `name`
* `comment`
* `created_at`
* `status`

New submissions default to:

`status = pending`

### Lambda Validation

The `portfolio-guestbook-submit` Lambda function accepts only visitor-controlled fields:

* `name`
* `comment`

Lambda generates and controls:

* `comment_id`
* `created_at`
* `status`

Validation rules are applied before any database write occurs.

### Least-Privilege IAM

The guestbook Lambda execution role was granted only:

`dynamodb:PutItem`

against:

`portfolio-guestbook`

This keeps the guestbook function's blast radius limited to its business responsibility.

### API Gateway

The existing `portfolio-api` was extended with:

`POST /comments`

The route integrates with:

`portfolio-guestbook-submit`

### Verification

A request was submitted from an external client.

Observed response:

```json
{
  "message": "Comment submitted for review.",
  "comment_id": "generated-id"
}
```

The new DynamoDB record was verified with:

* the submitted name
* the submitted comment
* a generated identifier
* a server-generated timestamp
* `status = pending`

### Status

**PASS**

The complete submission path is verified:

**Client → API Gateway → Lambda Validation → IAM Authorization → DynamoDB**

### Principle Reinforced

> Public input is proposed by the client. Authoritative application state is established by trusted backend logic.


