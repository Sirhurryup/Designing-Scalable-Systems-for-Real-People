---

## Evidence Inventory

The following evidence demonstrates the progression of the engagement from architectural planning and infrastructure deployment through application validation, high availability, and automatic scaling.

| Evidence | Description | Business Validation |
|-----------|-------------|---------------------|
Evidence-00 | Budget Configuration | Established financial guardrails before infrastructure deployment to support responsible cloud cost management. 
| Evidence-01 | VPC Architecture | Verified the production network foundation. |
| Evidence-02 | Public Subnets | Confirmed multi-Availability Zone subnet design. |
| Evidence-03 | Internet Gateway | Validated internet connectivity for public workloads. |
| Evidence-04 | Public Route Table | Verified routing from public subnets to the Internet Gateway. |
| Evidence-05 | Public Subnet Configuration | Confirmed automatic public IP assignment for application instances. |
| Evidence-06 | Web Security Group Inbound Rules | Validated inbound HTTP and SSH access for web servers. |
| Evidence-07 | ALB Security Group Inbound Rules | Validated inbound HTTP access to the Application Load Balancer. |
Evidence-08 | Validation EC2 Running | Confirmed the baseline application server was operational before introducing load balancing and Auto Scaling.
| Evidence-09 | Target Group Configuration | Verified the Target Group was configured to register and monitor healthy application instances. |
Evidence-10 | Application Load Balancer | Verified the Application Load Balancer was successfully deployed to distribute customer traffic across application instances.
Evidence-11 | Launch Template Summary | Standardized application server deployments to ensure every Auto Scaling instance launched with a consistent configuration.
| Evidence-12 | Launch Template User Data | Automated Apache installation and application deployment. |
| Evidence-13 | Auto Scaling Group Network Configuration | Verified ASG integration with VPC, subnets, ALB, target group, and health checks. |
| Evidence-14 | Auto Scaling Capacity Configuration | Verified desired capacity, minimum, and maximum scaling limits. |
Evidence-15 | Auto Scaling Operational Configuration | Documented operational behaviors governing instance lifecycle, monitoring, and maintenance.
| Evidence-16 | Two Healthy Auto Scaling Instances | Confirmed baseline high availability with two healthy instances. |
| Evidence-17 | Target Tracking Scaling Policy | Verified CPU-based automatic scaling configuration. |
Evidence-18 | Scale-Out Validation | Verified the Auto Scaling Group automatically increased application capacity from two to four healthy instances during simulated customer demand.
| Evidence-19 | End-to-End Application Validation | Verified the customer-facing application remained accessible through the Application Load Balancer after the architecture successfully completed all validation gates. 


Prepared by:

SirhurryUp Corporation

Engagement Lead:
Doc Dott

Date:
July 2026
