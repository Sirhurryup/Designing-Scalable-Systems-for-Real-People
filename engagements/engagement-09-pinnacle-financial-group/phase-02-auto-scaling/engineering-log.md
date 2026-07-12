# Phase 2 — Auto Scaling Engineering Log

## Business Context

Pinnacle Financial Group expects customer demand to fluctuate throughout the day. The existing architecture relies on a single application server behind an Application Load Balancer. While functional, this design cannot automatically respond to increased traffic or instance failure.

The business objective for Phase 2 is to introduce automated elasticity. The architecture must launch additional application servers when demand increases and reduce capacity when demand declines, improving availability while controlling operational costs.

## Stakeholder Discussion

The Chief Information Officer explained that previous marketing campaigns caused customer traffic to increase significantly, resulting in application slowdowns. The organization wants AWS to automatically increase and decrease compute capacity without requiring engineers to manually provision EC2 instances.

The requested business outcomes were:

- Maintain application availability
- Respond automatically to changing demand
- Reduce operational effort
- Control infrastructure costs
- Improve customer experience

## Architecture Discussion

Before implementation, the Launch Template was evaluated as the standardized blueprint for every future application server.

Several architectural discussions guided the design:

- Why Auto Scaling requires a Launch Template instead of cloning existing instances.
- The difference between server standardization and scaling decisions.
- Golden AMIs versus User Data bootstrap.
- Risks of automatically adopting newly released AMIs.
- The importance of maintaining consistency across operating systems, instance types, security controls, and application configuration.

Key architectural understanding:

Auto Scaling decides when additional servers are required.

The Launch Template defines what each server should look like.

### Auto Scaling Group

The Auto Scaling Group manages the lifecycle and desired capacity of application servers.

Architectural responsibilities:

- Maintain the desired number of application instances.
- Automatically replace unhealthy or terminated instances.
- Launch new instances using the approved Launch Template.
- Distribute instances across selected subnets for improved availability.
- Prepare the architecture for dynamic scaling based on CloudWatch metrics.

Business rationale:

The Auto Scaling Group reduces operational risk by automatically maintaining application capacity. Customers experience improved availability while engineers no longer need to manually replace failed application servers.

## Design Decisions

- The Auto Scaling Group spans both public subnets to improve availability and reduce the risk of a single Availability Zone affecting the application service.

### Launch Template Design

The Launch Template establishes the standardized blueprint for every application server created by the Auto Scaling Group.

Engineering Decisions

- Amazon Linux 2023 (validated platform)
- Instance type: t3.micro
- Security Group: eng09-web-sg
- Key Pair: eng09-admin--key
- Storage: Default root volume
- Configuration: User Data bootstrap
- Web Server: Apache
- Application Port: 80

Business Rationale

The Launch Template separates server configuration from scaling decisions. Every instance launched during periods of increased demand will inherit an identical operating system, security configuration, and application setup, reducing configuration drift while improving operational consistency.

## AWS Implementation

Created a Launch Template named:

pinnacle-app-launch-template

Configured:

- Amazon Linux 2023
- t3.micro
- eng09-admin--key
- eng09-web-sg
- Default storage
- Apache User Data bootstrap script

The Launch Template was successfully created and is now available for use by the Auto Scaling Group.

Created the Auto Scaling Group using the approved Launch Template `pinnacle-app-launch-template`.

## Evidence

Evidence 11

Launch Template configuration prior to creation.

Evidence 12

Launch Template created successfully.

## Validation

Validation completed successfully.

The Launch Template can now launch standardized application servers using the approved operating system, networking, security configuration, and automated Apache installation.

## Lessons Learned

- Auto Scaling determines when to create additional instances.
- Launch Templates determine how every new instance is configured.
- Standardization must exist before automation can become reliable.
- Production infrastructure should avoid introducing untested machine images.

## Engineering Notes

Phase 2 begins the transition from manually managed infrastructure to automated infrastructure.

The Launch Template establishes the repeatable server blueprint that will support the Auto Scaling Group, CloudWatch metrics, scaling policies, and application load testing in subsequent steps.

## Executive Summary

The first milestone of Phase 2 was completed by creating a standardized Launch Template for Pinnacle Financial Group.

This blueprint enables AWS to provision consistent application servers without manual configuration, providing the foundation for automated scaling while maintaining operational consistency and reducing configuration drift.




