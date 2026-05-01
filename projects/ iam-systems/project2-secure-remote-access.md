# Project 2: Secure Remote Access for Cloud Operations

## Company Context

Sirhurryup Corporation is expanding its cloud infrastructure across Linux and Windows environments. As the system grows, the IT team must maintain fast, reliable access to servers while minimizing security risks.

This project explores how remote access evolves from traditional methods like SSH and RDP to a more secure approach using AWS Systems Manager Session Manager.

---

## Part 1: Foundational (Linux EC2 + SSH)

### Objective
Establish secure administrative access to a Linux EC2 instance.

### What I Did
![EC2 Launch](../../assets/project2/01-ec2-launch.png)

- Launched an Amazon Linux EC2 instance using AWS Free Tier
- Created and used a key pair for authentication
- Configured a Security Group to allow SSH (port 22)
- Restricted access to **my IP address** to reduce exposure

### SSH Group Configuration
![Security Group SSH](../../assets/project2/02-ec2-security-group-launch.png)

```bash
chmod 400 "aws-ec2-proj2-keypair.pem"
ssh -i "aws-ec2-proj2-keypair.pem" ec2-user@<your-public-dns>
```

### SSH Access + Verification + Output 
![EC2 SSH Output](../../assets/project2/03-security-group-ssh-whoami.png)

### Why This Matters 
Access is the first layer of control in any system. By limiting SSH access to a specific IP, I reduced the attack surface while maintaining administrative control. 
