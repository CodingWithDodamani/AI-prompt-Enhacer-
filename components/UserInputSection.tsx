
import React from 'react';
import { AiTaskType, PromptDetail, PromptTone, AiTaskTypeOrNone } from '../types';
import { AI_TASK_TYPES, AI_TASK_TYPES_WITH_NONE, PROMPT_DETAIL_LEVELS, PROMPT_TONES, GOAL_ORIENTED_TEMPLATES } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => (
  <div className="relative group flex items-center ml-1.5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200 cursor-help">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
    <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs sm:max-w-sm md:max-w-md
                     bg-[var(--bg-card)] text-[var(--text-primary)] text-xs rounded-md py-2 px-3 opacity-0 invisible 
                     group-hover:opacity-100 group-hover:visible z-20 shadow-xl whitespace-normal ring-1 ring-[var(--border-color)]
                     transition-all duration-300"
    >
      {text}
    </span>
  </div>
);


interface UserInputSectionProps {
  userInput: string;
  onUserInputchange: (value: string) => void;
  selectedTask: AiTaskType;
  onTaskChange: (task: AiTaskType) => void;
  selectedDetail: PromptDetail;
  onDetailChange: (detail: PromptDetail) => void;
  selectedTone: PromptTone | "NONE";
  onToneChange: (tone: PromptTone | "NONE") => void;
  onSubmit: () => void;
  isLoading: boolean;
  isApiKeySet: boolean;
  showExamples: boolean;
  onToggleExamples: () => void;

  // New props
  selectedGoalTemplate: string;
  onGoalTemplateChange: (templateValue: string) => void;
  selectedSecondaryTask: AiTaskTypeOrNone;
  onSecondaryTaskChange: (task: AiTaskTypeOrNone) => void;
  specificDetailAspects: string;
  onSpecificDetailAspectsChange: (value: string) => void;
  customToneKeywords: string;
  onCustomToneKeywordsChange: (value: string) => void;
  toneWordsToInclude: string;
  onToneWordsToIncludeChange: (value: string) => void;
  toneWordsToAvoid: string;
  onToneWordsToAvoidChange: (value: string) => void;
  onSuggestTaskType: () => void;
  isSuggestingTaskType: boolean;
  taskSuggestionError: string | null;
}

const UserInputSection: React.FC<UserInputSectionProps> = ({
  userInput, onUserInputchange,
  selectedTask, onTaskChange,
  selectedDetail, onDetailChange,
  selectedTone, onToneChange,
  onSubmit, isLoading, isApiKeySet,
  showExamples, onToggleExamples,
  selectedGoalTemplate, onGoalTemplateChange,
  selectedSecondaryTask, onSecondaryTaskChange,
  specificDetailAspects, onSpecificDetailAspectsChange,
  customToneKeywords, onCustomToneKeywordsChange,
  toneWordsToInclude, onToneWordsToIncludeChange,
  toneWordsToAvoid, onToneWordsToAvoidChange,
  onSuggestTaskType, isSuggestingTaskType, taskSuggestionError,
}) => {
  const commonInputBaseClasses = "w-full p-3.5 bg-[var(--bg-input)] border border-[var(--border-color-input)] rounded-lg shadow-sm text-[var(--text-primary)] transition-all duration-200 ease-in-out";
  const commonInputFocusClasses = "focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] focus:bg-[var(--bg-input)]";
  const commonInputDisabledClasses = "disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:opacity-60";
  const commonSelectClasses = `${commonInputBaseClasses} ${commonInputFocusClasses} ${commonInputDisabledClasses} placeholder-[var(--text-placeholder)]`;
  const commonLabelClasses = "block text-sm font-medium text-[var(--text-primary)] mb-2 font-heading transition-colors duration-300";
  const commonTextInputClasses = `${commonSelectClasses} placeholder-[var(--text-placeholder)]`;

  return (
    <div className="bg-[var(--bg-card)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--border-color)]/70 transition-colors duration-300">
      <h2 className="text-3xl font-heading font-semibold text-[var(--accent-primary)] mb-8 flex items-center transition-colors duration-300">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        Craft Your Masterpiece
      </h2>
      
      <div className="space-y-6">
        <div>
            <div className="flex items-center mb-2">
              <label htmlFor="goal-template" className={commonLabelClasses}>Goal Template (Optional):</label>
              <InfoTooltip text="Kickstart your prompt with a pre-defined structure for common goals. Selecting a template will populate the 'Core Idea' field below." />
            </div>
            <select
              id="goal-template"
              className={commonSelectClasses}
              value={selectedGoalTemplate}
              onChange={(e) => onGoalTemplateChange(e.target.value)}
              disabled={!isApiKeySet || isLoading}
            >
              {GOAL_ORIENTED_TEMPLATES.map(template => (
                <option key={template.value} value={template.value} style={{ backgroundColor: 'var(--bg-select-option)', color: 'var(--text-primary)' }}>{template.label}</option>
              ))}
            </select>
        </div>

        <div>
          <label htmlFor="user-input" className={commonLabelClasses}>
            Your Core Idea or Question:
          </label>
          <textarea
            id="user-input"
            rows={5}
            className={`${commonTextInputClasses} min-h-[120px] resize-y`}
            placeholder="e.g., 'An email for project updates', 'python script for data analysis', 'fantasy landscape with dragons'"
            value={userInput}
            onChange={(e) => onUserInputchange(e.target.value)}
            disabled={!isApiKeySet || isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <label htmlFor="task-type" className={`${commonLabelClasses} font-bold`}>Primary AI Task Type:</label>
                    <InfoTooltip text="Select the main type of task you want the AI to perform (e.g., writing an email, generating code)." />
                </div>
                <button
                  onClick={onSuggestTaskType}
                  disabled={!isApiKeySet || isLoading || isSuggestingTaskType || !userInput.trim()}
                  className="text-xs px-3 py-1.5 rounded-md bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-darker)] text-white disabled:bg-[var(--accent-primary)]/50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-150 ease-in-out font-semibold shadow hover:shadow-md"
                  title="Suggest task based on core idea"
                >
                  {isSuggestingTaskType ? <LoadingSpinner size="sm" color="white"/> : "Suggest"}
                </button>
            </div>
            <select
              id="task-type"
              className={commonSelectClasses}
              value={selectedTask}
              onChange={(e) => onTaskChange(e.target.value as AiTaskType)}
              disabled={!isApiKeySet || isLoading}
            >
              {AI_TASK_TYPES.map(task => (
                <option key={task.value} value={task.value} style={{ backgroundColor: 'var(--bg-select-option)', color: 'var(--text-primary)' }}>{task.label}</option>
              ))}
            </select>
            {taskSuggestionError && <p className="text-xs text-red-500 mt-1">{taskSuggestionError}</p>}
          </div>
          
          <div>
            <div className="flex items-center mb-2">
                <label htmlFor="secondary-task-type" className={commonLabelClasses}>Secondary Task Type (Optional):</label>
                <InfoTooltip text="Optionally, specify a related secondary objective for the AI (e.g., primary: story writing, secondary: image description for a scene)." />
            </div>
            <select
              id="secondary-task-type"
              className={commonSelectClasses}
              value={selectedSecondaryTask}
              onChange={(e) => onSecondaryTaskChange(e.target.value as AiTaskTypeOrNone)}
              disabled={!isApiKeySet || isLoading}
            >
              {AI_TASK_TYPES_WITH_NONE.map(task => (
                <option key={task.value} value={task.value} style={{ backgroundColor: 'var(--bg-select-option)', color: 'var(--text-primary)' }}>{task.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
            <div className="flex items-center mb-2">
              <label htmlFor="detail-level" className="block text-sm font-medium text-[var(--text-primary)] font-heading transition-colors duration-300">Detail Level:</label>
              <InfoTooltip text="Controls enhanced prompt detail. Concise: Brief, e.g., 'Python func for sum.' Detailed: Adds specifics, e.g., 'Python func sum(a,b) w/ type hints, docs, error check.' Step-by-step: Further breakdown." />
            </div>
            <select
              id="detail-level"
              className={commonSelectClasses}
              value={selectedDetail}
              onChange={(e) => onDetailChange(e.target.value as PromptDetail)}
              disabled={!isApiKeySet || isLoading}
            >
              {PROMPT_DETAIL_LEVELS.map(level => (
                 <option key={level.value} value={level.value} style={{ backgroundColor: 'var(--bg-select-option)', color: 'var(--text-primary)' }}>{level.label}</option>
              ))}
            </select>
        </div>
         <div>
            <div className="flex items-center mb-2">
                <label htmlFor="specific-detail-aspects" className={commonLabelClasses}>Specific Aspects for More Detail (Optional):</label>
                <InfoTooltip text="Comma-separated keywords or phrases for aspects you want the enhanced prompt to emphasize for detail (e.g., error handling, character backstory, security considerations)." />
            </div>
            <input
                type="text"
                id="specific-detail-aspects"
                className={commonTextInputClasses}
                placeholder="e.g., error handling, plot twists, historical accuracy"
                value={specificDetailAspects}
                onChange={(e) => onSpecificDetailAspectsChange(e.target.value)}
                disabled={!isApiKeySet || isLoading}
            />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <div className="flex items-center mb-2">
                <label htmlFor="tone" className={commonLabelClasses}>Desired Tone (Dropdown):</label>
                <InfoTooltip text="Suggests the tone for the AI's final output (e.g., the email or story). This is overridden if you use 'Custom Tone Keywords'." />
            </div>
            <select
              id="tone"
              className={commonSelectClasses}
              value={selectedTone}
              onChange={(e) => onToneChange(e.target.value as PromptTone | "NONE")}
              disabled={!isApiKeySet || isLoading || !!customToneKeywords.trim()}
            >
              {PROMPT_TONES.map(tone => (
                <option key={tone.value} value={tone.value} style={{ backgroundColor: 'var(--bg-select-option)', color: 'var(--text-primary)' }}>{tone.label}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center mb-2">
                <label htmlFor="custom-tone-keywords" className={commonLabelClasses}>Custom Tone Keywords (Optional):</label>
                <InfoTooltip text="Describe the desired tone with keywords (e.g., witty, academic, urgent). Overrides the dropdown if filled." />
            </div>
            <input
                type="text"
                id="custom-tone-keywords"
                className={commonTextInputClasses}
                placeholder="e.g., witty, academic, empathetic"
                value={customToneKeywords}
                onChange={(e) => onCustomToneKeywordsChange(e.target.value)}
                disabled={!isApiKeySet || isLoading}
            />
          </div>
        </div>
        <div>
            <div className="flex items-center mb-2">
                <label htmlFor="tone-words-include" className={commonLabelClasses}>Tone - Words/Phrases to Include (Optional):</label>
                <InfoTooltip text="Suggest specific words or phrases the AI should try to use in its final output to achieve the desired tone." />
            </div>
            <input
                type="text"
                id="tone-words-include"
                className={commonTextInputClasses}
                placeholder="e.g., awesome, let's explore, cutting-edge"
                value={toneWordsToInclude}
                onChange={(e) => onToneWordsToIncludeChange(e.target.value)}
                disabled={!isApiKeySet || isLoading}
            />
        </div>
         <div>
            <div className="flex items-center mb-2">
                <label htmlFor="tone-words-avoid" className={commonLabelClasses}>Tone - Words/Phrases to Avoid (Optional):</label>
                <InfoTooltip text="Suggest specific words or phrases the AI should avoid in its final output to maintain the desired tone." />
            </div>
            <input
                type="text"
                id="tone-words-avoid"
                className={commonTextInputClasses}
                placeholder="e.g., sir/madam, strictly prohibited, very complex"
                value={toneWordsToAvoid}
                onChange={(e) => onToneWordsToAvoidChange(e.target.value)}
                disabled={!isApiKeySet || isLoading}
            />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border-color)]/50 mt-8">
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isApiKeySet || isLoading || !userInput.trim()}
            className={`btn-animated-rainbow w-full sm:w-auto flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] focus:ring-[var(--accent-primary)] 
                       transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out font-heading`}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" color="#000000"/>
                <span className="ml-2.5">Enhancing...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 12L18 14.25l-.25-2.25a3.375 3.375 0 00-2.455-2.455L13.5 9l1.795-1.795a3.375 3.375 0 002.455-2.455L18 2.25l.25 2.25a3.375 3.375 0 002.455 2.455L22.5 9l-1.795 1.795a3.375 3.375 0 00-2.455 2.455zM12.75 9a.75.75 0 000-1.5.75.75 0 000 1.5zM9.75 15.75a.75.75 0 000-1.5.75.75 0 000 1.5z" />
                </svg>
                Enhance My Prompt
              </>
            )}
          </button>
           <button
            type="button"
            onClick={onToggleExamples}
            className={`btn-animated-rainbow w-full sm:w-auto px-6 py-3.5 text-base font-medium rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] focus:ring-[var(--accent-primary)] 
                       transition-all duration-200 ease-in-out font-heading flex items-center justify-center group`}
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 mr-2.5 transition-transform duration-300 ${showExamples ? 'transform rotate-45' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {showExamples ? "Hide Examples" : "Show Examples"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInputSection;
