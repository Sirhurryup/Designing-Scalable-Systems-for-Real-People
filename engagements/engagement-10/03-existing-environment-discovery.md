# Existing Environment Discovery

## Purpose

Before deploying new infrastructure, the existing environment for `docdott.com` was investigated from the public entry point toward the origin.

The objective was to understand what already exists, preserve working infrastructure, and avoid recreating resources simply because they appear in the Cloud Resume Challenge.

---

## Discovery 01 — Existing Static Delivery Path

The current production request path is:

**Visitor → Route 53 → CloudFront → Private Amazon S3**

### Route 53

The authoritative DNS for `docdott.com` is hosted in Amazon Route 53.

The root domain uses an **A Alias record** that routes traffic to the existing CloudFront distribution.

### CloudFront

An existing CloudFront distribution provides the public delivery layer for `docdott.com`.

Its origin is:

`docdott.com.s3.us-east-1.amazonaws.com`

### Amazon S3

The `docdott.com` S3 bucket stores the current website content.

**Block Public Access is enabled.**

The bucket policy permits CloudFront to retrieve objects using `s3:GetObject` while restricting that permission to the designated CloudFront distribution.

This allows public content to remain accessible through CloudFront without making the S3 bucket itself public.

### Existing Security Boundary

**CloudFront → Public delivery**

**S3 → Private origin**

Visitors are not expected to retrieve website objects directly from S3.

### Engineering Decision

The existing CloudFront-to-S3 security boundary already satisfies the desired architectural capability and will be preserved unless later testing identifies a reason to change it.

### Principle Reinforced

> Discover before replacing.

Existing infrastructure should not be rebuilt merely because a new project begins. A working component should be understood, verified, and preserved when it already satisfies the requirement.

## Verification 01 — Public Delivery and Private Origin

The existing delivery architecture was tested from the visitor perspective rather than validated solely through AWS console configuration.

### Test 1 — Public Application Path

**Request**

`https://docdott.com`

**Expected Result**

The website should load successfully through CloudFront using HTTPS without a certificate warning.

**Observed Result**

The website loaded successfully over HTTPS.

**Status: PASS**

---

### Test 2 — Direct S3 Origin Access

**Request**

`https://docdott.com.s3.us-east-1.amazonaws.com/index.html`

**Expected Result**

Direct access to the S3 object should be denied because the bucket is configured as a private origin.

**Observed Result**

Amazon S3 returned an access-denied response.

**Status: PASS**

---

## Conclusion

The tests confirm the intended security boundary:

**Visitor → CloudFront → S3: ALLOWED**

**Visitor → S3 directly: DENIED**

The existing S3, CloudFront, TLS, and DNS implementation therefore satisfies the static delivery requirements and does not need to be rebuilt.

### Principle Reinforced

> Configuration is a claim. Verification is evidence.

