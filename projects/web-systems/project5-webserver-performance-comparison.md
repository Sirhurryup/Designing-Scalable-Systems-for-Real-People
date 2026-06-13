# Project 5: Evaluating Web Server Performance for Internal Services

## Company Context

Sirhurryup Corporation needed to select a web server for a lightweight internal service used by employees.

Several options were available, including Apache, NGINX, and Lighttpd. Rather than choosing a platform based on reputation or preference, the goal was to compare each server using a consistent test environment and objective measurements.

This project focused on evaluating response time and CPU utilization while serving the same web page across all three web servers.

The objective was simple:

Determine which solution provided the best balance of performance, efficiency, and operational practicality for a lightweight internal workload.

---

## Preparing the Test Environment

### Objective

Create a controlled environment where Apache, NGINX, and Lighttpd could be evaluated fairly.

### Environment

- Cloud Provider: AWS
- Operating System: Ubuntu
- Instance Type: EC2 Free Tier
- Testing Tools:
  - curl
  - time
  - top
- Test Page: Standard Sirhurryup Corporation HTML page

### What I Did

- Updated the Ubuntu server
- Installed Apache
- Installed NGINX
- Installed Lighttpd
- Created a standard HTML page
- Verified each server could successfully serve the same content

### Verification

Each web server successfully delivered the Sirhurryup Corporation test page through localhost and the browser.

![System Updated](../../assets/project5/01-system-updated.png)

![Apache Running](../../assets/project5/02-apache-running.png)

![Apache Default Page](../../assets/project5/03-apache-default-page.png)

![Standard Test Page](../../assets/project5/04-standard-test-page.png)

![Apache Localhost Test](../../assets/project5/05-apache-curl-localhost.png)

![NGINX Localhost Test](../../assets/project5/09-nginx-curl-localhost.png)

![Lighttpd Localhost Test](../../assets/project5/13-lighttpd-curl-localhost.png)

---

## Comparing Web Server Response Times

### Objective

Measure how quickly each web server could respond to the same request while serving identical content.

### Test Method

Each server hosted the same Sirhurryup Corporation HTML page.

Response times were measured using:

time curl -s http://localhost > /dev/null

The goal was not to simulate heavy traffic, but rather to establish a baseline comparison under minimal load.

### Results

| Web Server | Response Time|
|------------|--------------|
| Apache     | 0.008s |
| NGINX      | 0.008s |
| Lighttpd   | 0.008s |

### Findings

All three web servers delivered identical response times during testing.

For a lightweight internal service, no meaningful performance difference was observed when measuring basic page delivery.

This result reinforced the importance of testing assumptions rather than relying solely on reputation or community opinions.

![Apache Response Time](../../assets/project5/06-apache-response-time.png)

![NGINX Response Time](../../assets/project5/10-nginx-response-time.png)

![Lighttpd Response Time](../../assets/project5/14-lighttpd-response-time.png)
