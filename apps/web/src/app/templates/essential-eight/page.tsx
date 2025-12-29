'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface EssentialEightTemplate {
  id: string;
  code: string;
  title: string;
  description: string;
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
}

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

// Essential Eight Templates Data
const essentialEightTemplates: EssentialEightTemplate[] = [
  {
    id: 'ee-1',
    code: 'EE-1',
    title: 'Application Control',
    description: 'Application control implemented to prevent execution of unapproved/malicious applications including .exe, DLL, scripts, installers, compiled HTML, HTML applications and control panel applets.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'application_control_owner', field_type: 'text', required: true, placeholder: 'IT Security Manager', description: 'Role/person responsible for application control' },
      { field_name: 'application_control_solution', field_type: 'select', required: true, placeholder: 'Select application control solution', description: 'Primary application control technology used', options: ['Windows Defender Application Control', 'AppLocker', 'CrowdStrike', 'Carbon Black', 'SentinelOne', 'Other'] }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-1-POL', evidence_type: 'policy', description: 'Application Control Policy document defining approved applications and control mechanisms', required: true, ai_validation_prompt: 'Verify this document contains: 1) Clear definition of approved applications, 2) Process for approving new applications, 3) Technical controls to prevent unauthorized execution, 4) Roles and responsibilities, 5) Review and update procedures' }
    ]
  },
  {
    id: 'ee-2',
    code: 'EE-2',
    title: 'Patch Applications',
    description: 'Patches, updates or vendor mitigations for security vulnerabilities in applications and drivers are applied within one month of release, or within 48 hours if an exploit exists.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'patch_management_owner', field_type: 'text', required: true, placeholder: 'IT Operations Manager', description: 'Role/person responsible for patch management' },
      { field_name: 'patch_management_tools', field_type: 'textarea', required: true, placeholder: 'List patch management tools used (e.g., WSUS, SCCM, Intune)', description: 'Tools and systems used for patch management' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-2-POL', evidence_type: 'policy', description: 'Patch Management Policy defining timelines and responsibilities', required: true, ai_validation_prompt: 'Verify policy contains: 1) Patch timelines (within 1 month, 48 hours for exploits), 2) Roles and responsibilities, 3) Risk assessment process, 4) Testing procedures, 5) Emergency patching process' }
    ]
  },
  {
    id: 'ee-3',
    code: 'EE-3',
    title: 'Configure Microsoft Office Macro Settings',
    description: 'Configure Microsoft Office macro settings to block macros from the internet, and only allow vetted macros either in \'trusted locations\' with limited write access or digitally signed with a trusted certificate.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'office_macro_administrator', field_type: 'text', required: true, placeholder: 'IT Administrator', description: 'Role/person responsible for Office macro configuration' },
      { field_name: 'office_versions', field_type: 'textarea', required: true, placeholder: 'List Microsoft Office versions in use (e.g., Office 365, Office 2019)', description: 'Microsoft Office versions deployed in your environment' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-3-POL', evidence_type: 'policy', description: 'Microsoft Office Macro Security Policy defining macro restrictions', required: true, ai_validation_prompt: 'Verify policy mandates: 1) Block macros from internet, 2) Trusted locations with limited write access, 3) Digital signing requirements, 4) User training on macro risks, 5) Exception process' }
    ]
  },
  {
    id: 'ee-4',
    code: 'EE-4',
    title: 'User Application Hardening',
    description: 'Configure web browsers to block or disable support for Flash content, ads and Java on the internet. Configure web browsers to block web content from suspicious or malicious websites.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'browser_administrator', field_type: 'text', required: true, placeholder: 'IT Security Administrator', description: 'Role/person responsible for browser security configuration' },
      { field_name: 'browsers_in_use', field_type: 'textarea', required: true, placeholder: 'List browsers used (e.g., Chrome, Edge, Firefox)', description: 'Web browsers deployed in your environment' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-4-POL', evidence_type: 'policy', description: 'User Application Hardening Policy defining browser security requirements', required: true, ai_validation_prompt: 'Verify policy requires: 1) Flash content blocked, 2) Java disabled on internet, 3) Ad blocking enabled, 4) Malicious website blocking, 5) Browser security configurations' }
    ]
  },
  {
    id: 'ee-5',
    code: 'EE-5',
    title: 'Restrict Administrative Privileges',
    description: 'Restrict administrative privileges to operating systems and applications based on user duties. Regularly validate the use of administrative privileges.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'privilege_administrator', field_type: 'text', required: true, placeholder: 'Identity and Access Manager', description: 'Role/person responsible for administrative privilege management' },
      { field_name: 'privilege_management_tools', field_type: 'textarea', required: true, placeholder: 'List tools used for privilege management (e.g., Active Directory, PAM solution)', description: 'Tools and systems used for managing administrative privileges' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-5-POL', evidence_type: 'policy', description: 'Administrative Privilege Management Policy defining access controls', required: true, ai_validation_prompt: 'Verify policy includes: 1) Least privilege principle, 2) Role-based access controls, 3) Approval process for admin privileges, 4) Regular review requirements, 5) Privilege escalation procedures' }
    ]
  },
  {
    id: 'ee-6',
    code: 'EE-6',
    title: 'Patch Operating Systems',
    description: 'Patches, updates or vendor mitigations for security vulnerabilities in operating systems and firmware are applied within one month of release, or within 48 hours if an exploit exists.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'os_patch_administrator', field_type: 'text', required: true, placeholder: 'Systems Administrator', description: 'Role/person responsible for OS patch management' },
      { field_name: 'operating_systems', field_type: 'textarea', required: true, placeholder: 'List OS versions (e.g., Windows 10/11, Windows Server 2019/2022, Linux)', description: 'Operating systems in your environment' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-6-POL', evidence_type: 'policy', description: 'Operating System Patch Management Policy defining timelines', required: true, ai_validation_prompt: 'Verify policy mandates: 1) OS patches within 1 month, 2) Critical patches within 48 hours if exploit exists, 3) Testing requirements, 4) Emergency patching process, 5) Firmware update procedures' }
    ]
  },
  {
    id: 'ee-7',
    code: 'EE-7',
    title: 'Multi-Factor Authentication',
    description: 'Multi-factor authentication used for all users when authenticating to their organization\'s systems.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'mfa_administrator', field_type: 'text', required: true, placeholder: 'Identity and Access Manager', description: 'Role/person responsible for MFA implementation' },
      { field_name: 'mfa_solutions', field_type: 'textarea', required: true, placeholder: 'List MFA solutions (e.g., Microsoft Authenticator, Google Authenticator, Hardware tokens)', description: 'MFA technologies and solutions implemented' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-7-POL', evidence_type: 'policy', description: 'Multi-Factor Authentication Policy requiring MFA for all users', required: true, ai_validation_prompt: 'Verify policy mandates: 1) MFA for ALL users, 2) Acceptable MFA methods, 3) Enrollment requirements, 4) Exemption process (if any), 5) Regular review of MFA status' }
    ]
  },
  {
    id: 'ee-8',
    code: 'EE-8',
    title: 'Regular Backups',
    description: 'Regular backups of important data, software and configuration settings are performed and tested to ensure data can be restored.',
    company_fields: [
      { field_name: 'company_name', field_type: 'text', required: true, placeholder: 'Enter your organization name', description: 'Legal name of your organization' },
      { field_name: 'backup_administrator', field_type: 'text', required: true, placeholder: 'Backup Administrator', description: 'Role/person responsible for backup operations' },
      { field_name: 'backup_solutions', field_type: 'textarea', required: true, placeholder: 'List backup solutions (e.g., Veeam, Azure Backup, AWS Backup)', description: 'Backup technologies and solutions used' }
    ],
    evidence_requirements: [
      { requirement_code: 'EE-8-POL', evidence_type: 'policy', description: 'Data Backup and Recovery Policy defining backup requirements', required: true, ai_validation_prompt: 'Verify policy includes: 1) Regular backup schedules, 2) Data types to be backed up, 3) Retention requirements, 4) Testing procedures, 5) Recovery time objectives' }
    ]
  }
];

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