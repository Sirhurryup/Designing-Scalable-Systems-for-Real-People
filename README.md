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


### IAM System Design 
**Focus:** Identity, authentication, and authorization 

***Cloud Concepts:*** 
- Users
- Roles
- Policies
- Least privilege access

***UX Layer:*** 
- How confusing permissions impact users
- Designing clearer access flows

***Failure Testing:*** 
- Broken permissions
- Access denial scenarios

[View IAM Project](projectes/iam-systems/README.md)

---

### Scenarios Web Application 
***Focus:*** High Availability and performance 

***Cloud Concepts:*** 
- EC2
- Load Balancer
- Auto Scaling

***UX Layer:***
- User experience during latency or downtime
- Perceived versus actual performance

***Failure Testing:***
- Instance crash
- Traffic spikes
---

### Event-Driven System 
***Focus:*** Automation and asynchornous workflows 

***Cloud Concepts:*** 
- S3
- Lambda
- Event triggers

***UX Layer:*** 
- Invisible systems that still affect user trust
- Feedback loops (notifications, confirmations)

***Failure Testing:*** 
- Trigger failures
- Silent systems breakdowns
---

## UX/UI Case Studies 
These projects explore how users interact with complex systems. 

### Dashboard Design 
- Simplifying system visibility
- Reducing cognitive load

### User Research 
- Understanding user pain points in technical systems
- Translating research into design decisions

### Usability Testing 
- Identifying fricition in workflows
- Iterating on design improvements
---

## Design Philosophy 
Influenced by systems thinking and human-centered design: 
- Systems should be understandable
- Failures should be visible
- Interfaces should reduce confusion
- Technology should serve people––NOT OVERWHELEM THEM.
---

## Current Focus 
- Cloud architecture (AWS)
- UX for technical systems
- Building scalable, usable solutions
- Continuous learning through builiding and iteration
---

## Let's Connect
I'm actively growing in cloud engineering and UX design, with a focus on solving real-world problems through thoughtful systems. 
