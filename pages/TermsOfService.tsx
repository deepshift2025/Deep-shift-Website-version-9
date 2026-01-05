
import React from 'react';
import { FileText, CheckCircle, AlertCircle, Scale, Terminal } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-navy py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-12 h-12 text-innovation-blue mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Governing the use of Deep Shift AI's intelligent systems and consulting services.</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-gray-600 leading-relaxed">
        <div className="prose prose-blue max-w-none">
          <p className="mb-8">
            By accessing or using the services provided by Deep Shift AI, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-8">
            Your access to and use of our services is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the service.
          </p>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">2. Use of AI Services</h2>
          <p className="mb-4">Deep Shift AI provides advanced automation and agentic systems. Users agree:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Not to use our services for any illegal or unauthorized purpose.</li>
            <li>Not to attempt to reverse engineer our proprietary algorithms or models.</li>
            <li>To provide accurate and complete information when requested for service implementation.</li>
            <li>That AI-generated outputs should be reviewed for accuracy before final business application.</li>
          </ul>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">3. Intellectual Property</h2>
          <p className="mb-8">
            The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Deep Shift AI. Custom-built models provided to clients are governed by specific individual service agreements.
          </p>

          <div className="bg-navy text-white p-8 rounded-3xl border border-white/10 my-10">
            <h3 className="font-bold mb-4 flex items-center">
              <Terminal className="mr-2 text-innovation-orange" /> Proprietary Technology
            </h3>
            <p className="text-sm opacity-80">
              Our "Linguistic Infrastructure" and context-aware NLP engines are protected under international intellectual property laws. Unauthorized duplication or redistribution of our model architectures is strictly prohibited.
            </p>
          </div>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">4. Limitation of Liability</h2>
          <p className="mb-8">
            In no event shall Deep Shift AI be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or use, resulting from your use of the service.
          </p>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">5. Governing Law</h2>
          <p className="mb-8">
            These Terms shall be governed and construed in accordance with the laws of the Republic of Uganda, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">6. Changes to Terms</h2>
          <p className="mb-8">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          <div className="flex items-center p-4 bg-yellow-50 rounded-2xl border border-yellow-100 text-yellow-800 text-sm">
            <AlertCircle className="mr-3 shrink-0" />
            <p>Failure to comply with these terms may result in immediate termination of access to our API and dashboard services.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
