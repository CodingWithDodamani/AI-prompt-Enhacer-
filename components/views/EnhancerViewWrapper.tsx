
import React from 'react';
import UserInputSection from '../UserInputSection';
import GeneratedPromptSection from '../GeneratedPromptSection';
import ExamplesPanel from '../ExamplesPanel';
import { AiTaskType, PromptDetail, PromptTone, AiTaskTypeOrNone } from '../../types';

interface EnhancerViewWrapperProps {
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
  generatedPrompt: string;
  error: string | null;

  // New props for innovative features
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

const EnhancerViewWrapper: React.FC<EnhancerViewWrapperProps> = (props) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
      <div id="input-section">
        <UserInputSection
          userInput={props.userInput}
          onUserInputchange={props.onUserInputchange}
          selectedTask={props.selectedTask}
          onTaskChange={props.onTaskChange}
          selectedDetail={props.selectedDetail}
          onDetailChange={props.onDetailChange}
          selectedTone={props.selectedTone}
          onToneChange={props.onToneChange}
          onSubmit={props.onSubmit}
          isLoading={props.isLoading}
          isApiKeySet={props.isApiKeySet}
          showExamples={props.showExamples}
          onToggleExamples={props.onToggleExamples}
          // Pass down new props
          selectedGoalTemplate={props.selectedGoalTemplate}
          onGoalTemplateChange={props.onGoalTemplateChange}
          selectedSecondaryTask={props.selectedSecondaryTask}
          onSecondaryTaskChange={props.onSecondaryTaskChange}
          specificDetailAspects={props.specificDetailAspects}
          onSpecificDetailAspectsChange={props.onSpecificDetailAspectsChange}
          customToneKeywords={props.customToneKeywords}
          onCustomToneKeywordsChange={props.onCustomToneKeywordsChange}
          toneWordsToInclude={props.toneWordsToInclude}
          onToneWordsToIncludeChange={props.onToneWordsToIncludeChange}
          toneWordsToAvoid={props.toneWordsToAvoid}
          onToneWordsToAvoidChange={props.onToneWordsToAvoidChange}
          onSuggestTaskType={props.onSuggestTaskType}
          isSuggestingTaskType={props.isSuggestingTaskType}
          taskSuggestionError={props.taskSuggestionError}
        />
      </div>
      
      <div 
        id="examples-section"
        className={`examples-panel-transition ${props.showExamples ? 'max-h-[1500px] opacity-100 mt-10 md:mt-12' : 'max-h-0 opacity-0 mt-0'}`}
        style={{ 
          paddingBottom: props.showExamples ? '1.5rem' : '0', 
          paddingTop: props.showExamples ? '0rem' : '0' 
        }} 
        aria-hidden={!props.showExamples}
      >
        {props.showExamples && <ExamplesPanel selectedTask={props.selectedTask} />}
      </div>

      {(props.generatedPrompt || props.isLoading || props.error) && (
        <div id="result-section">
          <GeneratedPromptSection
            promptText={props.generatedPrompt}
            isLoading={props.isLoading}
            error={props.error}
          />
        </div>
      )}
    </div>
  );
};

export default EnhancerViewWrapper;
