---

# Evidence Inventory

| Evidence | Description | Business Validation |
|-----------|-------------|---------------------|
| Evidence-00 | Budget configuration | Established cost controls before infrastructure deployment. |
| Evidence-01 | VPC architecture | Verified the production network foundation. |
| Evidence-02 | Public subnets | Confirmed multi-Availability Zone subnet design. |
| Evidence-03 | Internet Gateway | Validated internet connectivity for public workloads. |
| Evidence-04 | Public Route Table | Verified routing from public subnets to the Internet Gateway. |
| Evidence-05 | Public Subnet Configuration | Confirmed automatic public IP assignment for application instances. |
| Evidence-06 | Web Security Group | Validated inbound HTTP and SSH access for web servers. |
| Evidence-07 | ALB Security Group | Validated inbound HTTP access to the Application Load Balancer. |
| Evidence-08 | Validation EC2 Running | Confirmed the standalone validation server reached the running state. |
| Evidence-09 | Target Group Configuration | Verified the load balancer target group was configured correctly. |
| Evidence-10 | Application Load Balancer | Verified successful ALB deployment. |
| Evidence-11 | Launch Template Summary | Standardized future EC2 deployments through Auto Scaling. |
| Evidence-12 | Launch Template User Data | Automated Apache installation and application deployment. |
| Evidence-13 | Auto Scaling Group Network Configuration | Verified ASG integration with VPC, subnets, ALB, target group, and health checks. |
| Evidence-14 | Auto Scaling Capacity Configuration | Verified desired capacity, minimum, and maximum scaling limits. |
| Evidence-15 | Auto Scaling Operational Configuration | Documented operational settings controlling instance behavior. |
| Evidence-16 | Two Healthy Auto Scaling Instances | Confirmed baseline high availability with two healthy instances. |
| Evidence-17 | Target Tracking Scaling Policy | Verified CPU-based automatic scaling configuration. |
| Evidence-18 | Scale-Out Validation | Confirmed the Auto Scaling Group successfully expanded capacity under load. |
| Evidence-19 | End-to-End Application Validation | Verified customers could successfully access the application through the Application Load Balancer DNS endpoint. |

