# Infrastructure as Code

> [!CAUTION]
> This infra folder is a simulation and has not been used in the actual workshop. It serves as a demonstration of security misconfigurations for educational purposes.

This directory contains Terraform configurations for deploying the workshop application infrastructure on AWS. The infrastructure is intentionally designed with various security misconfigurations to demonstrate IaC security scanning tools.

## Infrastructure Components

- **VPC** - Virtual Private Cloud with public and private subnets
- **EC2** - Application server instance
- **Security Groups** - Network access control
- **Internet Gateway** - Internet connectivity

## Security Issues (Intentional for Workshop)

This Terraform configuration contains several security misconfigurations that will be detected during the workshop:

1. **Overly Permissive Security Groups** - SSH access from 0.0.0.0/0
2. **Unencrypted Resources** - EBS volumes without encryption
3. **Exposed Outputs** - Sensitive information in outputs
4. **Missing Security Features** - No IMDSv2 enforcement
5. **Hardcoded Values** - Credentials in variables
6. **No State Encryption** - Backend without encryption
7. **Missing State Locking** - No DynamoDB state locking

## Files

- `main.tf` - Provider configuration and backend settings
- `variables.tf` - Input variables (with security issues)
- `ec2.tf` - EC2 and networking resources
- `outputs.tf` - Output values (with sensitive data exposure)

## Usage

```bash
# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan deployment
terraform plan

# Apply configuration
terraform apply
```

## Workshop Steps

During the workshop, various IaC security scanning tools will identify these issues:

1. **Checkov** - Policy as code scanner
2. **TFSec** - Terraform security scanner
3. **Terrascan** - Infrastructure security scanner
4. **Semgrep** - SAST for IaC

## Security Best Practices (For Reference)

- Enable encryption for all resources
- Use least privilege access principles
- Implement proper state management
- Use secure backends with encryption
- Avoid hardcoded credentials
- Enable security monitoring and logging
