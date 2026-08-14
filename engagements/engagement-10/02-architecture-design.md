# Architecture Design

## From Business Capabilities to Architecture

The architecture for the Cloud Engineering Portfolio Platform begins with the capabilities the system must provide rather than with a list of AWS services.

The goal is to translate each business capability into a technical requirement before selecting the technology that satisfies it.

| Business Capability            | Technical Requirement                                                                | Architectural Direction                 |
| ------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------- |
| Professional identity          | Visitors need a memorable, trusted domain                                            | DNS + HTTPS                             |
| Engineering evidence           | Static portfolio content must be durable and publicly available                      | Object storage                          |
| Global content delivery        | Content should load efficiently regardless of visitor location                       | Edge caching and content delivery       |
| Secure delivery                | Traffic must be encrypted and the storage origin should not be unnecessarily exposed | TLS + controlled origin access          |
| Persistent application state   | Visitor counts and guestbook entries must survive individual sessions                | Persistent database                     |
| Secure application interaction | Browsers should not communicate directly with the database                           | Application/API boundary                |
| Business logic                 | Visitor and guestbook requests require validation and processing                     | Serverless compute                      |
| Low baseline traffic           | Infrastructure should not remain running simply because the website exists           | Managed and consumption-based services  |
| Cost awareness                 | Unexpected usage should not create an unnoticed bill                                 | Monitoring and cost guardrails          |
| Engineering transparency       | Recruiters should be able to understand why architectural decisions were made        | Architecture documentation and diagrams |
| Reproducibility                | The environment should eventually be rebuildable consistently                        | Infrastructure as Code                  |
| Deployment reliability         | Changes should eventually move from source control to production predictably         | CI/CD                                   |

---

## Architecture Decision Model

Every major technology decision in this engagement will follow the same reasoning model:

**Business Capability → Technical Requirement → Design Decision → AWS Service → Tradeoff → Verification**

This prevents the architecture from becoming a collection of AWS services chosen simply because they are available.

The service must earn its place in the system. 

## Architecture Decision 01 — Static Content Storage

### Business Capability

The portfolio must store and serve HTML, CSS, JavaScript, images, diagrams, and other static engineering assets.

### Technical Requirement

The solution requires durable storage for static objects without requiring a continuously running application server.

### Alternatives Considered

**Amazon EC2**

An EC2 instance could run a traditional web server such as Apache or NGINX and serve the portfolio files.

This approach was rejected because the workload does not require persistent compute. Using EC2 would introduce additional responsibilities including:

* Operating system maintenance
* Patching
* Web server configuration
* Capacity management
* Instance availability
* Idle compute cost

**AWS Lambda**

Lambda provides event-driven compute and could participate in web application delivery.

It was rejected for static content storage because there is currently no business logic that needs to execute when retrieving portfolio assets. Introducing compute would add unnecessary complexity to a simple storage requirement.

### Design Decision

**Amazon S3 will provide durable object storage for the portfolio's static assets.**

S3 aligns with the workload because the content consists primarily of files that can be stored as objects and retrieved without requiring server management.

### Architectural Principle

> Do not introduce compute when the business capability only requires storage.

### Tradeoff

S3 provides storage but does not, by itself, satisfy all production delivery requirements.

Additional capabilities are still needed for:

* Global content delivery
* HTTPS
* Custom domain routing
* Controlled origin access
* Edge caching

Those requirements will be addressed by additional architectural components rather than forcing S3 to solve responsibilities outside its role.

## Architecture Decision 02 — Content Delivery and Origin Protection

### Business Capability

Visitors may access the portfolio from different geographic locations and should receive a secure and responsive experience.

### Technical Requirement

The platform requires a public delivery layer that can:

* Deliver static content efficiently
* Cache frequently requested objects
* Support encrypted HTTPS traffic
* Reduce unnecessary requests to the storage origin
* Prevent visitors from directly accessing the S3 bucket

### Alternatives Considered

**Direct S3 Access**

Visitors could retrieve portfolio objects directly from Amazon S3.

This approach was rejected because it would make the storage layer responsible for public delivery and would prevent the architecture from maintaining a clear boundary between the public-facing delivery layer and the private origin.

### Design Decision

**Amazon CloudFront will serve as the public content delivery layer in front of a private Amazon S3 origin.**

CloudFront can cache static portfolio assets at edge locations, allowing many requests to be satisfied without repeatedly retrieving the same object from S3.

The S3 bucket will remain private.

CloudFront Origin Access Control will authorize CloudFront to retrieve objects from the bucket while preventing direct public access to the S3 origin.

### Responsibility Boundary

The architecture separates two responsibilities:

**Amazon S3 → Stores the objects**

**Amazon CloudFront → Delivers the objects**

The browser interacts with CloudFront rather than directly with the storage origin.

### Architectural Principle

> Storage and delivery are separate responsibilities.

A service should not become publicly exposed simply because it contains content intended for public consumption.

### Tradeoff

Introducing CloudFront adds another managed service and additional configuration to the architecture.

However, that complexity provides meaningful capabilities:

* Edge caching
* HTTPS delivery
* Origin protection
* A controlled public entry point
* Reduced origin requests

The additional component therefore satisfies requirements that S3 alone should not be expected to provide.

## Architecture Decision 03 — Domain Identity and Secure Communication

### Business Capability

Visitors need a memorable way to locate the portfolio and a trusted, encrypted connection when accessing it.

The platform will use:

**docdott.com**

### Technical Requirements

Two separate technical capabilities are required:

1. Resolve the human-readable domain name to the portfolio's delivery infrastructure.
2. Establish trusted HTTPS communication between visitors and the platform.

These responsibilities should not be confused.

### DNS Responsibility

DNS answers:

> Where should requests for `docdott.com` go?

The domain must resolve to the CloudFront distribution that serves as the portfolio's public delivery layer.

### TLS Responsibility

TLS answers a different question:

> Can the browser establish a trusted and encrypted connection with `docdott.com`?

A TLS certificate provides the identity required for the browser to establish trusted HTTPS communication with the portfolio while TLS protects data traveling between the visitor and the delivery layer.

### Design Decision

**DNS will route `docdott.com` toward the CloudFront distribution.**

**AWS Certificate Manager will provide the TLS certificate used by CloudFront for HTTPS communication.**

This produces the following responsibility chain:

**DNS → Find the destination**

**ACM/TLS → Establish trusted encrypted communication**

**CloudFront → Deliver the content**

**S3 → Store the content**

### Security Boundary

Successful DNS resolution does not mean communication is secure.

Likewise, HTTPS does not mean every request is safe.

TLS protects communication in transit, but an encrypted connection can still carry a malicious request.

Application and request protection therefore remain separate security responsibilities that may require additional controls such as AWS WAF.

### Architectural Principle

> Connectivity, identity, encryption, and request security are different responsibilities.

A secure architecture does not treat successful connectivity as proof of trusted or safe communication.

## Architecture Decision 04 — Persistent Application State

### Business Capability

The portfolio must support information that changes over time and remains available after an individual visitor session ends.

Initial persistent state includes:

* Visitor count
* Engineering Guestbook entries

### Technical Requirement

The application requires a managed data store capable of supporting frequent small reads and writes without requiring database server administration.

The workload is expected to have:

* Low normal traffic
* Potentially unpredictable spikes
* Small data objects
* Simple access patterns
* A need for persistent state
* Minimal infrastructure management

### Alternatives Considered

**Amazon S3**

S3 is appropriate for storing static portfolio assets, but the visitor counter and guestbook introduce application state that changes frequently.

Using objects as the primary mechanism for frequent counter updates and guestbook writes would blur the responsibility between object storage and application data.

**Amazon RDS**

A relational database could support the required reads and writes.

However, the current workload does not require complex relational queries, joins, or relational transactions.

Introducing a relational database would add capabilities and operational considerations beyond the current business requirement.

### Design Decision

**Amazon DynamoDB will provide persistent application state for the visitor counter and Engineering Guestbook.**

DynamoDB aligns with the workload because it provides managed, low-latency reads and writes without requiring the project to operate database servers.

The data model will be designed around known application access patterns rather than attempting to reproduce a traditional relational schema.

### Initial Guestbook Data

Each guestbook entry may contain:

* `comment_id`
* `name`
* `comment`
* `created_at`

Future fields may include:

* `role_or_company`
* `status`

The `status` attribute could support future moderation workflows.

### Responsibility Boundary

**S3 → Static application assets**

**DynamoDB → Changing application state**

The existence of dynamic content does not require the static storage layer to become a database.

### Architectural Principle

> Match the data store to the access pattern and operational requirement.

A database should not be selected because it has more capabilities. It should be selected because its operating model and data access patterns fit the workload.

### Tradeoff

DynamoDB does not provide the relational querying model of a traditional SQL database.

The application must therefore understand its expected access patterns before designing keys and indexes.

For this portfolio, that limitation is acceptable because the initial access patterns are simple and predictable.

## Architecture Decision 05 — Application Interface and Business Logic

### Business Capability

Visitors must be able to interact with dynamic portfolio features such as the visitor counter and Engineering Guestbook without receiving direct access to backend data resources.

### Technical Requirement

The platform requires:

* A defined HTTPS application interface
* Request routing
* Input validation
* Business logic
* Controlled access to DynamoDB
* Separation between the browser and persistent data

### Design Decision

**Amazon API Gateway will provide the application interface.**

API Gateway will receive requests from the browser and route them to the appropriate backend operation.

Examples may include:

* `GET /visitor-count`
* `POST /visitor-count`
* `GET /comments`
* `POST /comments`

**AWS Lambda will provide the application logic.**

Lambda functions will:

* Inspect incoming requests
* Validate required fields
* Enforce application rules
* Process visitor counter updates
* Prepare guestbook data
* Read from or write to DynamoDB
* Return application responses

### Validation Responsibility

Application validation belongs in the business logic layer.

For example, a guestbook submission containing an empty name or an unacceptable comment should be rejected by Lambda before the request reaches DynamoDB.

DynamoDB should persist valid application state rather than determine whether a guestbook comment satisfies the application's business rules.

### Responsibility Boundary

**API Gateway → Receive and route application requests**

**Lambda → Validate and process application logic**

**DynamoDB → Persist and retrieve application state**

This creates a controlled boundary between public clients and backend resources.

### Architectural Principle

> Interface, logic, and persistence are separate responsibilities.

Separating these concerns reduces coupling and prevents the browser from requiring direct database permissions.

### Tradeoff

Introducing API Gateway and Lambda adds additional components and request flow complexity.

However, that complexity provides:

* Controlled backend access
* Centralized application logic
* Input validation
* Independent scaling
* Reduced infrastructure management
* A safer separation between clients and data

## Architecture Decision 06 — Least-Privilege Backend Access

### Business Capability

Backend functions must interact with application data without receiving unnecessary access to unrelated AWS resources.

### Technical Requirement

Each Lambda function requires an IAM execution role that grants only the permissions necessary to perform its assigned responsibility.

### Design Decision

**Lambda execution roles will follow the principle of least privilege.**

The Guestbook function should receive only the DynamoDB permissions required to read and create guestbook records.

The Visitor Counter function should receive only the permissions required to read and update visitor-count data.

Broad administrative permissions will not be used simply because they make development easier.

### Security Reasoning

A function can be compromised even when it is not directly exposed as a public resource.

If a vulnerable Lambda function has broad administrative permissions, an attacker may be able to use that function's credentials to access or modify unrelated AWS resources.

If the same compromised function has narrowly scoped permissions, the potential damage is constrained to the limited actions and resources already authorized.

### Responsibility Boundary

**Lambda → Performs application logic**

**IAM → Determines what that Lambda is authorized to do**

**DynamoDB → Accepts only operations permitted by the Lambda execution role**

### Architectural Principle

> Grant workloads the minimum authority required to perform their business responsibility.

Least privilege does not eliminate every security risk.

It reduces the blast radius when something goes wrong.

### Tradeoff

Narrow IAM policies require more deliberate design and may require updates as application capabilities evolve.

That additional effort is acceptable because permissions should expand only when the business responsibility expands.
