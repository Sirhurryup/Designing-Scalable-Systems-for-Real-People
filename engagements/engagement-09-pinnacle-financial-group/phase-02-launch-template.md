## Launch Template Design

The Launch Template establishes the standardized blueprint for every application server created by the Auto Scaling Group.

Engineering decisions:

- Amazon Linux 2023 (validated platform)
- Instance type: t3.micro
- Security Group: eng09-web-sg
- Key Pair: eng09-admin--key
- Storage: Default root volume
- Configuration: User data bootstrap
- Web Server: Apache
- Application Port: 80

Business rationale:

The Launch Template separates server configuration from scaling decisions. Every instance launched during periods of increased demand will inherit an identical operating system, security configuration, and application setup, reducing configuration drift and improving operational consistency.
