
import React from 'react';
import { PLACEHOLDER_CONTENT } from '../../constants';

const PrivacyView: React.FC = () => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--accent-primary)] mb-6 text-center">
        {PLACEHOLDER_CONTENT.PRIVACY_TITLE}
      </h1>
      <p className="text-sm text-[var(--text-secondary)] text-center mb-10">
        {PLACEHOLDER_CONTENT.PRIVACY_LAST_UPDATED.replace('[Current Date]', getCurrentDate())}
      </p>

      <div className="bg-[var(--bg-card)] p-6 md:p-10 rounded-xl shadow-2xl border border-[var(--border-color)]/70 space-y-6 text-[var(--text-secondary)] leading-relaxed">
        <p className="text-lg text-[var(--text-primary)] font-semibold">
          Your privacy is important to us.
        </p>
        <p>
          AI Prompt Enhancer Pro ("us", "we", or "our") operates this web application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">1. Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        <h3 className="text-xl font-heading font-medium text-[var(--text-primary)] mt-2">Types of Data Collected:</h3>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>
            <strong>User Input Data:</strong> When you use the prompt enhancement features, the text you input ("User Input") is sent to the Google Gemini API for processing. We do not store this User Input on our servers. Its handling by Google is subject to Google's privacy policy and terms of service.
          </li>
          <li>
            <strong>Usage Data (Local Storage):</strong> We may store your preferred theme (dark/light mode) in your browser's local storage. This is solely for improving your user experience and is not transmitted to our servers.
          </li>
          <li>
            <strong>API Key:</strong> The application uses a Google Gemini API key that you configure as an environment variable (<code>API_KEY</code>) in the execution environment where this application is hosted or built. This key is used directly by the client-side application to communicate with the Google Gemini API. We do not have access to, nor do we store, your API key on our servers.
          </li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">2. Use of Data</h2>
        <p>
          AI Prompt Enhancer Pro uses the collected data for the following purposes:
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>To provide and maintain our Service (e.g., processing your input to generate enhanced prompts).</li>
          <li>To allow you to customize the Service's appearance (e.g., theme preference).</li>
          <li>To monitor the usage of the Service (through client-side interactions only).</li>
        </ul>
        
        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">3. Data Storage and Security</h2>
        <p>
          As a client-side application, AI Prompt Enhancer Pro does not store your personal data or User Input on any central servers controlled by us. Theme preferences are stored locally in your browser. The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>
         <p>
          Your Google Gemini API key is handled as described in the "Information Collection and Use" section. You are responsible for the security and confidentiality of your API key.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">4. Third-Party Services</h2>
        <p>
          The core functionality of this application relies on the Google Gemini API. Your use of this feature is subject to Google's Privacy Policy and Terms of Service. We encourage you to review them.
        </p>
        
        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">5. Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us: (Placeholder: contact@example.com)
        </p>
      </div>
    </div>
  );
};

export default PrivacyView;
