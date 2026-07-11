# Business Problem

Pinnacle Financial Group is preparing to launch a new customer services platform that allows clients to securely access financial documents, communicate with advisors, and manage their accounts online.

The current platform operates from a single application server hosted in an aging on-premises environment. Planned maintenance windows and unexpected outages interrupt customer access, increase support requests, and place additional pressure on internal IT teams.

As customer adoption continues to grow, leadership has recognized that the existing infrastructure can no longer provide the availability, scalability, or resilience required to support the business.

SirhurryUp Corporation has been engaged to design and deploy a highly available AWS infrastructure capable of maintaining customer access during infrastructure failures, automatically responding to changing demand, and providing a secure foundation for future cloud services.

# Stakeholders
Executive Sponsor
Beth Hamilton
Chief Technology Officer

Business Sponsor
Emma Brooks
Director of Digital Banking

Technical Lead
Kyle Bennett
Infrastructure Manager

Operations
Natalie Carter
Cloud Operations Manager

Security
Jack Reynolds
Information Security Manager

Product
Chloe Mitchell
Digital Experience Manager

# Success Criteria
The engagement will be considered successful when:

• Customers access the platform through a single secure endpoint.

• The application remains available during the loss of a web server.

• Infrastructure automatically scales during periods of increased demand.

• Shared application resources remain available across all application servers.

• The environment follows AWS security best practices.

• All resources follow SirhurryUp naming and tagging standards.

• Architecture is fully documented for future operations teams.

Engagement 09 
Business Requirements
Pinnacle Financial Group has retained SirhurryUp Corporation to design and deploy a production-ready cloud platform that supports the organization's next generation customer services portal.

The solution must satisfy the following business requirements:

### Availability

• Maintain customer access during infrastructure failures.

• Eliminate single points of failure within the web tier.

• Distribute workloads across multiple Availability Zones.

### Scalability

• Automatically respond to changing customer demand.

• Support predictable traffic growth without manual intervention.

### Reliability

• Continue serving customers when individual application servers become unavailable.

• Provide shared application resources across all web servers.

### Security

• Restrict direct access to production application servers.

• Route all customer traffic through approved public entry points.

• Follow AWS security best practices and SirhurryUp Corporation engineering standards.

### Operations

• Allow engineers to monitor application health.

• Simplify future maintenance activities.

• Produce documentation that supports long-term operations.

## Consulting Notes

During the kickoff meeting, Beth Hamilton emphasized that the customer experience must remain uninterrupted during planned maintenance and unexpected infrastructure failures.

Kyle Bennett noted that the existing environment relies heavily on manual operational tasks, making future growth difficult.

Natalie Carter requested that the final solution simplify operational monitoring and reduce overnight support incidents.

These conversations influenced the architectural decisions documented throughout this engagement.
