'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { downloadTemplateAsWord } from '../../utils/policyGenerator';

interface TemplateSubmission {
  id: string;
  template_id: string;
  template_name: string;
  control_code: string;
  control_title: string;
  framework_name: string;
  company_data: Record<string, any>;
  evidence_uploads: Array<{
    requirement_code: string;
    filename: string;
    file_size: number;
    note: string;
    ai_validation_result: any;
  }>;
  ai_validation_summary: {
    total_evidence: number;
    validated_evidence: number;
    passed: number;
    warnings: number;
    failed: number;
  };
  submitted_at: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<TemplateSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<TemplateSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const storedSubmissions = localStorage.getItem('template_submissions');
      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      } else {
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadSubmissionAsWord = async (submission: TemplateSubmission) => {
    try {
      // Get the original template from localStorage to have structure
      const storedTemplates = localStorage.getItem('compliance_templates');
      if (!storedTemplates) {
        alert('Template data not found. Cannot generate document.');
        return;
      }

      const templates = JSON.parse(storedTemplates);
      const template = templates.find((t: any) => t.id === submission.template_id);
      
      if (!template) {
        alert('Original template not found. Cannot generate document.');
        return;
      }

      // Create template object with submission data
      const templateWithData = {
        ...template,
        id: submission.template_id,
        name: submission.template_name,
        control: {
          id: template.control?.id || '',
          code: submission.control_code,
          title: submission.control_title,
          framework_name: submission.framework_name
        }
      };

      // Download with filled company data
      downloadTemplateAsWord(
        templateWithData, 
        submission.company_data.company_name || '[COMPANY NAME]', 
        submission.company_data
      );
    } catch (error) {
      console.error('Failed to download submission:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      return;
    }

    try {
      const storedSubmissions = localStorage.getItem('template_submissions');
      if (storedSubmissions) {
        const allSubmissions = JSON.parse(storedSubmissions);
        const filteredSubmissions = allSubmissions.filter((sub: any) => sub.id !== submissionId);
        localStorage.setItem('template_submissions', JSON.stringify(filteredSubmissions));
        setSubmissions(filteredSubmissions);
        
        // Hide details if the deleted submission was selected
        if (selectedSubmission && selectedSubmission.id === submissionId) {
          setSelectedSubmission(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete submission:', error);
      alert('Failed to delete submission. Please try again.');
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

  const updateSubmissionStatus = (submissionId: string, newStatus: TemplateSubmission['status']) => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus } : sub
    );
    setSubmissions(updatedSubmissions);
    localStorage.setItem('template_submissions', JSON.stringify(updatedSubmissions));
  };

  const getComplianceScore = (summary: TemplateSubmission['ai_validation_summary']) => {
    const total = summary.passed + summary.warnings + summary.failed;
    if (total === 0) return 0;
    return Math.round(((summary.passed + (summary.warnings * 0.5)) / total) * 100);
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading submissions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Template Submissions</h1>
              <p className="text-gray-600">
                View and manage all completed template submissions with AI validation results.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to Templates
            </Link>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600 mb-4">
                Complete a template to see your submissions here.
              </p>
              <Link
                href="/templates"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {submission.company_data.company_name}
                        </h3>
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {submission.control_code}
                        </span>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {submission.framework_name}
                        </span>
                      </div>
                      <h4 className="text-md font-medium text-gray-700 mb-1">
                        {submission.template_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {submission.control_title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {getComplianceScore(submission.ai_validation_summary)}%
                        </div>
                        <div className="text-xs text-gray-500">Compliance</div>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Contact Person</div>
                      <div className="font-medium text-gray-900">
                        {submission.company_data.contact_person || 'Not specified'}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Evidence Files</div>
                      <div className="font-medium text-gray-900">
                        {submission.evidence_uploads.length} files
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Submitted</div>
                      <div className="font-medium text-gray-900">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {submission.ai_validation_summary && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">AI Validation Results</div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-gray-700">
                            {submission.ai_validation_summary.passed} Passed
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                          <span className="text-sm text-gray-700">
                            {submission.ai_validation_summary.warnings} Warnings
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          <span className="text-sm text-gray-700">
                            {submission.ai_validation_summary.failed} Failed
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      {submission.status === 'submitted' && (
                        <>
                          <button
                            onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => downloadSubmissionAsWord(submission)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-purple-600 hover:bg-purple-700"
                        title="Download completed policy document"
                      >
                        📄 Download Word
                      </button>
                      <button
                        onClick={() => setSelectedSubmission(selectedSubmission?.id === submission.id ? null : submission)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        {selectedSubmission?.id === submission.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button
                        onClick={() => deleteSubmission(submission.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                        title="Delete this submission"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  {selectedSubmission?.id === submission.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Company Information</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(selectedSubmission.company_data).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                <span className="ml-2 text-gray-900">{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Evidence Files</h5>
                          <div className="space-y-2">
                            {selectedSubmission.evidence_uploads.map((evidence, index) => (
                              <div key={index} className="text-sm bg-gray-50 p-3 rounded">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-gray-900">{evidence.requirement_code}</div>
                                    <div className="text-gray-600">{evidence.filename}</div>
                                    {evidence.note && (
                                      <div className="text-gray-600 mt-1">Note: {evidence.note}</div>
                                    )}
                                  </div>
                                  {evidence.ai_validation_result && (
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      evidence.ai_validation_result.status === 'passed' ? 'bg-green-100 text-green-800' :
                                      evidence.ai_validation_result.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                      evidence.ai_validation_result.status === 'failed' ? 'bg-red-100 text-red-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {evidence.ai_validation_result.status?.toUpperCase()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}