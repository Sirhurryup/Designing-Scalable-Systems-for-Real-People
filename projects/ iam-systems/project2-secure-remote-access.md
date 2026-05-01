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

## Part 2 Advanced Windows (EC2 & Remote Desktop Protocol (RDP))

### Objective
Establish secure remote desktop access to a Windows EC2 instance to support graphical administrartion and enterprise workloads. RDP enables full desktop access, making it easier to manage applications, troubeshoot issues, and support enterprise workflows.

---

### What I Will Do 

- Launch a Windows EC2 instance
- Configure a Security Group to allow RDP (port 3389)
- Retrieve the Windows administrator password using the key pair
- Connect to the instance using Remote Desktop Protocol

### Why This Matters 

Modern organizations rarely operate on a signle operating system. Supporting both Linux and Windows enviroments is critical for real-world cloud operations.

---

## Part 3: Complex (SSM Session Manager)

### Objective 

Eliminate the need for direct SSM access by using AWS Systems Manager Session Manager Session for secure, browser-based instance access. 

## Why This Matters 

Reducing open ports and eliminating direct SSH access strengthens security posture and aligns with modern cloud best practices.
