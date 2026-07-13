# Executive Design Review

## Client

**Pinnacle Financial Group**

---

## Engagement

**Engagement 09 — Designing a Highly Available Web Platform with Elastic Load Balancing and Auto Scaling**

---

## Executive Summary

SirhurryUp Corporation designed and validated a highly available web application platform capable of maintaining customer access during increased demand while reducing operational risk through automation.

The solution combines an Application Load Balancer, Launch Template, and Auto Scaling Group to automatically distribute incoming requests, replace unhealthy application servers, and increase application capacity when CPU utilization exceeds predefined business thresholds.

The engagement successfully demonstrated that the application remained available throughout deployment, automated scaling, and end-to-end customer validation while operating within established budget controls.

---

## Business Objectives

The client required a production-ready web platform capable of:

- Providing continuous application availability.
- Automatically distributing customer traffic across multiple application servers.
- Responding to increases in customer demand without manual intervention.
- Standardizing server deployment to reduce operational inconsistency.
- Maintaining responsible cloud cost controls throughout the deployment.

---

## Solution Overview

The implemented architecture consisted of the following AWS services:

- Amazon VPC
- Public Subnets across multiple Availability Zones
- Internet Gateway
- Public Route Tables
- Security Groups
- Amazon EC2
- Launch Template
- Application Load Balancer
- Target Group
- Auto Scaling Group
- Target Tracking Scaling Policy

Together, these services created a resilient platform capable of automatically responding to changing application demand while minimizing operational overhead.

---

## Validation Summary

The engagement concluded with successful validation of each architectural milestone.

Validation confirmed:

- The network foundation functioned as designed.
- The standalone application server successfully hosted the web application.
- The Application Load Balancer correctly distributed incoming requests.
- The Launch Template consistently provisioned identical application servers.
- The Auto Scaling Group maintained the desired application capacity.
- CPU-based target tracking successfully increased platform capacity under simulated workload.
- The customer-facing application remained accessible through the Application Load Balancer after deployment and scaling.

---

## Business Outcome

The final architecture delivered a scalable and highly available application platform that reduced manual operational effort while improving resilience during periods of increased customer demand.

By combining automated infrastructure provisioning with elastic scaling, the solution positioned Pinnacle Financial Group for future growth without requiring significant architectural redesign.

---

## Recommendations

The following improvements are recommended before production adoption:

1. Enable HTTPS using AWS Certificate Manager.
2. Deploy application servers within private subnets.
3. Introduce Amazon RDS Multi-AZ for persistent application data.
4. Enable centralized monitoring using Amazon CloudWatch dashboards and alarms.
5. Capture application and access logs for operational visibility and security investigations.
6. Continue validating scaling behavior through controlled performance testing.

---

## Engagement Status

**Status:** Successfully Completed

The architecture satisfied the engagement objectives and demonstrated successful deployment, validation, automatic scaling, and customer accessibility.
