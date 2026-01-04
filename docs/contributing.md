---
layout: default
title: Contributing
---

# Contributing to GeekyGoose Compliance

Thank you for your interest in contributing! This guide will help you get started.

---

## 🤝 Ways to Contribute

### 🐛 Bug Reports

Found a bug? Help us fix it!

- **Search existing issues** before creating a new one
- **Use the bug report template** when filing issues
- **Include reproduction steps**, expected vs actual behavior
- **Provide system information** (OS, Docker version, etc.)

[Report a Bug →](https://github.com/ggcompli/GeekyGoose-Compliance/issues/new?template=bug_report.md)

### 💡 Feature Requests

Have an idea for improvement?

- **Check the roadmap** to see if it's already planned
- **Use the feature request template** for new suggestions
- **Explain the use case** and business value
- **Consider implementation complexity**

[Request a Feature →](https://github.com/ggcompli/GeekyGoose-Compliance/issues/new?template=feature_request.md)

### 📖 Documentation

Improve our docs!

- Fix typos and improve clarity in README, docs, and code comments
- Add examples for common use cases
- Translate documentation to other languages
- Create tutorials and how-to guides

### 🔧 Code Contributions

Write code to improve GeekyGoose!

- Start with "**good first issue**" labels for easier entry points
- Follow the development setup instructions
- Add tests for new functionality
- Update documentation for API changes

---

## 🛠️ Development Setup

### Prerequisites

- **Docker** and **Docker Compose**
- **Node.js 18+** (for local frontend development)
- **Python 3.11+** (for local backend development)
- **Git**

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/GeekyGoose-Compliance.git
cd GeekyGoose-Compliance

# Copy environment file
cp .env.example .env

# Start development environment
docker-compose up -d

# Initialize database
docker-compose exec api python init_db.py
docker-compose exec api python run_seed.py
```

### Frontend Development

```bash
cd apps/web
npm install
npm run dev
# Access at http://localhost:3000
```

### Backend Development

```bash
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# Access at http://localhost:8000
```

---

## 📋 Development Guidelines

### Code Style

#### TypeScript/JavaScript (Frontend)

- **ESLint + Prettier**: Run `npm run lint` and `npm run format`
- **TypeScript strict mode**: All code must pass strict type checking
- **Component structure**: Use functional components with hooks
- **File naming**: kebab-case for files, PascalCase for components

#### Python (Backend)

- **Black formatter**: Run `black .` for consistent formatting
- **Type hints**: Use Python type hints for all function parameters
- **Docstrings**: Follow Google style docstrings
- **Import order**: Use `isort` for consistent import ordering

### Testing Requirements

#### Frontend Tests

```bash
cd apps/web
npm test                 # Run all tests
npm run test:coverage   # Generate coverage report
```

#### Backend Tests

```bash
cd apps/api
python -m pytest                    # Run all tests
python -m pytest --cov=.           # Run with coverage
```

**Coverage Target:** >80% for new code

---

## 📝 Pull Request Process

### 1. Before Starting

- **Create an issue** or comment on existing issues to discuss the change
- **Fork the repository** and create a feature branch
- **Keep changes focused** - one feature/fix per PR

### 2. Branch Naming

```bash
feature/add-iso27001-support
bugfix/fix-scan-timeout-issue
docs/update-api-documentation
chore/update-dependencies
```

### 3. Commit Messages

Use [Conventional Commits](https://conventionalcommits.org/) format:

```bash
feat: add ISO 27001 framework support
fix: resolve scan timeout when processing large documents
docs: add API authentication examples
chore: update dependencies to latest versions
test: add unit tests for evidence linking
```

**Important:** All commits must be **signed off** (see DCO section below).

### 4. Pull Request Checklist

- [ ] Code follows style guidelines (ESLint/Black passing)
- [ ] Tests added/updated and all tests passing
- [ ] Documentation updated for any API/UI changes
- [ ] No breaking changes without prior discussion
- [ ] Screenshots included for UI changes
- [ ] Migration files for database changes
- [ ] All commits signed off with DCO

### 5. Review Process

- **Automated checks** must pass (CI/CD pipeline)
- **At least one approval** from maintainers required
- **Address feedback** promptly and professionally
- **Squash commits** before merging (maintainers will handle this)

---

## 📜 Contributor License Agreement (CLA) / Developer Certificate of Origin (DCO)

### Developer Certificate of Origin (DCO)

This project uses the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) to ensure contributions can be legally included.

**By contributing, you certify that:**

1. The contribution was created in whole or in part by you and you have the right to submit it under the AGPLv3 license; or
2. The contribution is based upon previous work that, to the best of your knowledge, is covered under an appropriate open source license; or
3. The contribution was provided directly to you by someone who certified (1) or (2).

### How to Sign Off on Your Commits

Use the `-s` or `--signoff` flag when committing:

```bash
git commit -s -m "Add new compliance framework support"
```

This adds a "Signed-off-by" line to your commit message:

```
Add new compliance framework support

Signed-off-by: Your Name <your.email@example.com>
```

### Sign Off on Existing Commits

```bash
# Sign off on the last commit
git commit --amend --signoff

# Sign off on multiple commits (interactive rebase)
git rebase HEAD~3 --signoff
```

### Automated DCO Checks

All pull requests are automatically checked for DCO sign-off. PRs with unsigned commits will be blocked until all commits are signed off.

### Full CLA (For Significant Contributions)

For significant contributions (major features, large refactors, architectural changes), we may request a full **Contributor License Agreement (CLA)**. This ensures:

- Legal clarity for contributions
- Ability to relicense if needed (e.g., for commercial licensing)
- Protection for both contributors and the project

If a CLA is required, we'll contact you during the pull request review process.

---

## 🏗️ Architecture Guidelines

### Frontend Architecture

- **Next.js App Router**: Use server components where possible
- **State Management**: React Context for global state
- **API Calls**: Use shared API utilities
- **UI Components**: Build on shadcn/ui components
- **Styling**: Tailwind CSS with consistent design tokens

### Backend Architecture

- **FastAPI**: Async/await patterns for I/O operations
- **Database**: SQLAlchemy ORM with Alembic migrations
- **Background Jobs**: Celery with Redis for async tasks
- **File Storage**: MinIO (S3-compatible) for documents
- **Security**: Comprehensive middleware and validation

### AI Integration

- **Provider Agnostic**: Support both OpenAI API and local Ollama
- **Structured Output**: Use Pydantic models for validation
- **Error Handling**: Graceful degradation when AI unavailable
- **Privacy**: Configurable data retention policies

---

## 🎉 Recognition

Contributors are recognized in the following ways:

- ✅ **GitHub Contributors**: Automatic recognition in repository
- ✅ **Changelog**: Major contributions listed in release notes
- ✅ **Documentation**: Contributors page with profiles
- ✅ **Community**: Shout-outs in discussions and social media

---

## 📞 Getting Help

### Development Questions

- 💬 **GitHub Discussions**: [Ask questions](https://github.com/ggcompli/GeekyGoose-Compliance/discussions)
- 📧 **Email**: [community@geekygoose.io](mailto:community@geekygoose.io)

### Licensing Questions

- 📧 **Email**: [admin@geekygoose.io](mailto:admin@geekygoose.io)
- 📄 **Docs**: [License Information](license)

---

## 📜 Code of Conduct

This project is released with a **Code of Conduct**. By participating, you agree to abide by its terms. We're committed to providing a welcoming and inclusive experience for all contributors.

[View Code of Conduct →](https://github.com/ggcompli/GeekyGoose-Compliance/blob/main/CODE_OF_CONDUCT.md)

---

## Quick Links

- 📖 [Full Contributing Guide](https://github.com/ggcompli/GeekyGoose-Compliance/blob/main/CONTRIBUTING.md)
- 🐛 [Report a Bug](https://github.com/ggcompli/GeekyGoose-Compliance/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/ggcompli/GeekyGoose-Compliance/issues/new?template=feature_request.md)
- 💬 [GitHub Discussions](https://github.com/ggcompli/GeekyGoose-Compliance/discussions)
- 📄 [License Information](license)

---

<p style="background: #2ea44f; color: white; padding: 20px; border-radius: 6px; text-align: center; margin: 40px 0;">
<strong>Ready to Contribute?</strong><br>
<a href="https://github.com/ggcompli/GeekyGoose-Compliance/fork" style="color: white; text-decoration: none; font-size: 18px;">
Fork the Repository →
</a>
</p>

---

Thank you for contributing to GeekyGoose Compliance! Your efforts help make compliance easier for organizations worldwide. 🦆

---

<p style="text-align: center; margin-top: 50px; padding-top: 30px; border-top: 1px solid #e1e4e8;">
<a href="/" style="margin: 0 15px;">← Back to Home</a> |
<a href="license" style="margin: 0 15px;">License Information</a> |
<a href="commercial" style="margin: 0 15px;">Commercial License</a> |
<a href="trademark" style="margin: 0 15px;">Trademark Policy</a>
</p>
