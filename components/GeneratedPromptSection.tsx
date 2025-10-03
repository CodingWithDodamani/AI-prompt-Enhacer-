import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface GeneratedPromptSectionProps {
  promptText: string;
  isLoading: boolean;
  error: string | null;
}

const GeneratedPromptSection: React.FC<GeneratedPromptSectionProps> = ({ promptText, isLoading, error }) => {
  const [copied, setCopied] = useState(false);
  const [showCopiedAnim, setShowCopiedAnim] = useState(false);

  const handleCopy = () => {
    if (promptText) {
      navigator.clipboard.writeText(promptText)
        .then(() => {
          setCopied(true);
          setShowCopiedAnim(true);
          setTimeout(() => setShowCopiedAnim(false), 300); 
          setTimeout(() => setCopied(false), 2000); 
        })
        .catch(err => console.error('Failed to copy prompt: ', err));
    }
  };

  useEffect(() => {
    if (!isLoading && promptText) { 
        setCopied(false);
    }
  }, [promptText, isLoading]);

  const copyButtonBaseClasses = "absolute top-3.5 right-3.5 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] transform active:scale-95 transition-all duration-150 ease-in-out flex items-center shadow-md font-heading";
  const copyButtonNormalClasses = "bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-darker)] text-white focus:ring-[var(--accent-primary)]";
  // Using Tailwind's green for copied state as it's universally understood
  const copyButtonCopiedClasses = "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400";

  const renderErrorContent = () => {
    const errorMessage = error ? error.toLowerCase() : "";
    const isApiKeyError = errorMessage.includes('api key');
    const isContentPolicyError = errorMessage.includes('content policy');
    const isRateLimitError = errorMessage.includes('rate limit');

    let title = "Error Generating Prompt";
    let troubleshootingContent: React.ReactNode;

    if (isApiKeyError) {
      title = "API Key Error";
      troubleshootingContent = (
        <p className="mt-1">
          Please ensure your `API_KEY` is correct, active, and has the necessary permissions. Visit the <strong>Support</strong> page for more information on API key configuration.
        </p>
      );
    } else if (isContentPolicyError) {
      title = "Content Policy Violation";
      troubleshootingContent = (
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Your input may contain sensitive words or ideas that conflict with the AI's safety guidelines.</li>
          <li>Try rephrasing your core idea to be more neutral or specific.</li>
          <li>Avoid topics that are explicitly disallowed by the AI service provider.</li>
        </ul>
      );
    } else if (isRateLimitError) {
      title = "Too Many Requests";
      troubleshootingContent = (
         <p className="mt-1">
          You've exceeded the request limit for your API key. Please wait for a few moments before trying again.
        </p>
      );
    } else {
      // Generic error
      troubleshootingContent = (
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Check your internet connection.</li>
          <li>The AI service might be temporarily unavailable. Try again in a few moments.</li>
          <li>If the problem persists, visit our <strong>Support</strong> page for more detailed FAQs.</li>
        </ul>
      );
    }

    return (
      <div className="p-5 bg-[var(--error-bg)] border border-[var(--error-border)] rounded-xl text-[var(--error-text-body)] flex items-start shadow-lg transition-colors duration-300" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--error-icon)" className="w-7 h-7 mr-4 flex-shrink-0 transition-colors duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div>
          <p className="font-heading font-semibold text-lg text-[var(--error-text-heading)] transition-colors duration-300">
            {title}
          </p>
          <p className="mt-1 text-sm">{error}</p>
          <div className="mt-3 text-sm border-t border-[var(--error-border)] pt-3">
            <h4 className="font-semibold text-[var(--error-text-heading)]">Troubleshooting Steps:</h4>
            {troubleshootingContent}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="mt-10 md:mt-12 p-6 md:p-8 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border-color)]/70 transition-colors duration-300">
      <h2 className="text-3xl font-heading font-semibold text-[var(--accent-primary)] mb-8 flex items-center transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 12L18 14.25l-.25-2.25a3.375 3.375 0 00-2.455-2.455L13.5 9l1.795-1.795a3.375 3.375 0 002.455-2.455L18 2.25l.25 2.25a3.375 3.375 0 002.455 2.455L22.5 9l-1.795 1.795a3.375 3.375 0 00-2.455 2.455z" />
        </svg>
        Your Enhanced Prompt
      </h2>
      
      {isLoading && (
        <LoadingSpinner message="AI is crafting your prompt..." size="md" />
      )}

      {error && !isLoading && renderErrorContent()}

      {!isLoading && !error && promptText && (
        <div className="space-y-4">
          <div className="relative group">
            <textarea
              readOnly
              value={promptText}
              className="w-full p-4 pr-28 bg-[var(--bg-input)] border border-[var(--border-color-input)] rounded-lg shadow-inner text-[var(--text-primary)] min-h-[200px] resize-y focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] whitespace-pre-wrap transition-colors duration-300"
              aria-label="Generated enhanced prompt"
              rows={10} 
            />
            <button
              onClick={handleCopy}
              className={`${copyButtonBaseClasses} ${copied ? copyButtonCopiedClasses : copyButtonNormalClasses} ${showCopiedAnim && copied ? 'scale-110' : 'group-hover:scale-105'}`}
              aria-label={copied ? "Prompt copied to clipboard" : "Copy prompt to clipboard"}
              aria-live="polite"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
           <p className="text-sm text-[var(--text-secondary)] italic text-center pt-2 transition-colors duration-300">
            This enhanced prompt is ready for your favorite AI model! Experiment and create.
          </p>
        </div>
      )}

      {!isLoading && !error && !promptText && (
        <div className="text-center py-12 px-6 border-2 border-dashed border-[var(--border-color)] rounded-xl bg-[var(--bg-card)]/30 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--accent-primary)" className="w-20 h-20 mx-auto opacity-50 mb-6 transition-colors duration-300"> {/* Adjusted strokeWidth */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.183m0 0h-4.992M12 2.25A9.75 9.75 0 002.25 12a9.75 9.75 0 0019.5 0A9.75 9.75 0 0012 2.25z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25h1.598a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25H12m-3.75 0H6.652a2.25 2.25 0 01-2.25-2.25v-1.5a2.25 2.25 0 012.25-2.25H8.25m0 6.75h3.75m0-6.75H8.25" />
            </svg>
          <p className="text-xl font-heading font-semibold text-[var(--text-primary)] transition-colors duration-300">Your Enhanced Prompt Awaits!</p>
          <p className="text-md text-[var(--text-secondary)] mt-3 max-w-md mx-auto transition-colors duration-300">Enter your idea in the section above, select your preferred options, and let our AI craft a powerful, detailed prompt for you.</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedPromptSection;