
import React from 'react';
import { AiTaskType } from '../types';
import { TASK_EXAMPLES, getAiTaskTypeFriendlyName } from '../constants';

interface ExamplesPanelProps {
  selectedTask: AiTaskType;
}

const ExamplesPanel: React.FC<ExamplesPanelProps> = ({ selectedTask }) => {
  const example = TASK_EXAMPLES[selectedTask];
  const taskName = getAiTaskTypeFriendlyName(selectedTask) || "Selected Task";

  return (
    <div className="p-6 md:p-8 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border-color)]/70 transition-colors duration-300">
      <h3 className="text-2xl font-heading font-semibold text-[var(--accent-secondary)] mb-6 flex items-center transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        Example for: <span className="ml-2 text-[var(--accent-primary)] transition-colors duration-300">{taskName}</span>
      </h3>
      
      {!example ? (
         <p className="text-[var(--text-secondary)] text-center py-4 transition-colors duration-300">No specific examples available for this task type yet, but the AI is ready for your unique idea!</p>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-heading font-medium text-[var(--text-primary)] mb-2 transition-colors duration-300">Basic User Idea:</h4>
            <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-input)]/60 p-4 rounded-lg whitespace-pre-wrap border border-[var(--border-color)]/50 shadow-inner transition-colors duration-300">{example.basic}</p>
          </div>
          <div>
            <h4 className="text-lg font-heading font-medium text-[var(--text-primary)] mb-2 transition-colors duration-300">Potential Enhanced Prompt Snippet:</h4>
            <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-input)]/60 p-4 rounded-lg whitespace-pre-wrap border border-[var(--border-color)]/50 shadow-inner transition-colors duration-300">{example.enhancedPlaceholder}</p>
            <p className="text-xs text-[var(--text-secondary)]/80 mt-3 italic transition-colors duration-300">
              Note: The actual AI-generated enhanced prompt will be dynamically tailored to your specific input and all chosen options (including Detail Level, Tone, and any custom aspects or keywords).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamplesPanel;
