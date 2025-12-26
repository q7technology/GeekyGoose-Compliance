# Contributing to GeekyGoose Compliance

Thank you for your interest in contributing to GeekyGoose Compliance! This document provides guidelines and information for contributors.

## 🤝 Ways to Contribute

### 🐛 Bug Reports
- **Search existing issues** before creating a new one
- **Use the bug report template** when filing issues
- **Include reproduction steps**, expected vs actual behavior
- **Provide system information** (OS, Docker version, etc.)

### 💡 Feature Requests
- **Check the roadmap** to see if it's already planned
- **Use the feature request template** for new suggestions
- **Explain the use case** and business value
- **Consider implementation complexity** and breaking changes

### 📖 Documentation
- **Fix typos and improve clarity** in README, docs, and code comments
- **Add examples** for common use cases
- **Translate documentation** to other languages
- **Create tutorials** and how-to guides

### 🔧 Code Contributions
- **Start with "good first issue"** labels for easier entry points
- **Follow the development setup** instructions below
- **Add tests** for new functionality
- **Update documentation** for API changes

## 🛠️ Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)
- Git

### Initial Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/geekygoose-compliance.git
cd geekygoose-compliance

# Copy environment file
cp .env.example .env

# Start development environment
docker-compose up -d

# Initialize database
docker-compose exec api python create_tables.py
docker-compose exec api python seed_database.py
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

### Worker Development
```bash
cd apps/api
celery -A celery_app worker --loglevel=info
```

## 📋 Development Guidelines

### **Code Style**

#### TypeScript/JavaScript (Frontend)
- **ESLint + Prettier**: Run `npm run lint` and `npm run format`
- **TypeScript strict mode**: All code must pass strict type checking
- **Component structure**: Use functional components with hooks
- **File naming**: kebab-case for files, PascalCase for components

#### Python (Backend)
- **Black formatter**: Run `black .` for consistent formatting
- **Type hints**: Use Python type hints for all function parameters and returns
- **Docstrings**: Follow Google style docstrings
- **Import order**: Use `isort` for consistent import ordering

### **Testing Requirements**

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
python -m pytest -v tests/         # Verbose output
```

#### Integration Tests
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

### **Database Changes**
- **Always create migrations** for database schema changes
- **Test migrations** both up and down
- **Seed data changes** should be backward compatible

```bash
# Create migration
docker-compose exec api alembic revision --autogenerate -m "Add new table"

# Apply migration
docker-compose exec api alembic upgrade head

# Downgrade migration (if needed)
docker-compose exec api alembic downgrade -1
```

## 📝 Pull Request Process

### 1. **Before Starting**
- **Create an issue** or comment on existing issues to discuss the change
- **Fork the repository** and create a feature branch
- **Keep changes focused** - one feature/fix per PR

### 2. **Branch Naming**
```bash
feature/add-iso27001-support
bugfix/fix-scan-timeout-issue
docs/update-api-documentation
chore/update-dependencies
```

### 3. **Commit Messages**
Use [Conventional Commits](https://conventionalcommits.org/) format:
```bash
feat: add ISO 27001 framework support
fix: resolve scan timeout when processing large documents
docs: add API authentication examples
chore: update dependencies to latest versions
test: add unit tests for evidence linking
```

### 4. **Pull Request Checklist**
- [ ] **Code follows style guidelines** (ESLint/Black passing)
- [ ] **Tests added/updated** and all tests passing
- [ ] **Documentation updated** for any API/UI changes
- [ ] **No breaking changes** without prior discussion
- [ ] **Screenshots included** for UI changes
- [ ] **Migration files** for database changes
- [ ] **Changelog updated** for significant changes

### 5. **Review Process**
- **Automated checks** must pass (CI/CD pipeline)
- **At least one approval** from maintainers required
- **Address feedback** promptly and professionally
- **Squash commits** before merging (maintainers will handle this)

## 🏗️ Architecture Guidelines

### **Frontend Architecture**
- **Next.js App Router**: Use server components where possible
- **State Management**: React Context for global state, useState for local
- **API Calls**: Use TanStack Query for data fetching
- **UI Components**: Build on shadcn/ui components
- **Styling**: Tailwind CSS with consistent design tokens

### **Backend Architecture**
- **FastAPI**: Async/await patterns for I/O operations
- **Database**: SQLAlchemy ORM with Alembic migrations
- **Background Jobs**: Celery with Redis for async tasks
- **File Storage**: MinIO (S3-compatible) for document storage
- **Security**: JWT authentication with role-based access

### **AI Integration**
- **Provider Agnostic**: Support both OpenAI API and local Ollama
- **Structured Output**: Use Pydantic models for AI response validation
- **Error Handling**: Graceful degradation when AI services unavailable
- **Privacy**: Configurable data retention and processing policies

## 🧪 Testing Strategy

### **Unit Tests**
- **Frontend**: React Testing Library + Jest
- **Backend**: pytest with fixtures
- **Coverage Target**: >80% for new code
- **Test Structure**: Arrange, Act, Assert pattern

### **Integration Tests**
- **API Endpoints**: Test full request/response cycles
- **Database**: Test migrations and data integrity
- **File Processing**: Test document upload and extraction
- **AI Pipeline**: Test end-to-end compliance scanning

### **E2E Tests**
- **User Workflows**: Critical paths like upload → scan → report
- **Cross-Browser**: Chrome, Firefox, Safari compatibility
- **Performance**: Page load times and API response times

## 🐛 Bug Triage

### **Severity Levels**
- **Critical**: Security vulnerabilities, data loss, system crashes
- **High**: Major functionality broken, blocking workflows
- **Medium**: Minor functionality issues, poor UX
- **Low**: Cosmetic issues, nice-to-have improvements

### **Priority Labels**
- **P0**: Fix immediately (security, data loss)
- **P1**: Fix in current sprint (blocking features)
- **P2**: Fix in next release (important improvements)
- **P3**: Fix when time permits (minor issues)

## 📊 Performance Guidelines

### **Frontend Performance**
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Monitor and optimize JavaScript bundles
- **Image Optimization**: Use Next.js Image component
- **Caching**: Implement proper browser and CDN caching

### **Backend Performance**
- **API Response Times**: < 200ms for simple queries, < 2s for complex
- **Database Queries**: Use proper indexes, avoid N+1 queries
- **Memory Usage**: Monitor and optimize memory consumption
- **Concurrent Users**: Test with realistic load scenarios

## 🔒 Security Guidelines

### **Security Best Practices**
- **Input Validation**: Validate all user inputs on both client and server
- **SQL Injection**: Use parameterized queries only
- **XSS Prevention**: Sanitize user content, use CSP headers
- **Authentication**: Implement proper session management
- **Authorization**: Check permissions on every API call
- **File Uploads**: Validate file types and scan for malware

### **Dependency Management**
- **Regular Updates**: Keep dependencies updated
- **Security Scanning**: Use tools like `npm audit` and `safety`
- **License Compliance**: Ensure all dependencies have compatible licenses

## 🎉 Recognition

Contributors will be recognized in the following ways:
- **GitHub Contributors**: Automatic recognition in repository
- **Changelog**: Major contributions listed in release notes
- **Documentation**: Contributors page with profiles and contributions
- **Swag**: Stickers and merchandise for significant contributors
- **References**: LinkedIn recommendations for substantial contributions

## 📞 Getting Help

### **Development Questions**
- **GitHub Discussions**: General questions and design discussions
- **Discord**: Real-time chat with maintainers and community
- **Office Hours**: Weekly video calls for complex topics

### **Mentorship**
- **Good First Issues**: Beginner-friendly issues with guidance
- **Pair Programming**: Video sessions with experienced contributors
- **Code Reviews**: Detailed feedback for learning opportunities

## 📜 Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms. We are committed to providing a welcoming and inclusive experience for all contributors.

---

Thank you for contributing to GeekyGoose Compliance! Your efforts help make compliance easier for organizations worldwide. 🦆