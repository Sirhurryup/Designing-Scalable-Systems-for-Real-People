# Case Study

# Engagement 09 — Pinnacle Financial Group
## Designing a Highly Available Web Platform with Elastic Load Balancing and Auto Scaling

---

# Executive Snapshot

| Category | Details |
|----------|---------|
| Client | Pinnacle Financial Group *(Fictional)* |
| Industry | Financial Services |
| Engagement | Engagement 09 |
| Objective | Design, deploy, and validate a highly available web platform capable of automatically responding to customer demand while maintaining operational consistency. |
| AWS Services | Amazon VPC, EC2, Launch Template, Application Load Balancer, Target Group, Auto Scaling Group, CloudWatch, Security Groups |
| Primary Deliverables | Engineering Log, Executive Design Review, Case Study, Evidence Repository, Medium Article |
| Final Outcome | Successfully validated a resilient, highly available architecture capable of automatic scaling under simulated workload while maintaining customer accessibility. |

---

# Client Stakeholders

The following fictional stakeholders represent the leadership team for Pinnacle Financial Group throughout this consulting engagement.

| Stakeholder | Role | Primary Responsibility |
|------------|------|------------------------|
| Beth Hamilton | Chief Technology Officer (CTO) | Executive sponsor responsible for technology strategy, investment decisions, and final architectural approval. |
| Emma Brooks | Director of Digital Banking | Represents business objectives, customer experience, and operational priorities. |
| Kyle Bennett | Infrastructure Manager | Oversees infrastructure implementation, operational readiness, and engineering standards. |
| Jack Reynolds | Information Security Manager | Ensures architectural decisions align with security and compliance requirements. |
| Natalie Carter | Cloud Operations Manager | Responsible for operational stability, monitoring, and production readiness. |
| Chloe Mitchell | Digital Experience Manager | Represents customer-facing performance, availability, and user experience. |

---

# Client Discovery

Every successful consulting engagement begins with listening before designing.

Rather than recommending AWS services immediately, the engagement opened with conversations intended to understand Pinnacle Financial Group's business objectives, operational concerns, and long-term growth strategy.

---

### Beth Hamilton — Chief Technology Officer

> "Customer traffic is becoming less predictable throughout the year. I don't want our engineering team manually launching servers every time demand increases. We need an architecture that grows with the business while remaining financially responsible."

**Consulting Insight**

The solution required automated elasticity that balanced application performance with cloud cost management.

---

### Emma Brooks — Director of Digital Banking

> "Our customers expect uninterrupted access to our digital banking platform. Availability isn't a feature—it's an expectation."

**Consulting Insight**

The architecture needed to prioritize resilience, high availability, and continuous customer access.

---

### Kyle Bennett — Infrastructure Manager

> "Every time we deploy another server, someone configures it a little differently. That inconsistency eventually becomes an operational problem."

**Consulting Insight**

The engagement required standardized infrastructure provisioning through reusable deployment templates.

---

### Jack Reynolds — Information Security Manager

> "I don't want application servers exposed directly to the Internet. Every layer should communicate only with the resources that actually need access."

**Consulting Insight**

Security Groups would enforce least-privilege communication by allowing customer traffic to terminate at the Application Load Balancer while limiting direct access to application servers.

---

### Natalie Carter — Cloud Operations Manager

> "If a server fails, operations shouldn't depend on someone logging in at two o'clock in the morning to fix it."

**Consulting Insight**

The platform needed automated health monitoring, instance replacement, and operational resilience.

---

### Chloe Mitchell — Digital Experience Manager

> "Customers don't remember the architecture. They remember whether the application worked."

**Consulting Insight**

Every validation activity throughout the engagement ultimately measured one outcome:

**Can customers successfully access the application?**

---

## Discovery Summary

These conversations established the business requirements that guided every architectural decision throughout the engagement.

Rather than selecting AWS services first, the consulting team translated stakeholder concerns into measurable engineering objectives that could be validated throughout the implementation.

# Business Problem

Pinnacle Financial Group required a web platform capable of supporting continued business growth without increasing operational complexity.

The existing deployment approach relied on manually provisioned application servers, creating inconsistent server configurations, unnecessary operational effort, and increased risk during periods of higher customer demand.

From a business perspective, the organization needed a solution that would:

- Improve application availability.
- Reduce manual infrastructure management.
- Standardize server deployments.
- Automatically respond to changing customer demand.
- Maintain responsible cloud cost controls.

Rather than approaching the engagement as an AWS implementation exercise, the consulting team translated these business objectives into measurable engineering outcomes.

Every architectural decision was evaluated against one question:

> **Does this decision solve a business problem while reducing operational risk?**

# Business Requirements

The proposed solution was required to satisfy both business and technical objectives established during the client discovery sessions.

The consulting team defined the following requirements before any AWS services were selected.

### Availability

Provide continuous application availability by eliminating single points of failure.

### Scalability

Automatically increase or decrease application capacity in response to changing customer demand without manual intervention.

### Operational Consistency

Standardize application server deployments to eliminate configuration drift and improve operational reliability.

### Security

Limit direct access to application servers by routing customer traffic through a centralized Application Load Balancer.

### Cost Management

Operate within established cloud budget controls while scaling only when business demand justifies additional infrastructure.

### Engineering Quality

Establish a repeatable deployment and validation methodology that can be reused for future cloud engagements.

# Solution Overview

SirhurryUp Corporation recommended a layered cloud architecture designed to improve application availability, automate operational processes, and support future business growth.

Rather than introducing every AWS service simultaneously, the engagement followed an incremental implementation strategy. Each architectural layer was independently designed, deployed, and validated before introducing additional dependencies.

This disciplined approach reduced implementation risk, simplified troubleshooting, and ensured that every new component inherited a previously validated foundation.

The resulting architecture combines standardized infrastructure provisioning, intelligent traffic distribution, automated health monitoring, and elastic scaling to deliver a resilient platform capable of supporting changing customer demand.

# Architectural Decisions

Rather than selecting AWS services first, the consulting team developed an architectural strategy that aligned each technical decision with a specific business objective.

The strategy focused on five design principles.

---

# Design Principles
## Principle 1 — Build a Strong Foundation

Every cloud architecture depends upon a reliable network.

The engagement began by designing the networking layer before introducing compute, load balancing, or automation.

This approach reduced implementation risk by ensuring every future component inherited a stable foundation.

---

## Principle 2 — Standardize Before You Scale

Kyle Bennett's concern regarding inconsistent server deployments influenced one of the most important architectural decisions of the engagement.

Instead of manually configuring every application server, a Launch Template standardized the operating system, application installation, security configuration, and startup process.

Standardization ensures that every Auto Scaling instance begins from the same trusted configuration.

---

## Principle 3 — Validate Before Introducing Complexity

Rather than deploying every AWS service at once, the consulting team validated each architectural layer independently.

The application first proved it could run successfully on a single validation server before introducing the Application Load Balancer.

The load-balanced architecture was then validated before enabling automatic scaling.

This incremental approach simplified troubleshooting and reduced implementation risk throughout the engagement.

---

## Principle 4 — Automate Operational Resilience

Automation was introduced only after the underlying architecture demonstrated stable operation.

The Auto Scaling Group automatically maintained the desired number of healthy application servers while the Target Tracking Scaling Policy adjusted capacity in response to sustained customer demand.

This reduced operational effort while improving platform resilience.

---

## Principle 5 — Measure Success from the Customer's Perspective

The engagement did not conclude when the infrastructure deployed successfully.

Success was measured when the customer-facing application remained accessible through the Application Load Balancer following deployment, validation, and automatic scaling.

Technology was never the objective.

Reliable customer experience was.

## Phase 1 — Building the Foundation

The engagement began by establishing the networking components that every future service would depend upon.

The consulting team designed and validated:

- Amazon VPC
- Public Subnets across three Availability Zones
- Internet Gateway
- Public Route Tables
- Security Groups

Each networking component was verified before deploying the first application server.

This decision reflected the principle:

> **Stable cloud architectures begin with stable foundations.**

---

## Phase 2 — Delivering Elastic Application Infrastructure

Once the networking layer demonstrated reliable operation, attention shifted toward application availability and operational resilience.

The implementation introduced:

- Launch Template
- Application Load Balancer
- Target Group
- Auto Scaling Group
- Target Tracking Scaling Policy

Rather than enabling automatic scaling immediately, the consulting team first validated a single application server.

Only after confirming successful application delivery did the engagement introduce load balancing.

Automatic scaling was enabled only after the load-balanced environment consistently demonstrated healthy application delivery.

This staged implementation reduced uncertainty while allowing every new architectural layer to inherit a previously validated foundation.

---

## Key Engineering Decisions

Several architectural decisions significantly influenced the success of the engagement.

### Standardization Before Automation

Kyle Bennett's concern regarding inconsistent server deployments resulted in the adoption of Launch Templates.

Every new application server now launches from a consistent, repeatable configuration rather than manual administrative effort.

---

### Customer Experience Before Infrastructure Metrics

Chloe Mitchell reminded the consulting team that customers evaluate application availability—not infrastructure diagrams.

Consequently, the final validation measured successful customer access through the Application Load Balancer rather than simply confirming that AWS resources existed.

---

### Evidence Before Assumptions

Throughout implementation, architectural decisions were validated through testing rather than assumption.

When unexpected behavior occurred, the consulting team verified each dependency individually before introducing additional variables.

This disciplined approach simplified troubleshooting while strengthening confidence in the final architecture.


# Validation

The engagement concluded only after every architectural layer successfully passed its validation criteria.

Validation followed a progressive engineering methodology in which each completed layer became the trusted foundation for the next.

## Validation Gates

### Network Validation

The VPC, public subnets, Internet Gateway, route tables, and security groups were verified before deploying application infrastructure.

**Business Outcome**

A stable networking foundation reduced implementation risk and established reliable connectivity for every future component.

---

### Application Validation

The application was successfully deployed and validated on a standalone EC2 instance before introducing load balancing.

**Business Outcome**

Application functionality was confirmed before additional architectural complexity was introduced.

---

### Load Balancer Validation

The Application Load Balancer successfully distributed requests to healthy targets registered within the Target Group.

**Business Outcome**

Customer traffic could be distributed across multiple application servers while reducing the impact of individual server failures.

---

### Auto Scaling Validation

The Auto Scaling Group maintained the desired application capacity using standardized Launch Templates.

A Target Tracking Scaling Policy automatically increased capacity when sustained CPU utilization exceeded the established business threshold.

**Business Outcome**

The platform demonstrated automatic elasticity while reducing manual operational effort.

---

### End-to-End Validation

The engagement concluded with successful customer access through the Application Load Balancer following deployment, validation, and automatic scaling.

This final validation confirmed that the completed architecture satisfied the business objectives established during the client discovery sessions.

# Business Outcome

The engagement successfully transformed a manually managed application deployment into a resilient, standardized, and automatically scalable cloud platform.

Key business outcomes included:

- Improved application availability through redundant infrastructure.
- Standardized server deployments using Launch Templates.
- Automated traffic distribution using an Application Load Balancer.
- Automatic infrastructure scaling based on customer demand.
- Reduced operational effort through infrastructure automation.
- A repeatable consulting methodology supported by documented evidence and validation.

Beyond the technical implementation, the engagement established an engineering workflow that emphasizes disciplined validation, evidence-based decision making, and structured documentation before introducing additional architectural complexity.

# Lessons Learned

This engagement reinforced several consulting and engineering principles that will influence future cloud engagements.

## Technical Lessons

- Standardize infrastructure before introducing automation.
- Validate each architectural layer independently.
- Confirm application functionality before testing elasticity.
- Measure success from the customer's perspective rather than infrastructure status.

## Consulting Lessons

- Business objectives should drive architectural decisions.
- Stakeholder conversations provide context for every technical recommendation.
- Evidence strengthens architectural credibility.
- Executive documentation should communicate business value rather than implementation details.

## Methodology Improvements

Several improvements to the SirhurryUp Consulting Methodology emerged during this engagement:

- Engineering documentation became the single source of truth before derivative documents were written.
- Evidence was organized into a dedicated inventory with standardized naming conventions.
- Documentation updates followed a consistent process:
  - File
  - Section
  - Action
  - Paste
- Validation gates were introduced to reduce troubleshooting complexity.
- Source documents were locked after review to maintain consistency across all deliverables.

These improvements will become the standard workflow for future consulting engagements.


# Repository Resources

This engagement includes the following supporting documentation:

- Engineering Log
- Executive Design Review
- Evidence Repository
- Case Study
- Medium Article (Published upon completion)

Supporting evidence, architecture diagrams, and implementation artifacts are maintained within the Engagement 09 repository.

# What's Next

The completion of Engagement 09 establishes the baseline consulting methodology for future SirhurryUp Corporation engagements.

Future engagements will continue applying the same disciplined workflow:

Client Discovery

↓

Business Requirements

↓

Architecture

↓

Implementation

↓

Validation

↓

Executive Review

↓

Case Study

↓

Knowledge Sharing

This engagement established the consulting standards that future SirhurryUp engagements will continue to refine rather than reinvent. 

## Reflection

This engagement fundamentally changed the way I think about engineering.

Instead of measuring success by the AWS services I could deploy, I began measuring success by the quality of the questions asked before making architectural decisions.

**Related Essay**

The Question No One Asked Me → [Medium Link]


Prepared by:

SirhurryUp Corporation

Engagement Lead:
Doc Dott

Date:
July 2026
