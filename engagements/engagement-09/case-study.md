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


# Solution Strategy

Rather than selecting AWS services first, the consulting team developed an architectural strategy that aligned each technical decision with a specific business objective.

The strategy focused on five design principles.

---

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

## Business Requirements

## Solution Overview

## Architectural Decisions

## Engineering Journey

### Phase 1
Network Foundation

### Phase 2
Elastic Architecture

## Challenges Encountered

## Validation

## Business Outcome

## Lessons Learned

## Repository Resources

## What's Next

## Client Stakeholders

The following fictional stakeholders represent the leadership team for Pinnacle Financial Group throughout this consulting engagement.

| Stakeholder | Role | Primary Responsibility |
|------------|------|------------------------|
| Beth Hamilton | Chief Technology Officer (CTO) | Executive sponsor responsible for technology strategy, investment decisions, and final architectural approval. |
| Emma Brooks | Director of Digital Banking (Business Sponsor) | Represents business objectives, customer experience, and operational priorities for the banking platform. |
| Kyle Bennett | Infrastructure Manager (Technical Lead) | Oversees infrastructure implementation, operational readiness, and engineering standards. |
| Jack Reynolds | Information Security Manager | Ensures the architecture aligns with security policies, risk management, and compliance requirements. |
| Natalie Carter | Cloud Operations Manager | Responsible for platform monitoring, availability, operational support, and production readiness. |
| Chloe Mitchell | Digital Experience Manager | Represents customer-facing application performance, usability, and service availability. |
