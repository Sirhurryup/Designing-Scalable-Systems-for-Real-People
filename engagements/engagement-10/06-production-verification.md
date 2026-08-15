# Production Verification

## Purpose

The portfolio application was deployed to the existing `docdott.com` delivery architecture and tested through the same public path used by real visitors.

The goal was to verify the complete system rather than relying only on isolated service-level tests.

---

## Production Delivery Path

The deployed application follows:

**Visitor → Route 53 → CloudFront → Private S3**

Dynamic features extend the path through:

**Browser JavaScript → API Gateway → Lambda → IAM → DynamoDB**

---

## Verification 01 — Frontend Deployment

The updated portfolio application was uploaded to the existing private S3 origin.

CloudFront cache invalidation was performed to ensure visitors received the updated application assets.

### Result

The redesigned portfolio loaded successfully at:

`https://docdott.com`

**Status: PASS**

---

## Verification 02 — Visitor Counter

The production JavaScript application called the public visitor counter API.

The returned counter value rendered successfully on the live website.

### Verified Path

**Browser → POST /visitor-count → API Gateway → Lambda → DynamoDB**

**Status: PASS**

---

## Verification 03 — Approved Guestbook Read Path

The production website successfully retrieved an approved guestbook comment.

Pending comments remained hidden.

### Verified Path

**Browser → GET /comments → API Gateway → Lambda → DynamoDB**

### Moderation Behavior

**approved → visible**

**pending → hidden**

**Status: PASS**

---

## Verification 04 — Guestbook Submission

A new guestbook comment was submitted from the production website.

The browser displayed a successful submission response.

The resulting DynamoDB item was verified with:

* generated `comment_id`
* submitted name
* submitted comment
* server-generated timestamp
* `status = pending`

The browser was not permitted to determine the moderation state.

### Verified Path

**Browser → POST /comments → API Gateway → Lambda Validation → IAM → DynamoDB**

**Status: PASS**

---

## Production Acceptance Result

The following capabilities were verified through the live application:

* Secure static delivery
* Private S3 origin
* HTTPS custom domain
* Dynamic visitor counter
* Persistent application state
* Public guestbook submission
* Backend validation
* Moderation state enforcement
* Approved-comment retrieval
* Least-privilege backend access

### Overall Status

**PASS**

---

## Principle Reinforced

> A system is not complete when the components work independently. It is complete when the intended user path works through the assembled architecture.

Production verification converts architecture claims into operational evidence.

## Cost Guardrail Verification

Existing AWS Budgets were reviewed before creating any additional financial controls.

Two active cost guardrails are already configured:

* `$3` budget
* `$15` budget

These existing thresholds provide early and secondary notification points for unexpected AWS spending.

An additional Engagement 10 budget was not created because the existing controls already satisfy the requirement for financial visibility.

### Engineering Decision

The existing budget controls were preserved rather than duplicated.

### Principle Reinforced

> Financial controls should provide useful decision points, not duplicate alerts for the sake of additional configuration.


## Security and Operational Verification

### AWS WAF

The production CloudFront distribution was verified to have AWS WAF core protections enabled.

Observed production telemetry demonstrated that the control was actively evaluating traffic rather than existing only as configuration.

During the observed 24-hour period:

- approximately 1,200 requests were processed
- approximately 1,100 requests were blocked
- 78 requests were allowed
- blocked traffic included requests with no user agent and known malicious bot activity

This provided operational evidence that unwanted traffic was being evaluated and blocked at the edge before reaching the origin.

**Status: PASS**

---

### CloudWatch Production Dashboard

A production dashboard was created:

`eng10-portfolio-production`

The dashboard provides visibility across the application path.

#### CloudFront

Monitors:

- requests
- 4xx error rate
- 5xx error rate

#### API Gateway

Monitors:

- request count
- 4xx responses
- 5xx responses

#### Lambda

Monitors the visitor-counter workload through:

- invocations
- errors
- average duration

#### DynamoDB

Monitors capacity consumption for:

- `portfolio-metrics`
- `portfolio-guestbook`

The dashboard was saved and verified after refresh to confirm that the configuration persisted.

**Status: PASS**

---

### CloudWatch Alarm

A CloudWatch alarm was created for:

`portfolio-visitor-counter`

Alarm:

`eng10-portfolio-lambda-errors`

Condition:

`Errors >= 1 within a 5-minute period`

Missing data is treated as non-breaching because an idle portfolio does not represent an application failure.

The alarm transitions through:

**Lambda Error → CloudWatch Alarm → SNS → Email Notification**

Healthy production traffic was generated and the alarm subsequently entered the `OK` state.

**Status: PASS**

---

### Resource Governance

Production resources were tagged using:

`Project = Engagement-10`

`Environment = Production`

Human-readable naming was also applied where appropriate.

This addressed an operational issue discovered during WAF inspection: resources that cannot be quickly associated with a workload increase troubleshooting and governance friction.

### Principle Reinforced

> Resources should be identifiable by workload, not by memory.

---

## Operational Acceptance

The production workload now demonstrates:

- edge protection
- private origin access
- encrypted HTTPS delivery
- application telemetry
- error monitoring
- proactive alerting
- persistent application state
- moderated public input
- financial guardrails
- workload identification through tagging

The architecture is not only deployed. It is observable, protected, governed, and operationally supportable.

**Operational Status: PASS**

