# Runtime Infrastructure Scan

This workshop module focuses on scanning the deployed (runtime) infrastructure for vulnerabilities and misconfigurations that may not be detectable through static analysis of code or configuration files.

## Why is Runtime Infrastructure Scanning Important?

While IaC scans catch many issues pre-deployment, runtime infrastructure scanning is crucial because some vulnerabilities or misconfigurations only manifest once resources are live. This could be due to manual changes, dynamic variables, complex interactions, or even a bug in your IaC provider that end up deploying resources in a way that is not intended.

Continuous runtime scanning helps ensure your infrastructure remains secure after deployment and as it evolves.


## Common Runtime Infrastructure Issues

Many of these issues are shared with the [IaC Security](../iac_scan/) module.

### Access Control
- **Overly Permissive IAM Policies** – wildcard privileges and never-used rights that violate least-privilege.
- **Publicly Accessible Resources** – buckets, APIs, or DBs left open to the internet.
- **Missing Authentication Controls** – services deployed with no auth/MFA, allowing unauthenticated calls.
- **Default or Weak Credentials** – reused passwords and default logins vulnerable to brute-force.

### Encryption
- **Unencrypted Storage at Rest** – plaintext data in S3, EBS, RDS, state files.
- **Unencrypted Backups & Snapshots** – archives stored without server- or client-side encryption.
- **Missing TLS/In-Transit Encryption** – APIs or internal links still on plain HTTP or legacy protocols.
- **Weak or Outdated Cipher Suites** – obsolete algorithms or short keys still in use.

### Network Security
- **Open Security Groups (0.0.0.0/0)** – internet-wide access to SSH, RDP, or high-risk custom ports.
- **Public-Subnet Exposure** – instances or containers with public IPs sitting in public subnets.
- **Mis-scoped Load Balancers/Endpoints** – “internal” services accidentally reachable from the internet.

### Compliance & Governance
- **Insufficient Logging & Audit Trails** – generating blind spots for forensics and incident response.
- **Lack of Continuous Monitoring/Alerts** – misconfigurations persist until breach or audit.
- **Missing Resource Tagging** – untagged assets break cost, ownership, and policy enforcement.
- **Improper Backup Retention/Encryption** – backups stored unencrypted or outside mandated retention windows.

### Differences from IaC Scan
- **Drift** – resources that are not managed by IaC, such as manual changes to resources or manual deployments.

## Tools Used in This Module

- [**Prowler**](https://github.com/prowler-cloud/prowler) - Security best practices assessments for multiple cloud providers (AWS, Azure, GCP, M365, GitHub and more)
  - Can also be used for continuous monitoring and remediation, but we focus on the assessment part
- [**Steampipe**](https://github.com/turbot/steampipe) - SQL-based infrastructure analysis and compliance checking for cloud platforms
  - Uses SQL queries to analyze cloud resources and run security compliance checks across multiple providers

## Learning Objectives

By the end of this module, you will:
- Understand the importance of runtime infrastructure scanning
- Learn to use automated tools to assess live cloud environments


## Security Checklist

- [ ] All systems and services are up to date with security patches
- [ ] No unnecessary open ports or services
- [ ] Strong authentication and access controls in place
- [ ] Security groups/firewalls follow least privilege
- [ ] Encryption enabled for data at rest and in transit
- [ ] No sensitive resources publicly exposed
- [ ] Monitoring and logging enabled for all critical resources
- [ ] Regular runtime scans scheduled and reviewed

## References
- [Prowler's State of Cloud Security Report 2025](https://prowler.com/blog/cloud-security-report-2025/)
- [Top cloud misconfigurations: A CSPM perspective](https://sysdig.com/blog/top-cloud-misconfigurations/)
