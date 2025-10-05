# Branch Protection Configuration

This file contains the GitHub CLI commands to set up branch protection rules for the TaskFlow repository.

## 🛡️ Setting Up Branch Protection

Run the following commands to configure branch protection for the main branch:

```bash
# Enable branch protection for main branch
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI/CD Pipeline"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":false}' \
  --field restrictions='{"users":[],"teams":[],"apps":[]}' \
  --field allow_force_pushes=false \
  --field allow_deletions=false

# Enable branch protection for master branch (if exists)
gh api repos/:owner/:repo/branches/master/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI/CD Pipeline"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":false}' \
  --field restrictions='{"users":[],"teams":[],"apps":[]}' \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

## 🔧 Alternative: Using GitHub Web Interface

If you prefer using the web interface:

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Branches** in the left sidebar
4. Click **Add rule** or **Add branch protection rule**
5. Configure the following settings:

### Required Settings:
- **Branch name pattern**: `main` (or `master`)
- **Require a pull request before merging**: ✅
- **Require approvals**: 1
- **Dismiss stale PR approvals when new commits are pushed**: ✅
- **Require status checks to pass before merging**: ✅
- **Require branches to be up to date before merging**: ✅
- **Status checks**: Select "CI/CD Pipeline"
- **Restrict pushes that create files**: ✅
- **Allow force pushes**: ❌
- **Allow deletions**: ❌

## 📋 Protection Rules Summary

The configured protection rules include:

- ✅ **Pull Request Required**: All changes must go through PR
- ✅ **Status Checks**: CI/CD pipeline must pass
- ✅ **Reviews Required**: At least 1 approval required
- ✅ **Up-to-date Branches**: Branch must be current
- ✅ **Admin Enforcement**: Rules apply to admins too
- ❌ **Force Push**: Disabled for safety
- ❌ **Branch Deletion**: Disabled for safety

## 🚀 Next Steps

After setting up branch protection:

1. Test the protection by creating a test PR
2. Verify that status checks are required
3. Ensure reviews are mandatory
4. Document the process for team members

## 📚 Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
