
import React from 'react';
import { Shield, Lock, Eye, FileText, Globe } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-navy py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-innovation-orange mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Last Updated: October 2025. Your data privacy is our priority as we build the future of AI in East Africa.</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-gray-600 leading-relaxed">
        <div className="prose prose-blue max-w-none">
          <p className="mb-8">
            Deep Shift AI ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI services.
          </p>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, such as when you create an account, fill out a form, or communicate with us via our AI Assistant. This may include:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Personal Data:</strong> Name, email address, phone number, and company details.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            <li><strong>AI Training Data:</strong> If explicitly provided for custom LLM development, data is handled under strict non-disclosure agreements.</li>
          </ul>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">2. Use of Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Provide, operate, and maintain our services.</li>
            <li>Improve, personalize, and expand our AI models and user experience.</li>
            <li>Understand and analyze how you use our services.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Communicate with you for customer service or marketing purposes.</li>
          </ul>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">3. Data Protection (Uganda Data Protection Act)</h2>
          <p className="mb-4">
            In accordance with the Data Protection and Privacy Act of Uganda (2019), we implement robust technical and organizational measures to protect your personal data against unauthorized access, loss, or destruction.
          </p>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 my-10">
            <h3 className="font-bold text-navy mb-4 flex items-center">
              <Lock className="mr-2 text-innovation-blue" /> Secure AI Processing
            </h3>
            <p className="text-sm">
              Our custom LLMs are designed to process data within secure, siloed environments. We do not use proprietary client data to train our general-purpose models unless explicitly authorized.
            </p>
          </div>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">4. Sharing of Information</h2>
          <p className="mb-8">
            We do not sell or rent your personal data to third parties. We may share information with service providers who perform services for us, or to comply with legal obligations in the jurisdictions we operate.
          </p>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of any inaccurate data.</li>
            <li>Request deletion of your data where appropriate.</li>
            <li>Object to the processing of your data for direct marketing.</li>
          </ul>

          <h2 className="text-2xl font-poppins font-bold text-navy mt-12 mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:
          </p>
          <p className="font-bold text-navy">
            Email: info@deepshiftai.com<br />
            Address: National ICT Innovation Hub, Nakawa, Kampala, Uganda
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
