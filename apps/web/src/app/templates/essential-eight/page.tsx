'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { essentialEightTemplates, EssentialEightTemplate } from '../../../data/essential-eight-templates';

// EssentialEightTemplate interface is now imported from shared data file

interface EssentialEightControl {
  id: string;
  code: string;
  title: string;
  description: string;
  maturity_levels: Array<{
    level: number;
    requirements: Array<{
      id: string;
      text: string;
      evidence_types: string[];
    }>;
  }>;
  policy_template: {
    company_fields: Array<{
      field_name: string;
      field_type: 'text' | 'textarea' | 'select' | 'file';
      required: boolean;
      placeholder: string;
      description: string;
      options?: string[];
    }>;
    evidence_requirements: Array<{
      requirement_code: string;
      evidence_type: string;
      description: string;
      required: boolean;
      ai_validation_prompt: string;
    }>;
  };
}

// Essential Eight Templates Data is now imported from shared data file

export default function EssentialEightTemplatesPage() {
  const [controls, setControls] = useState<EssentialEightControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedControl, setSelectedControl] = useState<string | null>(null);

  useEffect(() => {
    fetchEssentialEightControls();
  }, []);

  const fetchEssentialEightControls = async () => {
    try {
      // Convert template data to control format for display
      const controlsFromTemplates: EssentialEightControl[] = essentialEightTemplates.map(template => ({
        id: template.id,
        code: template.code,
        title: template.title,
        description: template.description,
        maturity_levels: [
          {
            level: 1,
            requirements: template.evidence_requirements.map((req, index) => ({
              id: `${template.id}-${index + 1}`,
              text: req.description,
              evidence_types: [req.evidence_type]
            }))
          }
        ],
        policy_template: {
          company_fields: template.company_fields,
          evidence_requirements: template.evidence_requirements
        }
      }));
      
      setControls(controlsFromTemplates);
    } catch (error) {
      console.error('Failed to fetch Essential Eight controls:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTemplate = async (controlId: string) => {
    const control = controls.find(c => c.id === controlId);
    if (!control) return;

    try {
      // Create template from Essential Eight control
      const newTemplate = {
        id: `ee-template-${controlId}-${Date.now()}`,
        name: `${control.code} - ${control.title} Policy Template`,
        description: `Policy template for ${control.title}: ${control.description}`,
        control: {
          id: control.id,
          code: control.code,
          title: control.title,
          framework_name: 'Essential Eight'
        },
        company_fields: control.policy_template.company_fields,
        evidence_requirements: control.policy_template.evidence_requirements,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Store in localStorage so it appears in the main templates section
      const existingTemplates = localStorage.getItem('compliance_templates');
      const templates = existingTemplates ? JSON.parse(existingTemplates) : [];
      
      // Check if template already exists for this control
      const existingTemplate = templates.find((t: any) => t.control?.code === control.code);
      if (existingTemplate) {
        alert(`Template for ${control.code} already exists! Check the Templates section.`);
        return;
      }
      
      templates.push(newTemplate);
      localStorage.setItem('compliance_templates', JSON.stringify(templates));
      
      alert(`Template created for ${control.code}! You can now find it in the Templates section.`);
      
    } catch (error) {
      console.error('Failed to create template:', error);
      alert('Failed to create template. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading Essential Eight controls...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/templates" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Templates
          </Link>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Essential Eight Policy Templates
            </h1>
            <p className="text-gray-600 mb-4">
              Generate comprehensive policy templates for all Essential Eight controls with AI-powered evidence validation.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">AI-Powered Evidence Validation</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Each template includes AI validation prompts to automatically verify that uploaded evidence meets Essential Eight requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {controls.map((control) => (
            <div
              key={control.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {control.code}
                    </h3>
                    <h4 className="text-md font-medium text-blue-600 mt-1">
                      {control.title}
                    </h4>
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-2">
                      Essential Eight
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {control.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Company Fields:</span>
                      <span className="font-medium">{control.policy_template.company_fields.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Evidence Requirements:</span>
                      <span className="font-medium">{control.policy_template.evidence_requirements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Validation:</span>
                      <span className="font-medium text-green-600">✓ Enabled</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedControl(selectedControl === control.id ? null : control.id)}
                    className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {selectedControl === control.id ? 'Hide Details' : 'Preview Template'}
                  </button>
                  <button
                    onClick={() => generateTemplate(control.id)}
                    className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Generate Template
                  </button>
                </div>

                {/* Template Preview */}
                {selectedControl === control.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Company Fields</h5>
                        <div className="space-y-2">
                          {control.policy_template.company_fields.map((field, index) => (
                            <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                              <div className="font-medium">{field.field_name.replace('_', ' ')}</div>
                              <div className="text-gray-600">{field.description}</div>
                              {field.required && <div className="text-red-600">Required</div>}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Evidence Requirements</h5>
                        <div className="space-y-2">
                          {control.policy_template.evidence_requirements.map((req, index) => (
                            <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                              <div className="font-medium">{req.requirement_code}</div>
                              <div className="text-gray-600 mb-1">{req.description}</div>
                              <div className="text-blue-600">🤖 AI Validation Enabled</div>
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

        {controls.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Essential Eight controls available</h3>
              <p className="text-gray-600">
                Essential Eight controls data is not available at the moment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}