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

The solution combines Elastic Load Balancing, standardized server provisioning, and automatic scaling to improve application availability, reduce operational overhead, and respond dynamically to changing customer demand.

The engagement concluded with successful end-to-end validation, including application accessibility, automated infrastructure provisioning, and automatic scale-out under simulated workload.

---

## Business Objectives

The client required a production-ready web platform capable of:

- Improve application availability.
- Reduce manual operational effort.
- Respond automatically to changing customer demand.
- Standardize infrastructure deployment.
- Operate within established cloud budget controls..

---

## Solution Overview

The implemented architecture consisted of the following AWS services:

### Networking

- Amazon VPC
- Public Subnets
- Internet Gateway
- Route Tables

### Security

- Security Groups

### Compute

- Amazon EC2
- Launch Template
- Auto Scaling Group

### Application Delivery

- Application Load Balancer
- Target Group

### Elasticity

- Target Tracking Scaling Policy

Together, these services created a resilient platform capable of automatically responding to changing application demand while minimizing operational overhead.

---

## Validation Summary

The engagement concluded with successful validation of each architectural milestone.

The architecture successfully satisfied each validation gate established during the engagement.

- The network foundation functioned as designed.
- The standalone application server successfully hosted the web application.
- The Application Load Balancer correctly distributed incoming requests.
- The Launch Template consistently provisioned identical application servers.
- The Auto Scaling Group maintained the desired application capacity.
- CPU-based target tracking successfully increased platform capacity under simulated workload.
- The customer-facing application remained accessible through the Application Load Balancer after deployment and scaling.

---

## Business Outcome

The completed architecture provides Pinnacle Financial Group with a resilient application platform capable of maintaining customer availability while automatically adjusting infrastructure capacity to meet changing demand.

By validating each architectural layer independently before introducing additional dependencies, the engagement reduced implementation risk and established a repeatable engineering methodology for future deployments.

---

## Recommendations

The following improvements are recommended before production adoption:

1. Enable HTTPS using AWS Certificate Manager.
2. Deploy application servers within private subnets.
3. Introduce Amazon RDS Multi-AZ for persistent application data.
4. Capture application and access logs for operational visibility and security investigations.
5. Enable centralized monitoring using Amazon CloudWatch dashboards and alarms.
6. Continue validating scaling behavior through controlled performance testing.

---

## Engagement Conclusion

The engagement achieved all defined business and technical objectives.

The final architecture successfully demonstrated:

- Highly available application delivery.
- Standardized infrastructure provisioning.
- Automatic recovery through Auto Scaling.
- Dynamic scale-out based on application demand.
- End-to-end customer accessibility.

The solution is recommended for progression toward a production-ready architecture following the implementation of the recommendations identified in this review.
