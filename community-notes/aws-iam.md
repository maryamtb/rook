# AWS IAM how-to

How to set up IAM access with the AWS CLI: create users, give them credentials, organize them into groups, write least-privilege policies, and create and assume roles.

## The pieces

- **User**: a person or app with long-lived credentials (password, access keys, SSH keys).
- **Group**: a set of users. Attach policies to the group, not to each user.
- **Role**: an identity with no credentials of its own. Services, other accounts, or users assume it and get temporary credentials.
- **Policy**: a JSON document that allows or denies actions on resources. Attaches to users, groups, or roles.

Everything is denied by default. An explicit `Deny` always beats an `Allow`.

## 1. Create a user

For humans, prefer IAM Identity Center (SSO). Create IAM users mainly for CI and tooling that can't assume roles.

```bash
aws iam create-user --user-name <name>

aws iam create-login-profile --user-name <name> \
  --password <temp-password> --password-reset-required    # console access

aws iam create-access-key --user-name <name>              # CLI/API access; secret is shown once
```

## 2. SSH keys

Two different things share the name. IAM SSH public keys belong to a user and are used for CodeCommit; EC2 key pairs are what you SSH into instances with.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/<key-name>                # generate a key pair locally

aws iam upload-ssh-public-key --user-name <name> \
  --ssh-public-key-body file://~/.ssh/<key-name>.pub      # attach public key to the IAM user

aws ec2 create-key-pair --key-name <name> \
  --query 'KeyMaterial' --output text > <name>.pem        # EC2 instance key instead
chmod 400 <name>.pem
```

## 3. Put users in groups

Permissions attached to a group apply to every member, so adding or removing a user is one command.

```bash
aws iam create-group --group-name <group>
aws iam add-user-to-group --user-name <name> --group-name <group>

aws iam attach-group-policy --group-name <group> \
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess     # AWS managed policy
```

## 4. Write a least-privilege policy

List the exact actions the workload needs and the exact resources it needs them on. Avoid `"Action": "*"` and `"Resource": "*"`.

```bash
cat > policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::<bucket>/app-data/*"
    }
  ]
}
EOF

aws iam create-policy --policy-name <name> --policy-document file://policy.json
```

To find the smallest set of permissions in practice:

1. Start with your narrowest guess.
2. Run the workload. `AccessDenied` errors name the exact missing action.
3. Add only that action, on the narrowest resource ARN that works. Repeat.

IAM Access Analyzer can also generate a policy from CloudTrail activity once the workload has run for a while.

## 5. Create a role

A role has two parts: a trust policy (who may assume it) and permission policies (what it can do once assumed).

```bash
cat > trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

aws iam create-role --role-name <name> --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name <name> --policy-arn <policy-arn>
```

Common trust principals: `ec2.amazonaws.com`, `lambda.amazonaws.com`, a whole account (`"AWS": "arn:aws:iam::<account-id>:root"`), or a specific user or role ARN.

## 6. Assume the role

```bash
aws sts assume-role \
  --role-arn arn:aws:iam::<account-id>:role/<name> \
  --role-session-name <session>                           # returns temporary key + token
```

For day-to-day CLI use, put the role in a profile instead and the CLI handles the temporary credentials:

```ini
# ~/.aws/config
[profile <profile-name>]
role_arn = arn:aws:iam::<account-id>:role/<name>
source_profile = default
```

## Inspect and clean up

```bash
aws iam list-attached-user-policies --user-name <name>
aws iam list-attached-role-policies --role-name <name>

aws iam simulate-principal-policy \
  --policy-source-arn <user-or-role-arn> \
  --action-names s3:GetObject                             # dry-run: would this be allowed?

aws iam detach-user-policy --user-name <name> --policy-arn <arn>
aws iam delete-access-key --user-name <name> --access-key-id <id>
```

## Least privilege rules of thumb

- Prefer roles and temporary credentials over IAM users with long-lived keys.
- Attach policies to groups and roles, not to individual users.
- Scope `Resource` to specific ARNs; avoid `"Resource": "*"` except in read-only policies.
- Start with AWS managed policies, replace them with customer-managed ones once usage is clear.
- One role per workload, so removing a permission never breaks a second workload.

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
