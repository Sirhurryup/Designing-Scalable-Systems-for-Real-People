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
