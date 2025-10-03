
import React, { useState } from 'react';
import { PLACEHOLDER_CONTENT } from '../../constants';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border-color)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 px-1 text-left text-[var(--text-primary)] hover:text-[var(--accent-primary)] focus:outline-none focus-visible:ring focus-visible:ring-[var(--accent-primary)] focus-visible:ring-opacity-75"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-heading font-medium">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5 px-1 pt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};


const SupportView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--accent-primary)] mb-8 text-center">
        {PLACEHOLDER_CONTENT.SUPPORT_TITLE}
      </h1>
      <p className="text-lg text-[var(--text-secondary)] mb-12 text-center leading-relaxed">
        {PLACEHOLDER_CONTENT.SUPPORT_INTRO}
      </p>

      <div className="bg-[var(--bg-card)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--border-color)]/70 mb-12">
        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
        <div className="space-y-1">
          {PLACEHOLDER_CONTENT.FAQ_ITEMS.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>

      <div className="bg-[var(--bg-card)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--border-color)]/70 text-center">
        <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-4">Still Need Help?</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {PLACEHOLDER_CONTENT.CONTACT_SUPPORT.split('support@example.com')[0]}
          <a 
            href="mailto:support@example.com" 
            className="text-[var(--accent-secondary)] hover:underline font-medium"
          >
            support@example.com
          </a>
          {PLACEHOLDER_CONTENT.CONTACT_SUPPORT.split('support@example.com')[1]}
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--accent-primary)" className="w-16 h-16 mx-auto opacity-70">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>
    </div>
  );
};

export default SupportView;
