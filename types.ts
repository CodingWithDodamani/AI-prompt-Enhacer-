
export enum AiTaskType {
  EMAIL_COMPOSITION = "EMAIL_COMPOSITION",
  CODE_GENERATION = "CODE_GENERATION",
  IMAGE_CREATION = "IMAGE_CREATION",
  STORY_WRITING = "STORY_WRITING",
  CONTENT_SUMMARIZATION = "CONTENT_SUMMARIZATION",
  TRANSLATION = "TRANSLATION",
  BRAINSTORMING_IDEAS = "BRAINSTORMING_IDEAS",
  QUESTION_ANSWERING = "QUESTION_ANSWERING",
}

export type AiTaskTypeOrNone = AiTaskType | "NONE";

export enum PromptDetail {
  CONCISE = "CONCISE",
  DETAILED = "DETAILED",
  STEP_BY_STEP = "STEP_BY_STEP",
}

export enum PromptTone {
  FORMAL = "FORMAL",
  CASUAL = "CASUAL",
  PROFESSIONAL = "PROFESSIONAL",
  FRIENDLY = "FRIENDLY",
  HUMOROUS = "HUMOROUS",
  PERSUASIVE = "PERSUASIVE",
}

export interface TaskExample {
  name: string;
  basic: string;
  enhancedPlaceholder: string;
}

export type Theme = 'dark' | 'light';

export enum ViewType {
  HOME = "HOME",
  ENHANCER = "ENHANCER",
  SUPPORT = "SUPPORT",
  TERMS = "TERMS",
  PRIVACY = "PRIVACY",
  SETTINGS = "SETTINGS",
}

export interface GoalTemplate {
  value: string; // e.g., "solve_problem" or "NONE"
  label: string; // e.g., "Solve a Problem" or "None"
  template: string; // e.g., "I want to find a solution for [problem description]..." or ""
}
