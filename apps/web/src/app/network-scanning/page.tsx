'use client';

import { Network, Crown, Radar, Shield, Brain, FileCheck, ArrowRight, Server, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function NetworkScanningPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
              <Network className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">Network Scanning</h1>
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  <Crown className="w-4 h-4" />
                  Premium
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                Network vulnerability and compliance scanning with AI-powered analysis
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4">
            <Radar className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're building an integrated network vulnerability and compliance scanning solution that connects directly to our AI compliance engine. Stay tuned for automated security assessments and real-time compliance mapping.
          </p>
        </div>

        {/* How It Will Work - Process Flow */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="p-2 bg-blue-100 rounded-lg">
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </span>
            How It Will Work
          </h3>

          <div className="relative">
            {/* Connection Lines (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-blue-200 to-green-200 -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl border-2 border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4 mx-auto">
                  <Server className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-amber-600 mb-1">STEP 1</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Network Discovery</h4>
                  <p className="text-sm text-gray-600">
                    Automatically discover and inventory all devices, services, and open ports on your network
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-blue-600 mb-1">STEP 2</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vulnerability Scan</h4>
                  <p className="text-sm text-gray-600">
                    Identify security vulnerabilities, misconfigurations, and outdated software across your infrastructure
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-purple-600 mb-1">STEP 3</div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI Compliance Engine</h4>
                  <p className="text-sm text-gray-600">
                    AI analyzes scan results and automatically maps findings to compliance framework requirements
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                  <FileCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-green-600 mb-1">STEP 4</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance Reports</h4>
                  <p className="text-sm text-gray-600">
                    Generate detailed compliance reports with remediation recommendations and evidence collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Integration Details */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">AI-Powered Compliance Mapping</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Automatic Control Mapping</h4>
              <p className="text-sm text-gray-600">
                Our AI compliance engine will automatically analyze network scan results and map them to relevant compliance controls:
              </p>
              <ul className="space-y-2">
                {[
                  { control: 'Patch OS', desc: 'Missing patches detected on endpoints' },
                  { control: 'Patch Apps', desc: 'Outdated application versions identified' },
                  { control: 'MFA', desc: 'Authentication configurations assessed' },
                  { control: 'Admin Privileges', desc: 'Privileged access points identified' },
                  { control: 'App Control', desc: 'Unauthorized services detected' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">{item.control}:</strong>{' '}
                      <span className="text-gray-600">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Supported Frameworks</h4>
              <p className="text-sm text-gray-600">
                Network scan findings will be mapped to all supported compliance frameworks:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Essential Eight', icon: Shield },
                  { name: 'ISO 27001', icon: Lock },
                  { name: 'NIST CSF', icon: Shield },
                  { name: 'CIS Controls', icon: Lock },
                ].map((framework, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-100">
                    <framework.icon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">{framework.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Planned Features */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Planned Features</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Radar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Scheduled Scans</h4>
                  <p className="text-sm text-gray-600">Set up automated recurring scans to continuously monitor your network security posture</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Server className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Asset Inventory</h4>
                  <p className="text-sm text-gray-600">Maintain a complete inventory of network assets with automatic discovery and classification</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Risk Scoring</h4>
                  <p className="text-sm text-gray-600">CVSS-based vulnerability scoring with business context and compliance impact analysis</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Evidence Collection</h4>
                  <p className="text-sm text-gray-600">Automatically generate and store compliance evidence from scan results</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI Remediation</h4>
                  <p className="text-sm text-gray-600">Get AI-powered remediation recommendations prioritized by compliance impact</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Compliance Dashboard</h4>
                  <p className="text-sm text-gray-600">Real-time visibility into network compliance status across all frameworks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interest CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Interested in early access? Contact us to be notified when Network Scanning becomes available.
          </p>
        </div>
      </div>
    </div>
  );
}
