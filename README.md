# Designing-Scalable-Systems-for-Real-People

## About This Repository

I design and build systems that don't just work. They make sense to the people using them. 

With a background as a principal investigator in cancer survivorship research, I bring a mixed methods mindset into cloud engineering. My work focuses on understanding both the system and the human experience behind it.

This repository documents my transition into cloud computing through hands-on projects that combine: 
- Cloud architectrue (AWS)
- Systems thinking
- UX/UI design
- Human-centered researcho
---
## What This Work Represents 
Most cloud projects focuse on infrastructure. 

This work focuses on: 
- Why systems are built
- How they behave under pressure
- How users experience them

 Each project includes:
- Architecture design
- UX considerations
- Failure scenarios
- Lessons Learned
---

## Projects 

### Project 1: Designing Secure Access with AWS IAM  
Built a role-based access model using IAM users, groups, and policies to establish a scalable security foundation for Sirhurryup Corporation.

[View Project →](./projects/%20iam-systems/project1-iam-user-access-management.md)

### Project 2: Secure Remote Access for Cloud Operations  
Demonstrates secure access to EC2 instances across Linux and Windows environments, evolving from SSH and RDP to a modern IAM-controlled access model using AWS Systems Manager.

[View Project →](./projects/%20iam-systems/project2-secure-remote-access.md)

### Project 3: Bringing a Bank Online – Web Server Deployment & Log Analysis
Built and deployed an Apache web server on Amazon Linux, created a custom user-facing experience, and analyzed system behavior through access and error logs. 

[View Project →](./projects/web-systems/project3-apache-webserver.md)

### Project 4: Building Department-Based Access Control in Linux  
Designed a Linux-based least-privilege access model using users, groups, permissions, and Bash automation to secure departmental workspaces and protect individual user privacy.

[View Project →](./projects/linux-systems/project4-department-access-control.md)

### Project 5: Evaluating Web Server Performance for Internal Services

Compared Apache, NGINX, and Lighttpd using response time and CPU utilization measurements to determine the best web server for a lightweight internal service. Built a standardized testing environment and used evidence-based analysis to make a technical recommendation.

[View Project →](./projects/web-systems/project5-webserver-performance-comparison.md)

### Project 6: Protecting Critical Payment Infrastructure Through Rapid Credential Containment
**Category:** AWS Security | **Capability:** Credential Protection

A consulting engagement focused on containing an exposed AWS IAM credential supporting a fictional financial services client. The case study demonstrates rapid containment, forensic investigation using AWS CloudTrail, and business-focused incident response.

---

### Project 7: Responding to a Public Exposure of Sensitive Financial Records Through Rapid S3 Containment
**Category:** AWS Security | **Capability:** Data Exposure Response

A consulting engagement centered on investigating and containing a publicly exposed Amazon S3 bucket. The project follows the complete incident lifecycle, from containment through forensic validation, using Amazon S3, AWS CloudTrail, and AWS IAM.

---

### Project 8: Designing a Secure Cloud Document Storage Platform for Healthcare Group Corporation
**Category:** Cloud Storage | **Capability:** Secure Document Storage

A consulting engagement that delivers a secure Amazon S3 document storage platform using versioning, lifecycle management, Block Public Access, and governance tagging to protect business records while optimizing long-term storage costs.

