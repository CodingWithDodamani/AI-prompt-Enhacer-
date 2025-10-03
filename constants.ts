
import { AiTaskType, PromptDetail, PromptTone, TaskExample, ViewType, GoalTemplate, AiTaskTypeOrNone } from './types';

export const APP_NAME = "AI Prompt Enhancer Pro";
export const API_KEY_INFO_MESSAGE = "Ensure your API_KEY environment variable is set to use the AI features. The application will not function correctly without it.";
export const MISSING_API_KEY_ERROR = "API Key is not configured. Please set the API_KEY environment variable in your execution environment. This application cannot function without it.";

export const AI_TASK_TYPES: Array<{ value: AiTaskType; label: string }> = [
  { value: AiTaskType.EMAIL_COMPOSITION, label: "Compose an Email" },
  { value: AiTaskType.CODE_GENERATION, label: "Generate Code" },
  { value: AiTaskType.IMAGE_CREATION, label: "Create an Image Description" },
  { value: AiTaskType.STORY_WRITING, label: "Write a Story" },
  { value: AiTaskType.CONTENT_SUMMARIZATION, label: "Summarize Content" },
  { value: AiTaskType.TRANSLATION, label: "Translate Text" },
  { value: AiTaskType.BRAINSTORMING_IDEAS, label: "Brainstorm Ideas" },
  { value: AiTaskType.QUESTION_ANSWERING, label: "Answer a Question" },
];

export const AI_TASK_TYPES_WITH_NONE: Array<{ value: AiTaskTypeOrNone; label: string }> = [
  { value: "NONE", label: "None (No Secondary Task)" },
  ...AI_TASK_TYPES,
];

export const PROMPT_DETAIL_LEVELS: Array<{ value: PromptDetail; label: string }> = [
  { value: PromptDetail.CONCISE, label: "Concise" },
  { value: PromptDetail.DETAILED, label: "Detailed" },
  { value: PromptDetail.STEP_BY_STEP, label: "Step-by-step" },
];

export const PROMPT_TONES: Array<{ value: PromptTone | "NONE"; label: string }> = [
  { value: "NONE", label: "Default / Not Specified" },
  { value: PromptTone.FORMAL, label: "Formal" },
  { value: PromptTone.CASUAL, label: "Casual" },
  { value: PromptTone.PROFESSIONAL, label: "Professional" },
  { value: PromptTone.FRIENDLY, label: "Friendly" },
  { value: PromptTone.HUMOROUS, label: "Humorous" },
  { value: PromptTone.PERSUASIVE, label: "Persuasive" },
];

export const GOAL_ORIENTED_TEMPLATES: Array<GoalTemplate> = [
    { value: "NONE", label: "None (Start from scratch)", template: "" },
    { value: "solve_problem", label: "Solve a Problem", template: "I want to find a solution for [problem description] that affects [target audience/system], considering constraints like [key constraints] and aiming for an outcome of [desired outcome]." },
    { value: "create_something", label: "Create Something New", template: "I need to create a [type of creation, e.g., marketing plan, short video script, product concept] for [topic/purpose] targeting [audience]. Key elements to include are [element 1], [element 2], and it should evoke a feeling of [desired feeling/style]." },
    { value: "explain_concept", label: "Explain a Concept", template: "Explain the concept of [concept name] to a [target audience, e.g., beginner, expert in another field]. The explanation should cover [key aspect 1], [key aspect 2], and use an analogy of [optional analogy]." },
    { value: "compare_contrast", label: "Compare & Contrast", template: "Compare and contrast [item 1] and [item 2] based on criteria such as [criterion 1], [criterion 2], and [criterion 3]. Highlight the key differences and similarities for [purpose of comparison]." },
];


export const getAiTaskTypeFriendlyName = (taskType: AiTaskTypeOrNone): string => {
  if (taskType === "NONE") return "None";
  return AI_TASK_TYPES.find(t => t.value === taskType)?.label || "Unknown Task";
}
export const getPromptDetailFriendlyName = (detail: PromptDetail): string =>
  PROMPT_DETAIL_LEVELS.find(d => d.value === detail)?.label || "Unknown Detail";

export const getPromptToneFriendlyName = (tone: PromptTone | "NONE"): string =>
  PROMPT_TONES.find(t => t.value === tone)?.label || "Default";

export const TASK_EXAMPLES: Record<AiTaskType, TaskExample> = {
  [AiTaskType.EMAIL_COMPOSITION]: {
    name: "Email Composition",
    basic: "Write an email to my team about the new project deadline.",
    enhancedPlaceholder: "Subject: Project Phoenix Deadline Update\n\nHi Team,\n\nPlease note the revised deadline for Project Phoenix is now EOD Friday, [Date]. This change is due to [Reason for change]. Please adjust your individual tasks and priorities accordingly. Key deliverables that must be completed by this new deadline include [Deliverable 1] and [Deliverable 2]. If you foresee any challenges, discuss them in the team chat by EOD tomorrow.\n\nThanks,\n[Your Name]",
  },
  [AiTaskType.CODE_GENERATION]: {
    name: "Code Generation",
    basic: "Python function to read a CSV and return a list of dictionaries.",
    enhancedPlaceholder: "Create a Python function named `read_csv_to_dicts` that accepts a file path string as an argument. The function should open and read the specified CSV file, assume the first row is the header, and return a list of dictionaries. Each dictionary in the list should represent a row, with keys corresponding to header names and values to cell content. Implement robust error handling for `FileNotFoundError` and `pandas.errors.EmptyDataError` (if using pandas) or equivalent basic CSV parsing errors. Include type hints for arguments and return type. Add a concise docstring explaining its purpose, arguments, and return value.",
  },
  [AiTaskType.IMAGE_CREATION]: {
    name: "Image Description",
    basic: "A cat wearing a hat.",
    enhancedPlaceholder: "Hyperrealistic digital painting, award-winning fantasy art style: A fluffy ginger tabby cat with piercing emerald green eyes and a subtly curious expression, wearing a miniature, deep sapphire blue top hat. The hat is tilted jauntily to one side and has a small, silver buckle detail. Soft, warm directional lighting from the left creates gentle highlights on its fur and casts soft shadows. The background is a richly detailed, blurred cozy library with visible rows of leather-bound books and a hint of a fireplace glow. Focus on intricate fur texture and realistic lighting.",
  },
  [AiTaskType.STORY_WRITING]: {
    name: "Story Writing",
    basic: "A short story about a lost robot.",
    enhancedPlaceholder: "Write a heartwarming short story (approx. 500-700 words) for young adults (ages 13-16) about a small, solar-powered sanitation robot named Bolt, unit 734. Bolt, known for his meticulous cleaning and quiet optimism, gets separated from his inventor, an elderly woman named Elara, during a vibrant and chaotic city-wide Spring Festival. Bolt must navigate unfamiliar, crowded streets, encountering diverse characters: a cynical, street-wise cybernetic pigeon named Corvus, a group of malfunctioning street-performing androids, and a kind child who offers temporary shelter. The story should explore themes of courage in unfamiliar situations, the неожиданные bonds of friendship, and the true meaning of 'home.' Bolt should use his built-in (but simple) gadgets (e.g., a miniature spotlight, a cleaning solution spray that can also be sticky) in resourceful ways to overcome obstacles. End the story on a hopeful, slightly bittersweet note as Bolt finds a new purpose or a clear path back to Elara.",
  },
  [AiTaskType.CONTENT_SUMMARIZATION]: {
    name: "Content Summarization",
    basic: "Summarize this article about climate change.",
    enhancedPlaceholder: "Provide a concise executive summary (target 150-200 words) of the provided text concerning climate change. The summary must accurately identify and highlight: 1. The primary causes discussed. 2. The most significant key impacts identified (environmental, social, economic). 3. Any proposed solutions, mitigation strategies, or urgent calls to action mentioned. Ensure the summary maintains a neutral, objective tone and faithfully reflects the core message and emphasis of the original content. The text to summarize is: [User to paste text here after this prompt is generated]",
  },
  [AiTaskType.TRANSLATION]: {
    name: "Translate Text",
    basic: "Translate 'Hello, how are you?' to Spanish.",
    enhancedPlaceholder: "Translate the following English business communication phrase into formal, professional Spanish suitable for addressing a potential client you haven't met: 'Hello, I hope this email finds you well. I am writing to follow up on our previous conversation and to inquire if you've had a chance to review the proposal we sent last week. Please let me know if you have any questions.' Ensure the translation captures the politeness and professional intent.",
  },
  [AiTaskType.BRAINSTORMING_IDEAS]: {
    name: "Brainstorm Ideas",
    basic: "Ideas for a new mobile app.",
    enhancedPlaceholder: "Brainstorm 5 distinct and innovative mobile app ideas specifically targeting sustainable living and eco-conscious consumers. For each idea, provide: \n1. A catchy App Name. \n2. A brief Concept (1-2 sentences). \n3. Three Key Features. \n4. A potential Monetization Strategy (e.g., freemium, subscription, ethical ad partnerships). \nFocus on apps that solve common pain points or offer unique value in areas like waste reduction, ethical consumption, local eco-friendly discovery, or carbon footprint tracking.",
  },
  [AiTaskType.QUESTION_ANSWERING]: {
    name: "Answer a Question",
    basic: "Why is the sky blue?",
    enhancedPlaceholder: "Explain in clear, accessible, and scientifically accurate terms, suitable for a curious 10-year-old, the phenomenon of why the sky appears blue during the daytime. Your explanation should cover the concepts of: \n1. Sunlight being composed of different colors of light. \n2. The Earth's atmosphere and its composition (gases and particles). \n3. The process of Rayleigh scattering, emphasizing how blue light is scattered more effectively than other colors. \nUse a simple analogy if possible to aid understanding. Avoid overly technical jargon.",
  },
};

export const VIEW_TYPES: Array<{ value: ViewType; label: string }> = [
  { value: ViewType.HOME, label: "Home" },
  { value: ViewType.ENHANCER, label: "Enhancer Tool" },
  { value: ViewType.SUPPORT, label: "Support" },
  { value: ViewType.TERMS, label: "Terms of Service" },
  { value: ViewType.PRIVACY, label: "Privacy Policy" },
  // { value: ViewType.SETTINGS, label: "Settings" }, // Removed
];

export const PLACEHOLDER_CONTENT = {
  SUPPORT_TITLE: "Support & FAQs",
  SUPPORT_INTRO: "Find answers to common questions and get help with the AI Prompt Enhancer.",
  FAQ_ITEMS: [
    { q: "How does the API key work?", a: "The Google Gemini API Key is configured as an environment variable (API_KEY) in the application's execution environment. It's used to authenticate requests to the AI model." },
    { q: "What if I don't have an API key?", a: "The core prompt enhancement feature will not work without a valid API key. The application will indicate if the key is missing or invalid." },
    { q: "Why did my prompt generation fail?", a: "There are a few common reasons for failures: 1.) Invalid API Key: Double-check that your API key is correct, active, and has the necessary permissions. 2.) Network Issues: Ensure you have a stable internet connection. 3.) AI Service Disruption: The AI service might be temporarily unavailable. Please try again in a few moments. 4.) Content Policies: Your input might have been flagged as violating the AI's safety policies. Try rephrasing your core idea." },
    { q: "How can I get the best results?", a: "Provide a clear core idea. Experiment with different Task Types, Detail Levels, and Tones to see how they influence the enhanced prompt. Use the examples as inspiration! The new advanced options allow for even more specific control." },
    { q: "Is my data safe?", a: "This application processes your input to generate prompts. Please review our Privacy Policy for details. No data is stored by this frontend application beyond your browser's session and local storage for theme preferences." }
  ],
  CONTACT_SUPPORT: "Need more help? Contact our support team at support@example.com (placeholder).",
  TERMS_TITLE: "Terms of Service",
  TERMS_LAST_UPDATED: "Last Updated: [Current Date]",
  TERMS_PLACEHOLDER: "Welcome to AI Prompt Enhancer Pro! These terms and conditions outline the rules and regulations for the use of Our Application...\n\n(Detailed terms of service content would go here, covering aspects like: Acceptance of Terms, Use License, Disclaimer, Limitations, Revisions, Governing Law, etc.)\n\nPlease read these terms carefully.",
  PRIVACY_TITLE: "Privacy Policy",
  PRIVACY_LAST_UPDATED: "Last Updated: [Current Date]",
  PRIVACY_PLACEHOLDER: "Your privacy is important to us. This Privacy Policy explains how AI Prompt Enhancer Pro collects, uses, and protects your information...\n\n(Detailed privacy policy content would go here, covering aspects like: Information We Collect, How We Use Information, Data Security, Third-Party Services, User Rights, Children's Privacy, Changes to This Policy, Contact Us, etc.)\n\nPlease review this policy periodically.",
  SETTINGS_TITLE: "Application Settings", 
};
