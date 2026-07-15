# Executive Design Review
## Engagement 09 — Pinnacle Financial Group
### Highly Available Web Platform

## Client

**Pinnacle Financial Group**

---

## Engagement

**Engagement 09 — Designing a Highly Available Web Platform with Elastic Load Balancing and Auto Scaling**

---

## Executive Summary

SirhurryUp Corporation designed, deployed, and validated a highly available web platform for Pinnacle Financial Group.

The solution integrates an Application Load Balancer, standardized server provisioning through Launch Templates, and an Auto Scaling Group to improve application availability, reduce operational overhead, and respond dynamically to changing customer demand.

The engagement concluded with successful end-to-end validation, including application accessibility through the load balancer, automated infrastructure provisioning, and automatic scale-out under simulated workload while operating within established budget controls.

---

## Business Objectives

The engagement was designed to achieve the following business objectives:

- Improve application availability for customers.
- Reduce manual operational effort through infrastructure automation.
- Respond automatically to changing customer demand.
- Standardize application server deployments to reduce configuration drift.
- Operate within established cloud budget controls while maintaining scalability.
---

## Solution Overview

The solution was designed as a layered architecture in which each component fulfills a specific business responsibility while supporting the overall objectives of availability, scalability, and operational consistency.

### Networking Foundation

- Amazon VPC
- Public Subnets across three Availability Zones
- Internet Gateway
- Public Route Tables

This foundation provides reliable network connectivity while supporting high availability across multiple Availability Zones.

---

### Security

- Application Load Balancer Security Group
- Web Server Security Group

Security groups enforce least-privilege communication by allowing customer traffic to terminate at the Application Load Balancer while restricting direct access to the application servers.

---

### Compute Platform

- Amazon EC2
- Launch Template
- Auto Scaling Group

The Launch Template standardizes every application server, while the Auto Scaling Group maintains the desired application capacity and automatically provisions replacement instances when required.

---

### Application Delivery

- Application Load Balancer
- Target Group

Incoming customer requests are distributed across healthy application servers, improving application availability and reducing the impact of individual server failures.

---

### Elasticity

- Target Tracking Scaling Policy

The platform continuously monitors CPU utilization and automatically adjusts infrastructure capacity to match customer demand while operating within predefined business limits.

---

## Validation Summary

The engagement concluded with successful validation of every major architectural layer before introducing additional dependencies.

The following validation gates were completed:

- **Network Foundation** — Verified the VPC, public subnets, route tables, and Internet Gateway provided the required network connectivity.
- **Application Server** — Validated that the Launch Template consistently provisioned standardized application servers through automated user data.
- **Application Delivery** — Confirmed the Application Load Balancer successfully routed customer traffic to healthy application instances.
- **High Availability** — Verified the Auto Scaling Group maintained the required baseline capacity of healthy application servers.
- **Elasticity** — Demonstrated automatic scale-out under sustained CPU demand using a Target Tracking Scaling Policy.
- **End-to-End Validation** — Confirmed customers could successfully access the application through the Application Load Balancer following deployment and scaling.

Each validation gate was completed and documented before introducing the next architectural component, reducing implementation risk and simplifying troubleshooting throughout the engagement.

---

## Business Outcome

The completed architecture provides Pinnacle Financial Group with a resilient application platform capable of maintaining customer availability while automatically adjusting infrastructure capacity to meet changing demand.

The solution standardizes application server deployment, reduces manual operational effort, and improves service continuity through automated health monitoring, load balancing, and infrastructure recovery.

By validating each architectural layer independently before introducing additional dependencies, the engagement reduced implementation risk and established a repeatable engineering methodology for future consulting engagements.

---

## Recommendations

The following recommendations are proposed before promoting this architecture to a production environment:

1. **Enable HTTPS using AWS Certificate Manager (ACM)** to encrypt customer traffic and strengthen application security.

2. **Deploy application servers into private subnets** while keeping the Application Load Balancer in public subnets to reduce the public attack surface.

3. **Introduce Amazon RDS Multi-AZ** to provide highly available, persistent application data.

4. **Implement centralized logging** for application, operating system, and load balancer activity to improve operational visibility and support future security investigations.

5. **Expand Amazon CloudWatch monitoring** with dashboards, alarms, and operational metrics that provide proactive insight into application health and infrastructure performance.

6. **Continue performance and resilience testing** to validate scaling behavior under realistic customer workloads before production deployment.

---

## Engagement Conclusion

The engagement successfully achieved all defined business and technical objectives.

The final solution demonstrated:

- Highly available application delivery.
- Standardized infrastructure provisioning through Launch Templates.
- Automated health monitoring and recovery through the Auto Scaling Group.
- Dynamic scale-out based on sustained application demand.
- Successful end-to-end customer access through the Application Load Balancer.

Beyond the technical implementation, the engagement established a repeatable engineering methodology centered on incremental validation, evidence-based decision making, and disciplined documentation. This methodology reduces implementation risk and provides a repeatable framework for future cloud consulting engagements.

The architecture is recommended for advancement toward a production-ready environment following implementation of the recommendations identified in this review.

Prepared by:

SirhurryUp Corporation

Engagement Lead:
Doc Dott

Date:
July 2026
