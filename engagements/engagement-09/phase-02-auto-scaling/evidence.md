# Evidence Repository

## Engagement 09 — Pinnacle Financial Group
### Phase 02 — Auto Scaling

---

## Purpose

This document catalogs the supporting evidence collected throughout Engagement 09.

Each screenshot demonstrates a specific engineering milestone and supports the validation performed during the consulting engagement.

The evidence should be reviewed alongside the Engineering Log, Executive Design Review, and Case Study.

---

# Evidence Inventory

| Evidence | Description | Business Validation |
|-----------|-------------|---------------------|
| Evidence-00 | Budget Configuration | Established financial guardrails before infrastructure deployment to support responsible cloud cost management. |
| Evidence-01 | VPC Architecture | Verified the production network foundation. |
| Evidence-02 | Public Subnets | Confirmed a multi-Availability Zone network design. |
| Evidence-03 | Internet Gateway | Validated internet connectivity for public workloads. |
| Evidence-04 | Public Route Table | Verified routing from public subnets to the Internet Gateway. |
| Evidence-05 | Public Subnet Configuration | Confirmed automatic public IP assignment for application instances. |
| Evidence-06 | Web Security Group Inbound Rules | Validated inbound HTTP and SSH access for application servers. |
| Evidence-07 | ALB Security Group Inbound Rules | Validated inbound HTTP access to the Application Load Balancer. |
| Evidence-08 | Validation EC2 Running | Confirmed the baseline application server was operational before introducing load balancing and Auto Scaling. |
| Evidence-09 | Target Group Configuration | Verified the Target Group was configured to receive healthy application targets. |
| Evidence-10 | Application Load Balancer | Verified successful deployment of the Application Load Balancer for customer traffic distribution. |
| Evidence-11 | Launch Template Summary | Standardized application server deployments for Auto Scaling. |
| Evidence-12 | Launch Template User Data | Verified automated Apache installation and application deployment. |
| Evidence-13 | Auto Scaling Group Network Configuration | Verified integration with networking, load balancing, and health checks. |
| Evidence-14 | Auto Scaling Capacity Configuration | Verified desired, minimum, and maximum scaling capacity. |
| Evidence-15 | Auto Scaling Operational Configuration | Documented operational lifecycle, monitoring, and maintenance settings. |
| Evidence-16 | Two Healthy Auto Scaling Instances | Confirmed baseline high availability with two healthy application servers. |
| Evidence-17 | Target Tracking Scaling Policy | Verified CPU-based automatic scaling configuration. |
| Evidence-18 | Scale-Out Validation | Verified automatic expansion from two to four healthy application servers under simulated workload. |
| Evidence-19 | End-to-End Application Validation | Verified successful customer access through the Application Load Balancer after deployment and scaling. |

---

Prepared by:

SirhurryUp Corporation

Engagement Lead:
Doc Dott

Date:
July 2026
