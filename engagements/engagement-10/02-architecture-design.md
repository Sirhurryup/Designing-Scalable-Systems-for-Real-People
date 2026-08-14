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
