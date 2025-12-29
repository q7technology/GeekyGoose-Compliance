export interface EssentialEightTemplate {
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

export const essentialEightTemplates: EssentialEightTemplate[] = [
  {
    id: 'ee-1',
    code: 'EE-1',
    title: 'Application Control',
    description: 'Application control implemented to prevent execution of unapproved/malicious applications including .exe, DLL, scripts, installers, compiled HTML, HTML applications and control panel applets.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'application_control_owner',
        field_type: 'text',
        required: true,
        placeholder: 'IT Security Manager',
        description: 'Role/person responsible for application control'
      },
      {
        field_name: 'application_control_solution',
        field_type: 'select',
        required: true,
        placeholder: 'Select application control solution',
        description: 'Primary application control technology used',
        options: ['Windows Defender Application Control', 'AppLocker', 'CrowdStrike', 'Carbon Black', 'SentinelOne', 'Other']
      },
      {
        field_name: 'implementation_date',
        field_type: 'text',
        required: true,
        placeholder: 'YYYY-MM-DD',
        description: 'Date when application control was implemented'
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-1-POL',
        evidence_type: 'policy',
        description: 'Application Control Policy document defining approved applications and control mechanisms',
        required: true,
        ai_validation_prompt: 'Verify this document contains: 1) Clear definition of approved applications, 2) Process for approving new applications, 3) Technical controls to prevent unauthorized execution, 4) Roles and responsibilities, 5) Review and update procedures'
      },
      {
        requirement_code: 'EE-1-CONFIG',
        evidence_type: 'configuration',
        description: 'Application control system configuration showing rules and policies',
        required: true,
        ai_validation_prompt: 'Verify this configuration shows: 1) Application control rules in place, 2) Whitelist of approved applications, 3) Block/deny rules for unauthorized applications, 4) Logging and monitoring enabled'
      },
      {
        requirement_code: 'EE-1-PROC',
        evidence_type: 'procedure',
        description: 'Procedures for managing and updating application control rules',
        required: true,
        ai_validation_prompt: 'Verify procedures include: 1) Steps for adding new approved applications, 2) Process for removing applications, 3) Regular review schedule, 4) Incident response for blocked applications'
      }
    ]
  },
  {
    id: 'ee-2',
    code: 'EE-2',
    title: 'Patch Applications',
    description: 'Patches, updates or vendor mitigations for security vulnerabilities in applications and drivers are applied within one month of release, or within 48 hours if an exploit exists.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'patch_management_owner',
        field_type: 'text',
        required: true,
        placeholder: 'IT Operations Manager',
        description: 'Role/person responsible for patch management'
      },
      {
        field_name: 'patch_management_tools',
        field_type: 'textarea',
        required: true,
        placeholder: 'List patch management tools used (e.g., WSUS, SCCM, Intune)',
        description: 'Tools and systems used for patch management'
      },
      {
        field_name: 'patch_schedule',
        field_type: 'select',
        required: true,
        placeholder: 'Select patching schedule',
        description: 'Regular schedule for applying patches',
        options: ['Weekly', 'Bi-weekly', 'Monthly', 'As needed']
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-2-POL',
        evidence_type: 'policy',
        description: 'Patch Management Policy defining timelines and responsibilities',
        required: true,
        ai_validation_prompt: 'Verify policy contains: 1) Patch timelines (within 1 month, 48 hours for exploits), 2) Roles and responsibilities, 3) Risk assessment process, 4) Testing procedures, 5) Emergency patching process'
      },
      {
        requirement_code: 'EE-2-PROC',
        evidence_type: 'procedure',
        description: 'Patch management procedures and workflows',
        required: true,
        ai_validation_prompt: 'Verify procedures include: 1) Vulnerability scanning process, 2) Patch testing methodology, 3) Deployment procedures, 4) Rollback procedures, 5) Documentation requirements'
      },
      {
        requirement_code: 'EE-2-REPORTS',
        evidence_type: 'report',
        description: 'Recent patch compliance reports showing timely application',
        required: true,
        ai_validation_prompt: 'Verify reports show: 1) Patch compliance percentages, 2) Time to patch metrics, 3) Outstanding vulnerabilities, 4) Critical patch deployment within 48 hours if applicable'
      }
    ]
  },
  {
    id: 'ee-3',
    code: 'EE-3',
    title: 'Configure Microsoft Office Macro Settings',
    description: 'Configure Microsoft Office macro settings to block macros from the internet, and only allow vetted macros either in \'trusted locations\' with limited write access or digitally signed with a trusted certificate.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'office_macro_administrator',
        field_type: 'text',
        required: true,
        placeholder: 'IT Administrator',
        description: 'Role/person responsible for Office macro configuration'
      },
      {
        field_name: 'office_versions',
        field_type: 'textarea',
        required: true,
        placeholder: 'List Microsoft Office versions in use (e.g., Office 365, Office 2019)',
        description: 'Microsoft Office versions deployed in your environment'
      },
      {
        field_name: 'macro_management_method',
        field_type: 'select',
        required: true,
        placeholder: 'Select macro management method',
        description: 'Primary method for managing Office macros',
        options: ['Group Policy', 'Intune/MDM', 'Registry Settings', 'Office Cloud Policy', 'Other']
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-3-POL',
        evidence_type: 'policy',
        description: 'Microsoft Office Macro Security Policy defining macro restrictions',
        required: true,
        ai_validation_prompt: 'Verify policy mandates: 1) Block macros from internet, 2) Trusted locations with limited write access, 3) Digital signing requirements, 4) User training on macro risks, 5) Exception process'
      },
      {
        requirement_code: 'EE-3-CONFIG',
        evidence_type: 'configuration',
        description: 'Group Policy or configuration settings blocking untrusted macros',
        required: true,
        ai_validation_prompt: 'Verify configuration shows: 1) Macro execution blocked from internet, 2) Trusted locations configured, 3) Digital signature verification enabled, 4) Settings applied to all Office applications'
      },
      {
        requirement_code: 'EE-3-PROC',
        evidence_type: 'procedure',
        description: 'Procedures for managing trusted locations and macro approvals',
        required: true,
        ai_validation_prompt: 'Verify procedures include: 1) Trusted location approval process, 2) Digital certificate management, 3) Macro review and approval workflow, 4) Regular review of trusted locations'
      }
    ]
  },
  {
    id: 'ee-4',
    code: 'EE-4',
    title: 'User Application Hardening',
    description: 'Configure web browsers to block or disable support for Flash content, ads and Java on the internet. Configure web browsers to block web content from suspicious or malicious websites.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'browser_administrator',
        field_type: 'text',
        required: true,
        placeholder: 'IT Security Administrator',
        description: 'Role/person responsible for browser security configuration'
      },
      {
        field_name: 'browsers_in_use',
        field_type: 'textarea',
        required: true,
        placeholder: 'List browsers used (e.g., Chrome, Edge, Firefox)',
        description: 'Web browsers deployed in your environment'
      },
      {
        field_name: 'content_filtering_solution',
        field_type: 'select',
        required: true,
        placeholder: 'Select web filtering solution',
        description: 'Solution used for web content filtering',
        options: ['Microsoft Defender SmartScreen', 'Cisco Umbrella', 'Zscaler', 'Symantec Web Security', 'Barracuda', 'Other']
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-4-POL',
        evidence_type: 'policy',
        description: 'User Application Hardening Policy defining browser security requirements',
        required: true,
        ai_validation_prompt: 'Verify policy requires: 1) Flash content blocked, 2) Java disabled on internet, 3) Ad blocking enabled, 4) Malicious website blocking, 5) Browser security configurations'
      },
      {
        requirement_code: 'EE-4-CONFIG',
        evidence_type: 'configuration',
        description: 'Browser configuration settings showing hardening measures',
        required: true,
        ai_validation_prompt: 'Verify configuration shows: 1) Flash disabled/blocked, 2) Java applets blocked, 3) Ad blocking active, 4) Malicious site protection enabled, 5) Automatic updates configured'
      },
      {
        requirement_code: 'EE-4-FILTER',
        evidence_type: 'configuration',
        description: 'Web filtering solution configuration blocking malicious content',
        required: true,
        ai_validation_prompt: 'Verify filtering shows: 1) Malicious domain blocking, 2) Content categories blocked, 3) Real-time threat protection, 4) URL reputation checking, 5) Reporting and logging'
      }
    ]
  },
  {
    id: 'ee-5',
    code: 'EE-5',
    title: 'Restrict Administrative Privileges',
    description: 'Restrict administrative privileges to operating systems and applications based on user duties. Regularly validate the use of administrative privileges.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'privilege_administrator',
        field_type: 'text',
        required: true,
        placeholder: 'Identity and Access Manager',
        description: 'Role/person responsible for administrative privilege management'
      },
      {
        field_name: 'privilege_management_tools',
        field_type: 'textarea',
        required: true,
        placeholder: 'List tools used for privilege management (e.g., Active Directory, PAM solution)',
        description: 'Tools and systems used for managing administrative privileges'
      },
      {
        field_name: 'review_frequency',
        field_type: 'select',
        required: true,
        placeholder: 'Select review frequency',
        description: 'How often administrative privileges are reviewed',
        options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually']
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-5-POL',
        evidence_type: 'policy',
        description: 'Administrative Privilege Management Policy defining access controls',
        required: true,
        ai_validation_prompt: 'Verify policy includes: 1) Least privilege principle, 2) Role-based access controls, 3) Approval process for admin privileges, 4) Regular review requirements, 5) Privilege escalation procedures'
      },
      {
        requirement_code: 'EE-5-PROC',
        evidence_type: 'procedure',
        description: 'Procedures for granting, reviewing, and revoking administrative privileges',
        required: true,
        ai_validation_prompt: 'Verify procedures cover: 1) Admin access request process, 2) Approval workflow, 3) Regular access reviews, 4) Privilege revocation process, 5) Emergency access procedures'
      },
      {
        requirement_code: 'EE-5-REPORTS',
        evidence_type: 'report',
        description: 'Recent administrative privilege review reports',
        required: true,
        ai_validation_prompt: 'Verify reports show: 1) Current admin privilege assignments, 2) Review completion dates, 3) Changes made during reviews, 4) Compliance with policy requirements'
      }
    ]
  },
  {
    id: 'ee-6',
    code: 'EE-6',
    title: 'Patch Operating Systems',
    description: 'Patches, updates or vendor mitigations for security vulnerabilities in operating systems and firmware are applied within one month of release, or within 48 hours if an exploit exists.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'os_patch_administrator',
        field_type: 'text',
        required: true,
        placeholder: 'Systems Administrator',
        description: 'Role/person responsible for OS patch management'
      },
      {
        field_name: 'operating_systems',
        field_type: 'textarea',
        required: true,
        placeholder: 'List OS versions (e.g., Windows 10/11, Windows Server 2019/2022, Linux)',
        description: 'Operating systems in your environment'
      },
      {
        field_name: 'patch_deployment_tools',
        field_type: 'textarea',
        required: true,
        placeholder: 'List patch management tools (e.g., WSUS, SCCM, Ansible, Puppet)',
        description: 'Tools used for OS patch deployment'
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-6-POL',
        evidence_type: 'policy',
        description: 'Operating System Patch Management Policy defining timelines',
        required: true,
        ai_validation_prompt: 'Verify policy mandates: 1) OS patches within 1 month, 2) Critical patches within 48 hours if exploit exists, 3) Testing requirements, 4) Emergency patching process, 5) Firmware update procedures'
      },
      {
        requirement_code: 'EE-6-PROC',
        evidence_type: 'procedure',
        description: 'OS patch management procedures and testing protocols',
        required: true,
        ai_validation_prompt: 'Verify procedures include: 1) Vulnerability assessment process, 2) Patch testing methodology, 3) Deployment scheduling, 4) Rollback procedures, 5) Documentation requirements'
      },
      {
        requirement_code: 'EE-6-REPORTS',
        evidence_type: 'report',
        description: 'OS patch compliance reports showing timely deployment',
        required: true,
        ai_validation_prompt: 'Verify reports demonstrate: 1) OS patch compliance levels, 2) Time-to-patch metrics, 3) Outstanding critical patches, 4) Emergency patch deployment records'
      }
    ]
  },
  {
    id: 'ee-7',
    code: 'EE-7',
    title: 'Multi-Factor Authentication',
    description: 'Multi-factor authentication used for all users when authenticating to their organization\'s systems.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'mfa_administrator',
        field_type: 'text',
        required: true,
        placeholder: 'Identity and Access Manager',
        description: 'Role/person responsible for MFA implementation'
      },
      {
        field_name: 'mfa_solutions',
        field_type: 'textarea',
        required: true,
        placeholder: 'List MFA solutions (e.g., Microsoft Authenticator, Google Authenticator, Hardware tokens)',
        description: 'MFA technologies and solutions implemented'
      },
      {
        field_name: 'mfa_coverage',
        field_type: 'select',
        required: true,
        placeholder: 'Select MFA coverage',
        description: 'Scope of MFA implementation',
        options: ['All users for all systems', 'All users for critical systems', 'Privileged users only', 'External access only']
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-7-POL',
        evidence_type: 'policy',
        description: 'Multi-Factor Authentication Policy requiring MFA for all users',
        required: true,
        ai_validation_prompt: 'Verify policy mandates: 1) MFA for ALL users, 2) Acceptable MFA methods, 3) Enrollment requirements, 4) Exemption process (if any), 5) Regular review of MFA status'
      },
      {
        requirement_code: 'EE-7-CONFIG',
        evidence_type: 'configuration',
        description: 'MFA system configuration showing enforcement for all users',
        required: true,
        ai_validation_prompt: 'Verify configuration shows: 1) MFA enabled for all user accounts, 2) No bypass rules for regular users, 3) Conditional access policies enforcing MFA, 4) Session timeout settings'
      },
      {
        requirement_code: 'EE-7-REPORTS',
        evidence_type: 'report',
        description: 'MFA compliance reports showing 100% user enrollment and usage',
        required: true,
        ai_validation_prompt: 'Verify reports demonstrate: 1) 100% MFA enrollment, 2) Active MFA usage logs, 3) No authentication bypasses, 4) Regular compliance monitoring'
      }
    ]
  },
  {
    id: 'ee-8',
    code: 'EE-8',
    title: 'Regular Backups',
    description: 'Regular backups of important data, software and configuration settings are performed and tested to ensure data can be restored.',
    company_fields: [
      {
        field_name: 'company_name',
        field_type: 'text',
        required: true,
        placeholder: 'Enter your organization name',
        description: 'Legal name of your organization'
      },
      {
        field_name: 'backup_administrator',
        field_type: 'text',
        required: true,
        placeholder: 'Backup Administrator',
        description: 'Role/person responsible for backup operations'
      },
      {
        field_name: 'backup_solutions',
        field_type: 'textarea',
        required: true,
        placeholder: 'List backup solutions (e.g., Veeam, Azure Backup, AWS Backup)',
        description: 'Backup technologies and solutions used'
      },
      {
        field_name: 'backup_frequency',
        field_type: 'select',
        required: true,
        placeholder: 'Select backup frequency',
        description: 'How often backups are performed',
        options: ['Daily', 'Weekly', 'Multiple times per day', 'Continuous/Real-time']
      },
      {
        field_name: 'backup_retention',
        field_type: 'select',
        required: true,
        placeholder: 'Select retention period',
        description: 'How long backups are retained',
        options: ['30 days', '90 days', '1 year', '3 years', '7 years', 'Other']
      }
    ],
    evidence_requirements: [
      {
        requirement_code: 'EE-8-POL',
        evidence_type: 'policy',
        description: 'Data Backup and Recovery Policy defining backup requirements',
        required: true,
        ai_validation_prompt: 'Verify policy includes: 1) Regular backup schedules, 2) Data types to be backed up, 3) Retention requirements, 4) Testing procedures, 5) Recovery time objectives'
      },
      {
        requirement_code: 'EE-8-CONFIG',
        evidence_type: 'configuration',
        description: 'Backup system configuration showing automated backup schedules',
        required: true,
        ai_validation_prompt: 'Verify configuration shows: 1) Automated backup jobs scheduled, 2) All critical data included, 3) Proper retention settings, 4) Monitoring and alerting configured'
      },
      {
        requirement_code: 'EE-8-REPORTS',
        evidence_type: 'report',
        description: 'Backup success reports and restore test results',
        required: true,
        ai_validation_prompt: 'Verify reports show: 1) Backup job success rates, 2) Recent restore test results, 3) Data integrity verification, 4) Recovery time actual vs objectives'
      },
      {
        requirement_code: 'EE-8-PROC',
        evidence_type: 'procedure',
        description: 'Backup and recovery procedures including restore testing',
        required: true,
        ai_validation_prompt: 'Verify procedures include: 1) Backup restoration steps, 2) Regular restore testing schedule, 3) Disaster recovery procedures, 4) Data integrity verification process'
      }
    ]
  }
];