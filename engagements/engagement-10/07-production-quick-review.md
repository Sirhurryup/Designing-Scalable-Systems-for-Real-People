# Engagement 10 --- Production Portfolio Quick Review

> **Purpose:** A fast review of the Git, AWS, deployment, security,
> observability, and engineering concepts reinforced while building the
> production portfolio.

------------------------------------------------------------------------

## 1. Git --- Multi-Machine Workflow

Because development happens from more than one machine, assume GitHub
may have changed before every push.

### Start-of-work sync

``` bash
git status
git fetch origin
git pull --rebase origin main
```

### Mental model

-   `git status` → What is happening in my working tree?
-   `git fetch origin` → What changed on GitHub?
-   `git pull --rebase origin main` → Put remote changes underneath my
    local commits without creating an unnecessary merge commit.

### Commit and push

``` bash
git add <file-or-folder>
git commit -m "type: concise description"

git fetch origin
git pull --rebase origin main
git push origin main
```

### Commit language

``` text
feat:  new capability
fix:   correction
docs:  documentation
```

### If push is rejected with `fetch first`

**Do not force push.**

``` bash
git fetch origin
git pull --rebase origin main
git push origin main
```

### If local files are modified but not committed

``` bash
git fetch origin
git pull --rebase --autostash origin main
```

`--autostash` temporarily protects the uncommitted changes, synchronizes
the branch, and reapplies the changes.

### Useful inspection commands

``` bash
git status
git diff
git diff --stat
```

If `git diff` opens a pager:

``` text
q
```

Search a file with line numbers:

``` bash
grep -n 'search-term' path/to/file
```

Inspect a specific range:

``` bash
sed -n '147,235p' path/to/file
```

### Remember

> **A clean working tree does not guarantee GitHub has not changed.
> Fetch refreshes your knowledge of the remote.**

------------------------------------------------------------------------

# 2. Production Delivery Architecture

Static delivery path:

``` text
User
 ↓
Route 53
 ↓
CloudFront
 ↓
AWS WAF
 ↓
Private S3
```

Dynamic application path:

``` text
Browser JavaScript
 ↓
API Gateway
 ↓
Lambda
 ↓
IAM authorization
 ↓
DynamoDB
```

### Remember

The browser does **not** talk directly to DynamoDB.

Each layer has a responsibility:

-   **Route 53** → DNS resolution
-   **CloudFront** → edge delivery and caching
-   **WAF** → inspect/filter unwanted requests
-   **S3** → static website assets
-   **API Gateway** → public API entry point
-   **Lambda** → application/business logic
-   **IAM** → authorization between AWS resources
-   **DynamoDB** → persistent application state

------------------------------------------------------------------------

# 3. Visitor Counter

``` text
Browser
 ↓
POST /visitor-count
 ↓
API Gateway
 ↓
portfolio-visitor-counter Lambda
 ↓
DynamoDB UpdateItem
 ↓
portfolio-metrics
 ↓
new count returned
 ↓
browser displays count
```

### IAM lesson

The Lambda initially returned:

``` text
AccessDeniedException
```

The code knew **what** operation to perform, but IAM determined whether
the function was **authorized** to perform it.

> **Code says WHAT to do. IAM determines WHETHER it may do it.**

------------------------------------------------------------------------

# 4. Guestbook Architecture

We separated public writes from public reads.

## Submit path

``` text
Browser
 ↓
POST /comments
 ↓
API Gateway
 ↓
portfolio-guestbook-submit
 ↓
DynamoDB PutItem
```

Every new comment receives:

``` text
status = pending
```

The server determines moderation status --- not the browser.

## Read path

``` text
Browser
 ↓
GET /comments
 ↓
API Gateway
 ↓
portfolio-guestbook-read
 ↓
DynamoDB
 ↓
approved comments only
```

Mental model:

``` text
pending  → hidden
approved → public
```

### Browser security

User comments are rendered using:

``` javascript
textContent
```

rather than inserting untrusted content with `innerHTML`.

> **Treat user input as data, not executable page markup.**

------------------------------------------------------------------------

# 5. DynamoDB Lessons

## Required keys

We encountered:

``` text
Missing the key commit_id in the item
```

A DynamoDB item must contain the table's required primary-key
attributes.

## Reserved words

We encountered:

``` text
reserved keyword: comment
```

DynamoDB expressions have reserved keywords. Expression attribute-name
aliases may be necessary.

## Scan vs Query

``` text
Scan
→ broadly examines table data
→ increasingly inefficient as data grows
```

``` text
Query + appropriate key/index
→ DynamoDB knows where to look
→ better scaling pattern
```

For the small Version 1 guestbook, Scan was acceptable.

> **Acceptable at small scale does not automatically mean appropriate at
> large scale.**

------------------------------------------------------------------------

# 6. CORS

The website and API are different origins:

``` text
https://docdott.com

https://2v6w289860.execute-api.us-east-1.amazonaws.com
```

The browser therefore enforces cross-origin rules.

CORS answers:

> **Is this browser origin allowed to use the API response?**

Important distinction:

``` text
curl succeeds
≠
browser necessarily succeeds
```

An API can work from Terminal while browser JavaScript rejects the
response because of CORS.

------------------------------------------------------------------------

# 7. S3 Deployment

Website structure:

``` text
website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── badge images
```

When uploading through S3:

``` text
index.html → Add files
css        → Add folder
js         → Add folder
assets     → Add folder
```

Using **Add folder** preserves directory structure.

If HTML references:

``` html
src="assets/file.png"
```

S3 must contain:

``` text
assets/file.png
```

> **Do not flatten paths that the application expects.**

------------------------------------------------------------------------

# 8. CloudFront Cache Invalidation

Updating S3 does not guarantee that users immediately receive the new
object because CloudFront caches content.

During Version 1 development we used:

``` text
/*
```

for invalidation.

Mental model:

``` text
S3 updated
≠
CloudFront cache immediately refreshed
```

Deployment therefore became:

``` text
Update code
→ Git commit/push
→ Upload changed objects to S3
→ Invalidate CloudFront
→ Test production
```

------------------------------------------------------------------------

# 9. AWS WAF

The production CloudFront distribution already had WAF core protections
enabled.

Observed production evidence showed approximately:

``` text
~1.2K requests processed
~1.1K blocked
78 allowed
```

Blocked traffic included categories such as no-user-agent traffic and
known malicious bots.

The important lesson was not simply:

> "WAF is enabled."

It was:

> **We observed evidence that WAF was actively evaluating and blocking
> production traffic.**

``` text
Internet
 ↓
CloudFront / WAF
 ├── legitimate → ALLOW
 └── unwanted   → BLOCK
```

### Principle

> **Security controls are more valuable when their effectiveness is
> observable.**

------------------------------------------------------------------------

# 10. CloudWatch Dashboard

Dashboard:

``` text
eng10-portfolio-production
```

## Widget 1 --- Lambda traffic and failure

``` text
Invocations → Sum
Errors      → Sum
```

Question:

> Is compute being used, and is it failing?

## Widget 2 --- Lambda performance

``` text
Duration → Average
```

Question:

> How long does execution take?

Duration was separated from Invocations/Errors because milliseconds and
counts are different units.

## Widget 3 --- API Gateway

``` text
Count → Sum
4xx   → Sum
5xx   → Sum
```

Question:

> Is traffic reaching the API, and are requests failing?

## Widget 4 --- DynamoDB

``` text
portfolio-guestbook
→ ConsumedReadCapacityUnits
→ ConsumedWriteCapacityUnits

portfolio-metrics
→ ConsumedWriteCapacityUnits
```

Question:

> What database capacity is the workload consuming?

## Widget 5 --- CloudFront

``` text
Requests     → Sum
4xxErrorRate → Average
5xxErrorRate → Average
```

### Metric rule of thumb

``` text
Counts/events → usually Sum
Rates         → usually Average
Latency       → Average when examining average behavior
Duration      → Average when examining average behavior
```

### Dashboard lesson

Creating widgets is **not** the same as persisting the dashboard.

Always:

``` text
Create widgets
→ Save dashboard
→ Refresh browser
→ Verify widgets persisted
```

------------------------------------------------------------------------

# 11. CloudWatch Alarm + SNS

Alarm:

``` text
eng10-portfolio-lambda-errors
```

Metric:

``` text
portfolio-visitor-counter
Errors
```

Configuration:

``` text
Statistic: Sum
Period: 5 minutes
Threshold: >= 1
Datapoints: 1 of 1
Missing data: Not breaching
```

Why is missing data non-breaching?

``` text
No visitors
→ Lambda may not execute
→ no datapoint
→ NOT an application failure
```

Notification path:

``` text
Lambda error
 ↓
CloudWatch Alarm
 ↓
SNS
 ↓
Email
```

### Remember

> **Dashboard = visibility**\
> **Alarm = attention**\
> **SNS = notification**

------------------------------------------------------------------------

# 12. AWS Budgets

Existing financial guardrails were reused:

``` text
$3 budget
$15 budget
```

We deliberately did not create another budget merely to increase the
number of configured resources.

### Principle

> **Financial controls should provide useful decision points, not
> duplicate alerts for the sake of configuration.**

------------------------------------------------------------------------

# 13. Tags and Resource Governance

Standard production tags:

``` text
Project     = Engagement-10
Environment = Production
```

Human-readable names were added where useful.

Example:

``` text
Name = docdott.com CloudFront
```

The WAF investigation demonstrated why this matters.

### Principle

> **Resources should be identifiable by workload, not by memory.**

------------------------------------------------------------------------

# 14. Verification Model

Individual service tests were useful:

``` text
Lambda test passes
API request succeeds
DynamoDB contains data
```

But those do **not** prove the complete application works.

Production acceptance required testing:

``` text
Real browser
 ↓
Real domain
 ↓
CloudFront
 ↓
JavaScript
 ↓
API Gateway
 ↓
Lambda
 ↓
IAM
 ↓
DynamoDB
 ↓
response returned to real browser
```

### Mental model

``` text
Build
→ Verify
→ Observe
→ Protect
→ Document
```

> **A system is not complete because its components work independently.
> The intended user path must work through the assembled architecture.**

------------------------------------------------------------------------

# 15. Portfolio Evidence

We corrected project cards so that portfolio claims point only to
evidence that actually exists.

Current pattern:

``` text
Production Web Tier
→ Engagement 09 evidence

Order Processing System
→ Evidence coming soon

Incident Investigation
→ incident-response evidence

Cloud Engineering Portfolio
→ Engagement 10 evidence
```

### Principle

> **Portfolio claims require portfolio evidence.**

Never manufacture documentation history simply to fill a portfolio card.

------------------------------------------------------------------------

# 16. Ten Questions to Reinforce Tomorrow

Try answering these **without looking above**.

### 1.

Why does the browser call API Gateway rather than DynamoDB directly?

### 2.

What responsibility does Lambda have that DynamoDB does not?

### 3.

What did `AccessDeniedException` tell us about the difference between
application logic and authorization?

### 4.

Why can `curl` successfully call an API while browser JavaScript fails
because of CORS?

### 5.

Why do new guestbook comments receive `status = pending` from the
backend?

### 6.

Why did API Gateway `Count` use **Sum**, while Lambda `Duration` used
**Average**?

### 7.

Explain the difference between a CloudWatch dashboard, CloudWatch alarm,
and SNS.

### 8.

Why might an S3 update not immediately appear through CloudFront?

### 9.

What operational problem do consistent tags solve?

### 10.

What is the difference between verifying an AWS component and verifying
the production application?

------------------------------------------------------------------------

# 17. 30-Second Architecture Recall

If you can explain this without notes, the architecture is becoming
automatic:

``` text
User
 ↓
Route 53
 ↓
CloudFront + WAF
 ↓
Private S3
 ↓
Browser JavaScript
 ↓
API Gateway
 ↓
Lambda
 ↓
IAM
 ↓
DynamoDB

CloudWatch observes.
CloudWatch Alarm detects.
SNS notifies.
AWS Budgets guard cost.
Git preserves engineering history.
Tags preserve operational identity.
```

------------------------------------------------------------------------

# Final Principles Earned

> **Code says what to do. IAM determines whether it may do it.**

> **Architecture tells you what to monitor.**

> **Security controls are more valuable when their effectiveness is
> observable.**

> **Resources should be identifiable by workload, not by memory.**

> **Portfolio claims require portfolio evidence.**

> **A component working does not prove the system works. Verify the
> complete user path.**

> **Build → Verify → Observe → Protect → Document.**
