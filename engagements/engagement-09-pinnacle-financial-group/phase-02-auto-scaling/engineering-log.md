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

### Launch Template

The Launch Template defines the standardized configuration for every application server that AWS launches to satisfy business demand.

It ensures every instance inherits the approved operating system, instance type, security controls, storage configuration, and startup automation, reducing configuration drift and improving operational consistency.

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

### CloudWatch

CloudWatch provides the observation layer for the Auto Scaling architecture.

It measures application and instance behavior so scaling decisions can be based on real demand rather than fixed schedules or assumptions.

Business rationale:

CloudWatch helps Pinnacle Financial Group balance customer performance with cost efficiency by adding capacity only when metrics indicate increased demand and reducing capacity when demand declines.

## Design Decisions

- The Auto Scaling Group spans all three public subnets to improve availability, distribute application capacity across multiple Availability Zones, and reduce the risk of a single-zone failure affecting the service.
- Elastic Load Balancing health checks were enabled so the Auto Scaling Group evaluates application availability rather than relying only on EC2 instance status.
- A 300-second health check grace period was configured to allow the user data bootstrap process to complete before replacement decisions are made.
- Minimum capacity was set to 2 to preserve baseline redundancy across multiple Availability Zones.
- Desired capacity was set to 2 so the application begins with two active instances.
- Maximum capacity was set to 4 to support controlled scale-out during testing while limiting cost exposure.
- No dynamic scaling policy was configured during initial Auto Scaling Group creation. The baseline group will first be validated at a stable capacity of two instances before CloudWatch-driven scaling is introduced.

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

### Bootstrap Strategy

The initial Launch Template intentionally uses a minimal bootstrap process.

Automatic operating system updates were excluded during validation to reduce external dependencies and isolate application provisioning. Additional operating system patching can be introduced after successful infrastructure validation.

Business Rationale

The Launch Template separates server configuration from scaling decisions. Every instance launched during periods of increased demand will inherit an identical operating system, security configuration, and application setup, reducing configuration drift while improving operational consistency.

### Scaling Policy Design

A target tracking scaling policy will use the Auto Scaling Group's average CPU utilization as the demand signal.

The target value is set to 70% for this controlled engagement. This threshold provides room for normal workload fluctuations while allowing the architecture to add capacity before sustained processing demand affects customer experience.

The 70% value is a testing baseline rather than a universal production standard. A production threshold would be validated through performance testing, response-time objectives, historical workload patterns, and business risk tolerance.

### Auto Scaling Validation Strategy

The initial Auto Scaling Group is intentionally deployed without a dynamic scaling policy.

This separates baseline infrastructure validation from elasticity validation. The first objective is to verify that the Auto Scaling Group can consistently launch, register, and maintain healthy application instances before introducing CloudWatch-driven scaling decisions.

Business Rationale

Validating one architectural capability at a time reduces troubleshooting complexity and improves confidence in each infrastructure layer before additional automation is introduced.

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

Connected `pinnacle-app-asg` to the existing Application Load Balancer target group so newly launched instances can register automatically and receive traffic after passing health checks.

Created the Auto Scaling Group `pinnacle-app-asg` using the approved Launch Template.

The group was configured across three public subnets, attached to `eng09-web-tg`, and set to maintain a baseline capacity of two application instances with a maximum capacity of four.

Created the `pinnacle-cpu-target-tracking` target tracking scaling policy.

Configuration:

- Metric: Average CPU Utilization
- Target value: 70%
- Scale in: Enabled

AWS automatically created and manages the required CloudWatch alarms for this policy.

Configured the Auto Scaling Group to maintain a baseline capacity of two application instances with a minimum of two and a maximum of four.

The group spans all three public subnets, uses Elastic Load Balancing health checks with a 300-second grace period, and registers new instances with `eng09-web-tg`.

## Evidence

Evidence 11

Launch Template configuration prior to creation.

Evidence 12

Launch Template created successfully.

Evidence 13

Auto Scaling Group review configuration showing the Launch Template, VPC, three public subnets, target group, health checks, and capacity settings.

Evidence 14

Auto Scaling Group Instance Management showing two healthy application instances.

Evidence 15

Target tracking scaling policy showing:

- Policy name: `pinnacle-cpu-target-tracking`
- Metric: Average CPU Utilization
- Target value: 70%
- Scale in enabled

## Validation

### Launch Template Validation

A standalone EC2 instance was launched directly from `pinnacle-app-launch-template`.

Validation confirmed:

- The instance entered the running state.
- User data executed successfully.
- Apache installed correctly.
- The `httpd` service reported `active (running)`.

This proves the Launch Template can independently create a functional application server before additional services are introduced.

### Load Balancer and Target Group Validation

The standalone validation instance was registered with `eng09-web-tg` and became healthy after `eng09-alb` was attached.

This confirms:

- The Application Load Balancer can reach the EC2 instance.
- `eng09-alb-sg` and `eng09-web-sg` permit the intended traffic path.
- The target group health check succeeds on HTTP port 80 and path `/`.
- Apache responds correctly through the approved load-balanced architecture.

### End-to-End Application Validation

The Application Load Balancer DNS endpoint successfully loaded the Pinnacle Financial Group validation page.

This confirms the complete traffic path:

Browser → `eng09-alb` → `eng09-web-tg` → EC2 → Apache

The application delivery layer is now proven before Auto Scaling is reintroduced.

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




