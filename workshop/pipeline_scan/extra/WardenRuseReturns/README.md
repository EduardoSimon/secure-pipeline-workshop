# Warden Ruse Returns

> [!WARNING]
> The infrastructure for this challenge will be deployed only during live events.

Based on the Warden Ruse challenge from the [Cloud Village CTF 2024](https://unicrons.cloud/en/2024/08/13/writeup-cloud-village-ctf-2024/#wardens-ruse-540).

This time our Admin has been studying the GitHub Actions OIDC token and has added some new conditions to the policy to make it more secure.

Let's see if you can assume the `warden-production` role!



> [!TIP]
> AWS does not support all the claims that GitHub Actions OIDC token provides.
> You may need to use the `claims.json` file to include the claims that are supported by AWS.
> ```bash
> gh api /repos/<your-user-name/organization>/secure-pipeline-workshop/actions/oidc/customization/sub -H "Accept: application/vnd.github+json" -X PUT --input claims.json
> ```
> Note: the username or the organization is encoded in the url of the repository







🤫 And maybe you can use this in combinations with other workshop modules to find some `easter_egg.txt` in the workshop account?



## Creator notes
- For the sake of the challenge, not all terraform code is present.
- Thanks to the participants of [this issue](https://github.com/aws-actions/configure-aws-credentials/issues/454) for the knowledge about the GitHub Actions OIDC token and AWS

## References
- [GitHub Actions: OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect)
- [github/actions-oidc-debugger](https://github.com/github/actions-oidc-debugger)
