# 🔍 Code-RV Integration

This project is integrated with **code-rv** for automated AI-powered code review.

## 🚀 How It Works

When you create a Pull Request or push to `main`/`develop`, the code-rv workflow will:

1. 📥 Download or build the code-rv CLI
2. 🔍 Analyze the changed code between commits
3. 📋 Run static analysis rules (19 built-in rules)
4. 🤖 Optionally run AI-powered review (requires API key)
5. 💬 Comment the results on the PR

## ⚙️ Setup

### Required Secrets

Add these secrets to your repository settings (`Settings > Secrets and variables > Actions`):

| Secret | Required | Description |
|--------|----------|-------------|
| `ANTHROPIC_API_KEY` | Optional | Anthropic Claude API key for AI review |

### Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `code-review.yml` | PR, Push | Downloads pre-built binary |
| `code-review-build.yml` | PR | Builds from source |

## 📊 What Gets Reviewed

### Static Analysis Rules

| Rule | Description |
|------|-------------|
| C002 | TODO/FIXME/XXX comments |
| C003 | console.log in production |
| C006 | Function naming conventions |
| C010 | Excessive nesting depth |
| C014 | Dependency injection issues |
| S001 | Hardcoded secrets |
| ... | And 13 more rules |

### AI Review (Optional)

When `ANTHROPIC_API_KEY` is set, the AI will review:

- Code quality and maintainability
- Potential bugs and edge cases
- Security vulnerabilities
- Performance considerations
- Best practices suggestions

## 🔧 Local Development

Run code-rv locally to preview what CI will detect:

```bash
# Install code-rv
curl -fsSL https://raw.githubusercontent.com/sun-asterisk/engineer-excellence/main/code-rv-app/scripts/install.sh | bash

# Review your changes before committing
code-rv review --from HEAD~1 --to HEAD

# Review last 5 commits
code-rv review --from HEAD~5 --to HEAD

# Static analysis only (no AI)
code-rv review --no-ai

# With verbose output
code-rv review -v
```

## 📝 Example Output

```markdown
## 🔍 Code Review Report

**Quality Score**: 8.5/10
**Files Changed**: 3
**Issues Found**: 2

### ⚠️ Warnings

| File | Line | Rule | Issue |
|------|------|------|-------|
| todos.service.ts | 45 | C003 | Remove console.log before production |
| todos.controller.ts | 12 | C002 | TODO comment: implement pagination |

### ✅ Good Practices Detected

- Proper error handling in service layer
- TypeScript strict mode enabled
- Dependency injection used correctly
```

## 🔗 Resources

- [code-rv Documentation](https://github.com/sun-asterisk/engineer-excellence/tree/main/code-rv-app)
- [Rule Reference](https://github.com/sun-asterisk/engineer-excellence/tree/main/code-rv-app/docs)
