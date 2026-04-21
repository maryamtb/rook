# AWS CLI quick reference

AWS cli basics for installation, auth, profiles.

## Install

```bash
brew install awscli                                    # macOS
# or: pip install awscli, or download from aws.amazon.com/cli

aws --version
```

## Authentication

### SSO (IAM Identity Center)

```bash
aws configure sso                                      # interactive setup, writes a profile
aws sso login --profile <name>                         # refresh an expired session
aws sso logout
```

### Static access keys (IAM user)

```bash
aws configure                                          # writes ~/.aws/credentials and ~/.aws/config
aws configure --profile <name>
```

### Assumed role

```bash
aws sts assume-role \
  --role-arn <arn> \
  --role-session-name <session-name>
```

## Profiles

```bash
aws configure list-profiles
aws configure list --profile <name>                    # what's set for a profile

aws s3 ls --profile <name>                             # one-shot
export AWS_PROFILE=<name>                              # shell-wide default
```

## whoami

```bash
aws sts get-caller-identity                            # the quickest sanity check
aws sts get-caller-identity --profile <name>
```

## Regions

```bash
aws configure set region <region> --profile <name>
export AWS_REGION=<region>                             # per-session override
aws ec2 describe-regions --output table                # list all regions
```
