# Cloud Engineering Portfolio Platform

## Engagement Purpose

Design and deploy a production-style cloud portfolio at **docdott.com** that demonstrates cloud engineering capability through a real working system rather than a static collection of credentials.

The platform will showcase engineering projects, architecture decisions, technical writing, and lessons learned while providing recruiters and potential employers with direct evidence of how business requirements are translated into cloud architecture.

This project is inspired by the **Cloud Resume Challenge**, created by Forrest Brazeal, but extends the original challenge into a broader engineering portfolio platform.

---

## Business Capabilities

### 1. Professional Identity

Visitors need a simple and memorable way to find the portfolio.

**Capability:** Provide a professional web presence through `docdott.com`.

This requires:

* Human-readable DNS
* HTTPS encryption
* Reliable public availability

---

### 2. Engineering Evidence

Recruiters should be able to move beyond résumé claims and inspect evidence of engineering work.

**Capability:** Present selected AWS, Linux, security, FinOps, and systems-engineering projects with direct connections to GitHub evidence.

Each project should communicate:

* Business problem
* Technical requirements
* Architecture decision
* Implementation
* Verification
* Lessons learned

---

### 3. Global Content Delivery

Visitors may access the portfolio from different geographic locations.

**Capability:** Deliver static content efficiently without operating traditional web servers.

The solution should favor:

* Low operational overhead
* Global content delivery
* Caching
* High availability
* Secure origin access

---

### 4. Persistent Application State

The portfolio should behave like an application rather than only a static website.

**Capability:** Maintain information that persists between visitor sessions.

Initial application state will include:

* Site visitor count
* Engineering guestbook comments

---

### 5. Secure Application Interaction

Browser users should never receive direct database credentials or unrestricted access to backend resources.

**Capability:** Provide a controlled application interface between the browser and persistent data.

The architecture must separate:

**Client → Application Interface → Business Logic → Data**

---

### 6. Engineering Guestbook

Visitors should have a lightweight way to leave meaningful feedback.

**Capability:** Allow visitors to submit professional comments through an Engineering Guestbook.

Potential data includes:

* Name
* Role or organization, optional
* Comment
* Timestamp

Future controls may include:

* Input validation
* Moderation
* Rate limiting
* Abuse protection

---

### 7. Architecture Transparency

A recruiter should be able to understand not only what technologies were used, but why they were selected.

**Capability:** Expose architecture decisions as part of the portfolio itself.

Major decisions should communicate:

**Business Need → Technical Requirement → Design Decision → Tradeoff**

---

### 8. Cost Awareness

The portfolio will likely experience low baseline traffic with unpredictable visitor activity.

**Capability:** Operate economically without maintaining idle infrastructure.

Architecture decisions should favor:

* Managed services
* Serverless components where appropriate
* Pay-per-use consumption
* Caching
* Cost monitoring and guardrails

---

### 9. Operational Confidence

Deployment is not complete simply because the website loads.

**Capability:** Verify that the platform remains accessible, secure, and functioning as designed.

The project will capture evidence for:

* DNS resolution
* HTTPS
* CloudFront delivery
* Origin protection
* API operation
* Database persistence
* Visitor counter functionality
* Guestbook functionality

---

### 10. Reproducible Engineering

The platform should eventually be rebuildable without relying on undocumented console configuration.

**Capability:** Move the architecture toward infrastructure as code and automated deployment.

Future phases will introduce:

* Infrastructure as Code
* Automated testing
* CI/CD
* Deployment verification

---

## Design Principle

> Do not begin with an AWS service. Begin with the capability the business needs.

The purpose of this project is not to demonstrate how many AWS services can be connected.

The purpose is to demonstrate why each service deserves to exist in the architecture.
