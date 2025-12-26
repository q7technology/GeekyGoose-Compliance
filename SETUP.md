# AI Scanning Setup Guide

This guide will help you set up and test the AI scanning functionality for the GeekyGoose Compliance Platform.

## Overview

The AI scanning system includes:

1. **Text Extraction Pipeline** - Extracts text from PDF, DOCX, TXT, and image files
2. **Celery Worker System** - Background processing for document extraction and AI scanning
3. **LLM Integration** - OpenAI GPT-4 for compliance analysis with structured output
4. **Essential Eight Framework** - Pre-seeded compliance framework with MFA control
5. **Scanning API** - RESTful endpoints for triggering and monitoring scans
6. **React UI** - Frontend for managing controls, evidence, and viewing scan results

## Prerequisites

1. **Docker & Docker Compose** - For database, Redis, and MinIO
2. **Python 3.8+** - For the FastAPI backend
3. **Node.js 18+** - For the Next.js frontend
4. **OpenAI API Key** - For AI scanning functionality

## Installation Steps

### 1. Start Infrastructure Services

```bash
# Start PostgreSQL, Redis, and MinIO
docker-compose up -d postgres redis minio

# Verify services are running
docker-compose ps
```

### 2. Set Up Python Dependencies

```bash
cd apps/api

# Install dependencies
pip install -r requirements.txt

# Note: If PyMuPDF fails to install, you may need system dependencies:
# Ubuntu/Debian: sudo apt-get install python3-dev
# macOS: brew install python@3.9
```

### 3. Configure Environment

```bash
# Copy and edit environment file
cp .env.example .env

# Edit .env and set your OpenAI API key:
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 4. Set Up Database

```bash
# Run database migrations
psql -h localhost -U geekygoose -d geekygoose -f ../../database/migrations/001_initial_schema.sql
psql -h localhost -U geekygoose -d geekygoose -f ../../database/migrations/002_seed_essential_eight.sql  
psql -h localhost -U geekygoose -d geekygoose -f ../../database/migrations/003_add_scanning_tables.sql

# Seed Essential Eight framework
python3 run_seed.py
```

### 5. Start Backend Services

```bash
# Terminal 1 - Start API server
cd apps/api
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Start Celery worker
cd apps/api  
celery -A worker worker --loglevel=info

# Optional Terminal 3 - Monitor Celery tasks
celery -A worker flower
```

### 6. Start Frontend

```bash
# Terminal 4 - Start Next.js frontend
cd apps/web
npm install
npm run dev
```

## Testing the System

### 1. Access the Application

- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- MinIO Console: http://localhost:9001 (admin/admin123)

### 2. Test AI Scanning Flow

1. **Navigate to Controls Library** (http://localhost:3000/controls)
2. **Select Essential Eight Framework**
3. **Click on "EE-7: Multi-Factor Authentication"**
4. **Upload Evidence Documents**:
   - Upload a sample MFA policy document (PDF/DOCX)
   - Or create a text file with MFA implementation details
5. **Link Evidence to Control**:
   - Use the "Link Evidence" functionality
   - Associate documents with specific requirements if desired
6. **Run AI Scan**:
   - Click "Start AI Scan" button
   - Monitor scan progress (status will change from pending → processing → completed)
7. **Review Results**:
   - View requirement-by-requirement analysis
   - Check confidence scores and rationales
   - Review compliance gaps and recommended actions

### 3. Example Test Documents

Create these sample files for testing:

**mfa_policy.txt**:
```
Multi-Factor Authentication Policy

1. All users must enable MFA for Office 365 access
2. Administrative accounts require hardware security keys
3. MFA is mandatory for VPN access
4. Approved methods: Microsoft Authenticator, FIDO2 keys
5. SMS codes are only temporary backup method
```

**azure_config.txt**:
```
Azure AD Conditional Access Configuration

Policy: Require MFA for All Users
Status: Enabled
Users: All users (156 total)
Applications: All cloud apps
Conditions: Any location
Controls: Require multi-factor authentication
Compliance: 100% user coverage
```

## API Endpoints

Key endpoints for the scanning system:

- `GET /frameworks` - List compliance frameworks
- `GET /frameworks/{id}/controls` - List controls for a framework  
- `GET /controls/{id}` - Get control details and requirements
- `POST /documents/upload` - Upload evidence document
- `POST /documents/{id}/link-evidence` - Link document to control
- `GET /controls/{id}/evidence` - Get linked evidence for control
- `POST /controls/{id}/scan` - Start AI compliance scan
- `GET /scans/{id}` - Get scan status and results

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps postgres
   
   # Restart if needed
   docker-compose restart postgres
   ```

2. **Redis Connection Failed**
   ```bash
   # Check Redis status
   docker-compose ps redis
   
   # Test Redis connection
   redis-cli -h localhost ping
   ```

3. **Text Extraction Fails**
   ```bash
   # Install system dependencies for PDF processing
   # Ubuntu/Debian:
   sudo apt-get install poppler-utils tesseract-ocr
   
   # macOS:
   brew install poppler tesseract
   ```

4. **OpenAI API Errors**
   - Verify API key is correct and has sufficient credits
   - Check rate limits if getting 429 errors
   - Ensure internet connectivity for API calls

5. **Celery Worker Not Processing**
   ```bash
   # Check worker logs
   celery -A worker worker --loglevel=debug
   
   # Check Redis connection
   redis-cli monitor
   ```

### Logs and Monitoring

- **API Logs**: Check uvicorn output for API errors
- **Worker Logs**: Check celery worker output for task processing
- **Database Logs**: Check docker logs geekygoose-postgres
- **Task Queue**: Use `celery -A worker flower` for task monitoring

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js UI    │───▶│   FastAPI API   │───▶│   PostgreSQL    │
│                 │    │                 │    │                 │
│ - Controls List │    │ - Upload Docs   │    │ - Frameworks    │
│ - Evidence Mgmt │    │ - Link Evidence │    │ - Controls      │
│ - Scan Results  │    │ - Start Scans   │    │ - Documents     │
└─────────────────┘    └─────────────────┘    │ - Scan Results  │
                                              └─────────────────┘
                                                       │
┌─────────────────┐    ┌─────────────────┐           │
│     MinIO       │    │  Celery Worker  │───────────┘
│   (File Store)  │◀───│                 │
│                 │    │ - Text Extract  │
│ - PDF/DOCX/IMG  │    │ - AI Scanning   │    ┌─────────────────┐
│ - Evidence Docs │    │ - OpenAI GPT-4  │───▶│   OpenAI API    │
└─────────────────┘    └─────────────────┘    │   (GPT-4)       │
         ▲                       │             └─────────────────┘
         │               ┌─────────────────┐
         └───────────────│     Redis       │
                         │  (Task Queue)   │
                         └─────────────────┘
```

## Next Steps

After successful setup:

1. **Add More Controls**: Extend the Essential Eight with additional controls
2. **Custom Frameworks**: Add ISO 27001, NIST CSF, or custom frameworks  
3. **Integration**: Connect to Microsoft 365, Intune, or other systems
4. **Reporting**: Build PDF reports and compliance dashboards
5. **Authentication**: Add proper user authentication and multi-tenancy

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review API documentation at http://localhost:8000/docs
3. Check application logs for specific error messages
4. Ensure all dependencies are properly installed