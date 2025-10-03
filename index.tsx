
import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/Header';
import Footer from './components/Footer';
import ApiKeyStatus from './components/ApiKeyStatus';
import HomeView from './components/views/HomeView';
import EnhancerViewWrapper from './components/views/EnhancerViewWrapper';
import SupportView from './components/views/SupportView';
import TermsView from './components/views/TermsView';
import PrivacyView from './components/views/PrivacyView';

import { generateEnhancedPrompt, isApiKeyConfigured, suggestTaskType as geminiSuggestTaskType } from './services/geminiService';
import { AiTaskType, PromptDetail, PromptTone, Theme, ViewType, GoalTemplate, AiTaskTypeOrNone } from './types';
import { APP_NAME, AI_TASK_TYPES, PROMPT_DETAIL_LEVELS, PROMPT_TONES, GOAL_ORIENTED_TEMPLATES } from './constants';

const App: React.FC = () => {
  // Enhancer Tool State
  const [userInput, setUserInput] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<AiTaskType>(AI_TASK_TYPES[0].value);
  const [selectedDetail, setSelectedDetail] = useState<PromptDetail>(PROMPT_DETAIL_LEVELS[0].value);
  const [selectedTone, setSelectedTone] = useState<PromptTone | "NONE">(PROMPT_TONES[0].value);
  
  // New Feature States
  const [selectedGoalTemplate, setSelectedGoalTemplate] = useState<string>(GOAL_ORIENTED_TEMPLATES[0].value);
  const [selectedSecondaryTask, setSelectedSecondaryTask] = useState<AiTaskTypeOrNone>("NONE");
  const [specificDetailAspects, setSpecificDetailAspects] = useState<string>("");
  const [customToneKeywords, setCustomToneKeywords] = useState<string>("");
  const [toneWordsToInclude, setToneWordsToInclude] = useState<string>("");
  const [toneWordsToAvoid, setToneWordsToAvoid] = useState<string>("");
  
  const [isSuggestingTaskType, setIsSuggestingTaskType] = useState<boolean>(false);
  const [taskSuggestionError, setTaskSuggestionError] = useState<string | null>(null);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  // Global App State
  const [apiKeyIsSet, setApiKeyIsSet] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);

  useEffect(() => {
    setApiKeyIsSet(isApiKeyConfigured());
    const storedTheme = localStorage.getItem('app-theme') as Theme | null;
    const preferredTheme : Theme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setCurrentTheme(preferredTheme);
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${currentTheme}`);
    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleViewChange = (view: ViewType) => {
    if (view === ViewType.SETTINGS) {
        console.warn("Attempted to navigate to SETTINGS view, which is disabled.");
        return;
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleEnhancePrompt = useCallback(async () => {
    if (!userInput.trim() || !apiKeyIsSet) {
      if (!userInput.trim()) setError("Please enter a basic idea or question first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt(""); 

    try {
      const enhancedPrompt = await generateEnhancedPrompt(
        userInput, 
        selectedTask, 
        selectedDetail, 
        selectedTone,
        selectedSecondaryTask,
        specificDetailAspects,
        customToneKeywords,
        toneWordsToInclude,
        toneWordsToAvoid,
        selectedGoalTemplate !== "NONE" ? GOAL_ORIENTED_TEMPLATES.find(g => g.value === selectedGoalTemplate)?.label : undefined
      );
      setGeneratedPrompt(enhancedPrompt);
    } catch (e: any) {
      console.error("Error in handleEnhancePrompt:", e);
      setError(e.message || "An unexpected error occurred while generating the prompt.");
    } finally {
      setIsLoading(false);
    }
  }, [userInput, selectedTask, selectedDetail, selectedTone, selectedSecondaryTask, specificDetailAspects, customToneKeywords, toneWordsToInclude, toneWordsToAvoid, selectedGoalTemplate, apiKeyIsSet]);

  const handleTaskChange = (task: AiTaskType) => {
    setSelectedTask(task);
  };

  const handleGoalTemplateChange = (templateValue: string) => {
    setSelectedGoalTemplate(templateValue);
    const template = GOAL_ORIENTED_TEMPLATES.find(t => t.value === templateValue);
    if (template && template.template) {
        // If user input is empty or it's a non-default template, set it.
        // Otherwise, if it's the "NONE" template and user input is not empty, preserve user input.
        if (userInput.trim() === "" || templateValue !== "NONE") {
             setUserInput(template.template);
        }
    } else if (templateValue === "NONE" && userInput.trim() !== "" && GOAL_ORIENTED_TEMPLATES.some(t=> t.template === userInput)) {
        // If "NONE" is selected and current input is a template, clear it.
        // This check prevents clearing user's custom input if they select "NONE" after typing something.
        const isCurrentInputATemplate = GOAL_ORIENTED_TEMPLATES.find(gt => gt.template === userInput && gt.value !== "NONE");
        if(isCurrentInputATemplate) setUserInput("");
    }
  };
  
  const handleSuggestTaskType = useCallback(async () => {
    if (!userInput.trim() || !apiKeyIsSet) {
      setTaskSuggestionError("Please enter a core idea first to get a suggestion.");
      return;
    }
    setIsSuggestingTaskType(true);
    setTaskSuggestionError(null);
    try {
      const suggested = await geminiSuggestTaskType(userInput, AI_TASK_TYPES);
      if (suggested && suggested !== "NONE") {
        setSelectedTask(suggested);
      } else if (suggested === "NONE") {
        setTaskSuggestionError("Could not determine a specific task type. Please select manually.");
      }
    } catch (e: any) {
      console.error("Error suggesting task type:", e);
      setTaskSuggestionError(e.message || "Failed to suggest task type.");
    } finally {
      setIsSuggestingTaskType(false);
    }
  }, [userInput, apiKeyIsSet]);


  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (sectionId === 'examples-section' && !showExamples) {
        setShowExamples(true);
        setTimeout(() => section?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const renderView = () => {
    switch (currentView) {
      case ViewType.HOME:
        return <HomeView onNavigateToEnhancer={() => handleViewChange(ViewType.ENHANCER)} />;
      case ViewType.ENHANCER:
        return (
          <EnhancerViewWrapper
            userInput={userInput}
            onUserInputchange={setUserInput}
            selectedTask={selectedTask}
            onTaskChange={handleTaskChange}
            selectedDetail={selectedDetail}
            onDetailChange={setSelectedDetail}
            selectedTone={selectedTone}
            onToneChange={setSelectedTone}
            onSubmit={handleEnhancePrompt}
            isLoading={isLoading}
            isApiKeySet={apiKeyIsSet}
            showExamples={showExamples}
            onToggleExamples={() => setShowExamples(prev => !prev)}
            generatedPrompt={generatedPrompt}
            error={error}
            // New props for new features
            selectedGoalTemplate={selectedGoalTemplate}
            onGoalTemplateChange={handleGoalTemplateChange}
            selectedSecondaryTask={selectedSecondaryTask}
            onSecondaryTaskChange={setSelectedSecondaryTask}
            specificDetailAspects={specificDetailAspects}
            onSpecificDetailAspectsChange={setSpecificDetailAspects}
            customToneKeywords={customToneKeywords}
            onCustomToneKeywordsChange={setCustomToneKeywords}
            toneWordsToInclude={toneWordsToInclude}
            onToneWordsToIncludeChange={setToneWordsToInclude}
            toneWordsToAvoid={toneWordsToAvoid}
            onToneWordsToAvoidChange={setToneWordsToAvoid}
            onSuggestTaskType={handleSuggestTaskType}
            isSuggestingTaskType={isSuggestingTaskType}
            taskSuggestionError={taskSuggestionError}
          />
        );
      case ViewType.SUPPORT:
        return <SupportView />;
      case ViewType.TERMS:
        return <TermsView />;
      case ViewType.PRIVACY:
        return <PrivacyView />;
      default:
        if (currentView === ViewType.SETTINGS) {
             handleViewChange(ViewType.HOME);
             return null; 
        }
        return <HomeView onNavigateToEnhancer={() => handleViewChange(ViewType.ENHANCER)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] overflow-x-hidden font-body transition-colors duration-300">
      <Header 
        title={APP_NAME} 
        currentTheme={currentTheme}
        currentView={currentView}
        onToggleTheme={toggleTheme}
        onNavigateView={handleViewChange}
        onScrollToSection={handleScrollToSection} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-10 md:py-16">
        {currentView === ViewType.ENHANCER && <ApiKeyStatus isKeySet={apiKeyIsSet} />} 
        {renderView()}
      </main>
      
      <Footer appName={APP_NAME} onNavigateView={handleViewChange} />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element for React application.");
}
