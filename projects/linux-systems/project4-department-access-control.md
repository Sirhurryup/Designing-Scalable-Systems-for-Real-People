# Project 4: Building Department-Based Access Control in Linux

## Company Context

Sirhurryup Corporation is expanding across three technical departments:

- Platform Engineering
- Cloud Operations
- Data Engineering

As the organization grows, each team requires secure access to its own workspace while remaining isolated from resources owned by other departments.

This project implements a Linux-based access control model using users, groups, ownership, permissions, and Bash automation. The goal is to translate business roles into enforceable technical controls that protect both departmental data and individual user privacy.

---

## Organizing the Workspace

### Objective

Create department directories, groups, users, and files, then restrict access so each team can work only within its designated environment.

### Departments and Users

| Department | Linux Group | User |
|----------|----------|----------|
| Platform Engineering | `platform` | `rescalon` |
| Cloud Operations | `cloudops` | `lvandross` |
| Data Engineering | `dataeng` | `dross` |

### What I Built

- Created three department directories
- Created Linux groups for each department
- Added sample files to each workspace
- Created three users and assigned them to their respective groups
- Assigned directory ownership
- Applied least-privilege permissions using `chmod 770`

### Key Commands Used

```bash
mkdir /platform
mkdir /cloud-operations
mkdir /data-engineering

groupadd platform
groupadd cloudops
groupadd dataeng

useradd -m -s /bin/bash -G platform rescalon
useradd -m -s /bin/bash -G cloudops lvandross
useradd -m -s /bin/bash -G dataeng dross

chown root:platform /platform
chown root:cloudops /cloud-operations
chown root:dataeng /data-engineering

chmod 770 /platform
chmod 770 /cloud-operations
chmod 770 /data-engineering

### Verification

Each user was able to access only their own department directory and received `Permission denied` when attempting to access the others.

---

### Protecting Individual Privacy

#### Objective
Restrict home directory access so user cannot browse one another's personal files.

#### What I Did
Applied `chmod 700`  to each user's home directory.

#### Key Commands Used
```
chmod 700 /home/rescalon 
chmod 700 /home/lvandross 
chmod 700 /home/dross
```

#### Verification
Logged in as `rescalon` and confirmed access to `/home/lvandross` and `/home/dross` was denied.

#### Why This Matters
Home directories often contain:
- SSH keys
- shell history
- configuration files
- private documents

Restricting access protects sensitive information and supports user privacy.

---

## Automating the Access Model

### Objective
Convert the manual configuration into a reusable Bash script.

### What I Built
Created `sirhurryup-access-control.sh`, which:
- Creates directories
- Creates files
- Creates groups
- Creates users
- Assigns ownership
- Applies permissions
- Secures home directories

### Execution
```
chmod +x sirhurryup-access-control.sh
./sirhurryup-access-control.sh
```

### Result
The entire environment can noe be recreated consistently with a signle command.

---

## Lessons Learned
- Linus groups provide scalable access control
- `chown` assigns ownership and group responsibiity
- `chmod 770` enforces deppartment isolation
- `chmod 700` protects personal data
- Automation transformss manual work into repeatable infastructure

---

## Why This Project Matters
This project demonstrates how business requirements become technical controls.

The challenge was simple:

Each department needed access to its own workspace, while empolyees also needed privacy over their individual profiles.

By combining Linux permissions, ownership, user management, and automation, I creaated a repeatable security model grounded in least privilege.

This is the kind of systems thinking that underpins secure infrastructure at scale. 
