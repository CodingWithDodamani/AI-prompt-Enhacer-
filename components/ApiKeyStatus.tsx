
import React from 'react';
import { API_KEY_INFO_MESSAGE } from '../constants';

interface ApiKeyStatusProps {
  isKeySet: boolean;
}

const ApiKeyStatus: React.FC<ApiKeyStatusProps> = ({ isKeySet }) => {
  if (isKeySet) {
    return null; // Render nothing if the API key is set
  }

  return (
    <div className="p-5 bg-[var(--error-bg)] border border-[var(--error-border)] rounded-xl text-[var(--error-text-body)] flex items-start shadow-lg transition-colors duration-300">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--error-icon)" className="w-7 h-7 mr-4 flex-shrink-0 transition-colors duration-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <div>
        <p className="font-heading font-semibold text-lg text-[var(--error-text-heading)] transition-colors duration-300">Action Required: API Key Not Found</p>
        <p className="mt-2 text-sm">
          The application's core AI features are currently disabled. A Google Gemini API key must be configured for the prompt enhancer to work.
        </p>
        <p className="mt-3 text-sm border-t border-[var(--error-border)] pt-3">
          <strong>How to fix this:</strong> The API key needs to be set as an `API_KEY` environment variable in the application's execution environment. For more detailed instructions, please see the FAQs on our <strong>Support</strong> page.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyStatus;
