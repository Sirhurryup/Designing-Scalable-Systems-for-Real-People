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


