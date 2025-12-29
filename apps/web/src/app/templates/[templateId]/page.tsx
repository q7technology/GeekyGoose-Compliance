'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { downloadTemplateAsWord } from '../../../utils/policyGenerator';

interface Template {
  id: string;
  name: string;
  description: string;
  control: {
    id: string;
    code: string;
    title: string;
    framework_name: string;
  };
  company_fields: Array<{
    field_name: string;
    field_type: 'text' | 'textarea' | 'select' | 'file';
    required: boolean;
    placeholder?: string;
    options?: string[];
  }>;
  evidence_requirements: Array<{
    requirement_id: string;
    requirement_code: string;
    evidence_type: string;
    description: string;
    required: boolean;
  }>;
  created_at: string;
  updated_at: string;
}

interface TemplateSubmission {
  id: string;
  template_id: string;
  company_data: Record<string, any>;
  evidence_files: Array<{
    requirement_code: string;
    filename: string;
    file_size: number;
    uploaded_at?: string;
    note?: string;
  }>;
  submitted_at: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  ai_validation_summary?: {
    total_evidence: number;
    validated_evidence: number;
    passed: number;
    warnings: number;
    failed: number;
  };
}

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = params.templateId as string;
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [submissions, setSubmissions] = useState<TemplateSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (templateId) {
      Promise.all([
        fetchTemplate(),
        fetchSubmissions()
      ]).finally(() => setLoading(false));
    }
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      // Fetch template from localStorage
      const storedTemplates = localStorage.getItem('compliance_templates');
      if (storedTemplates) {
        const templates = JSON.parse(storedTemplates);
        const foundTemplate = templates.find((t: any) => t.id === templateId);
        
        if (foundTemplate) {
          setTemplate(foundTemplate);
        } else {
          console.error('Template not found');
        }
      } else {
        console.error('No templates found in storage');
      }
    } catch (error) {
      console.error('Failed to fetch template:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      // Fetch submissions from localStorage
      const storedSubmissions = localStorage.getItem('template_submissions');
      if (storedSubmissions) {
        const allSubmissions = JSON.parse(storedSubmissions);
        // Filter submissions for this specific template
        const templateSubmissions = allSubmissions
          .filter((sub: any) => sub.template_id === templateId)
          .map((sub: any) => ({
            id: sub.id,
            template_id: sub.template_id,
            company_data: sub.company_data,
            evidence_files: sub.evidence_uploads,
            submitted_at: sub.submitted_at,
            status: sub.status,
            ai_validation_summary: sub.ai_validation_summary
          }));
        setSubmissions(templateSubmissions);
      } else {
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      setSubmissions([]);
    }
  };

  const getStatusColor = (status: TemplateSubmission['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading template details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Template not found</h2>
            <Link href="/templates" className="text-blue-600 hover:text-blue-700">
              ← Back to Templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/templates" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Templates
          </Link>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {template.name}
              </h1>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-700">
                  <strong>Control:</strong> {template.control.code} - {template.control.title}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                  {template.control.framework_name}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/templates/${template.id}/fill`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Fill Template
              </Link>
              <button
                onClick={() => downloadTemplateAsWord(template)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                📄 Download Policy Word
              </button>
              <Link
                href={`/templates/${template.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Template
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Template Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Fields */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Company Information Fields</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fields that users will fill out when using this template.
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {template.company_fields.map((field, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 capitalize">
                              {field.field_name.replace('_', ' ')}
                            </h3>
                            {field.required && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Type: <span className="font-medium">{field.field_type}</span>
                          </p>
                          {field.placeholder && (
                            <p className="text-sm text-gray-500 mt-1">
                              Placeholder: "{field.placeholder}"
                            </p>
                          )}
                          {field.options && field.options.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600 mb-1">Options:</p>
                              <div className="flex flex-wrap gap-1">
                                {field.options.map((option, optIndex) => (
                                  <span
                                    key={optIndex}
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                  >
                                    {option}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Evidence Requirements */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Evidence Requirements</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Evidence that users must provide when filling out this template.
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {template.evidence_requirements.map((req, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {req.requirement_code}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {req.evidence_type}
                            </span>
                            {req.required && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{req.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Template Usage Statistics */}
          <div className="space-y-6">
            {/* Template Stats */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Template Statistics</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Submissions</span>
                    <span className="text-lg font-semibold text-gray-900">{submissions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved</span>
                    <span className="text-lg font-semibold text-green-600">
                      {submissions.filter(s => s.status === 'approved').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Review</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {submissions.filter(s => s.status === 'submitted').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Company Fields</span>
                    <span className="text-lg font-semibold text-gray-900">{template.company_fields.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Evidence Requirements</span>
                    <span className="text-lg font-semibold text-gray-900">{template.evidence_requirements.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
              </div>
              <div className="p-6">
                {submissions.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">No submissions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.slice(0, 5).map((submission) => (
                      <div key={submission.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {submission.company_data.company_name}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {submission.company_data.contact_person}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </div>
                        
                        {submission.ai_validation_summary && (
                          <div className="mb-2 text-xs">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <span className="text-green-600">✓ {submission.ai_validation_summary.passed}</span>
                              <span className="text-yellow-600">⚠ {submission.ai_validation_summary.warnings}</span>
                              <span className="text-red-600">✗ {submission.ai_validation_summary.failed}</span>
                              <span className="text-gray-500">AI Validated</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{submission.evidence_files.length} evidence files</span>
                          <span>{new Date(submission.submitted_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Template Metadata */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Template Information</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Created:</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date(template.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date(template.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Template ID:</span>
                    <p className="text-xs font-mono text-gray-900 mt-1 break-all">
                      {template.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}