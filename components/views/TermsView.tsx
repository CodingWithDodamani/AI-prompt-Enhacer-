
import React from 'react';
import { PLACEHOLDER_CONTENT } from '../../constants';

const TermsView: React.FC = () => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--accent-primary)] mb-6 text-center">
        {PLACEHOLDER_CONTENT.TERMS_TITLE}
      </h1>
      <p className="text-sm text-[var(--text-secondary)] text-center mb-10">
        {PLACEHOLDER_CONTENT.TERMS_LAST_UPDATED.replace('[Current Date]', getCurrentDate())}
      </p>

      <div className="bg-[var(--bg-card)] p-6 md:p-10 rounded-xl shadow-2xl border border-[var(--border-color)]/70 space-y-6 text-[var(--text-secondary)] leading-relaxed">
        <p className="text-lg text-[var(--text-primary)] font-semibold">
          Welcome to AI Prompt Enhancer Pro!
        </p>
        <p>
          These terms and conditions outline the rules and regulations for the use of AI Prompt Enhancer Pro's Application, located at this website.
        </p>
        <p>
          By accessing this application we assume you accept these terms and conditions. Do not continue to use AI Prompt Enhancer Pro if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">1. Acceptance of Terms</h2>
        <p>
          Your access to and use of the Application is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Application.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on AI Prompt Enhancer Pro's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on AI Prompt Enhancer Pro's website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by AI Prompt Enhancer Pro at any time.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">3. Disclaimer</h2>
        <p>
          The materials on AI Prompt Enhancer Pro's website are provided on an 'as is' basis. AI Prompt Enhancer Pro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        
        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">4. Limitations</h2>
        <p>
          In no event shall AI Prompt Enhancer Pro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI Prompt Enhancer Pro's website, even if AI Prompt Enhancer Pro or a AI Prompt Enhancer Pro authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">5. API Key Usage</h2>
         <p>
          This application requires a Google Gemini API key, provided by the user as an environment variable (<code>API_KEY</code>), to interact with the AI model. You are responsible for securing your API key and its usage. AI Prompt Enhancer Pro is not responsible for any charges or misuse associated with your API key.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] pt-4">6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction Placeholder, e.g., California, USA] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>

        <p className="pt-6 border-t border-[var(--border-color)]/50 text-sm">
          Please read these terms carefully. If you have any questions, please contact us.
        </p>
      </div>
    </div>
  );
};

export default TermsView;
