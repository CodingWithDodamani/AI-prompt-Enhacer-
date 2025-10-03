import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AiTaskType, PromptDetail, PromptTone, AiTaskTypeOrNone } from '../types';
import { getAiTaskTypeFriendlyName, getPromptDetailFriendlyName, getPromptToneFriendlyName } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const isApiKeyConfigured = (): boolean => {
  return !!API_KEY;
};

export const generateEnhancedPrompt = async (
  userInput: string,
  taskType: AiTaskType,
  detailLevel: PromptDetail,
  tone: PromptTone | "NONE",
  secondaryTaskType: AiTaskTypeOrNone,
  specificAspects: string,
  customTone: string,
  wordsToInclude: string,
  wordsToAvoid: string,
  goalTemplateUsedName?: string // Optional: name of the goal template used
): Promise<string> => {
  if (!ai) {
    throw new Error("Gemini API key not configured. Please set the API_KEY environment variable.");
  }

  let systemInstruction = `You are an expert AI Prompt Enhancer. Your task is to transform a user's basic idea into a detailed, actionable, and highly effective prompt suitable for various AI models.
The enhanced prompt you generate should be ready to be copied and pasted by the user. Do NOT include any conversational introductory or concluding remarks, meta-commentary about the prompt itself, or any text other than the enhanced prompt.
Focus on clarity, specificity, and completeness to maximize the utility of the generated prompt for the target AI.
If the user's original idea seems ambiguous, briefly note this within the enhanced prompt itself (e.g., "Suggestion for clarity: Consider specifying [ambiguous part].").
If 'Detailed' or 'Step-by-step' detail level is selected and the original idea lacks context, suggest within the enhanced prompt what additional information could be beneficial (e.g., "For more depth, you could add details about [missing context area].").`;

  if (taskType === AiTaskType.IMAGE_CREATION) {
    systemInstruction += ` For image generation, focus on vivid visual descriptions, art styles, composition, colors, lighting, mood, and specific details. Avoid instructional phrases like "Generate an image of..." and instead provide the descriptive text directly as if it's the prompt itself.`;
  } else if (taskType === AiTaskType.CODE_GENERATION) {
    systemInstruction += ` For code generation, ensure the prompt specifies programming language, required functionality, libraries/frameworks, input/output expectations, edge cases to consider, and any constraints. If a user provides code, refine it or add to it based on their request.`;
  } else if (taskType === AiTaskType.EMAIL_COMPOSITION) {
    systemInstruction += ` For email composition, guide the AI to write a complete email. Include placeholders like [Recipient Name], [Subject Line], [Key Point 1], [Sign-off] if appropriate, based on the user's input. The prompt should help create a ready-to-send email.`;
  } else if (taskType === AiTaskType.STORY_WRITING) {
    systemInstruction += ` For story writing, the prompt should guide the AI on genre, characters, setting, plot points (if any), desired length, narrative style, and any specific themes to explore.`;
  } else if (taskType === AiTaskType.CONTENT_SUMMARIZATION) {
     systemInstruction += ` For content summarization, the prompt should specify the desired length and focus of the summary (e.g., key points, main arguments, factual extraction). If the user provides text, the enhanced prompt should instruct an AI to summarize that specific text.`;
  }


  let userQuery = `Transform the following user idea into an enhanced AI prompt.
Original user idea: "${userInput}"`;

  if (goalTemplateUsedName) {
    userQuery += `\n(User started with the '${goalTemplateUsedName}' template.)`;
  }

  userQuery += `\nPrimary task type: "${getAiTaskTypeFriendlyName(taskType)}"`;

  if (secondaryTaskType !== "NONE") {
    userQuery += `\nSecondary task objective: "${getAiTaskTypeFriendlyName(secondaryTaskType)}. Integrate this secondary objective seamlessly or as a distinct part of the enhanced prompt as appropriate."`;
  }
  
  userQuery += `\nDesired prompt detail: "${getPromptDetailFriendlyName(detailLevel)}"`;

  if (specificAspects.trim()) {
    userQuery += `\nFocus on providing extra detail for these aspects: "${specificAspects.trim()}"`;
  }

  const finalToneInstruction = customTone.trim() || (tone !== "NONE" ? getPromptToneFriendlyName(tone) : "");
  if (finalToneInstruction) {
    userQuery += `\nDesired tone for the AI's final output (using the enhanced prompt): "${finalToneInstruction}"`;
  }

  if (wordsToInclude.trim()) {
    userQuery += `\nFor the tone, try to include words/phrases like: "${wordsToInclude.trim()}"`;
  }
  if (wordsToAvoid.trim()) {
    userQuery += `\nFor the tone, try to avoid words/phrases like: "${wordsToAvoid.trim()}"`;
  }

  userQuery += `\n\nEnhanced AI Prompt:`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      // FIX: Updated model to 'gemini-2.5-flash' as per guidelines.
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.65, // Slightly increased for more nuanced outputs with new inputs
        topK: 40,
        topP: 0.9,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for prompt enhancement:", error);
    if (error instanceof Error) {
        const geminiError = error as any; 
        if (geminiError.message && geminiError.message.includes('API key not valid')) {
             throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
        }
         throw new Error(`Failed to generate prompt: ${error.message}`);
    }
    throw new Error("Failed to generate prompt due to an unknown error.");
  }
};

export const suggestTaskType = async (
  userInput: string,
  availableTasks: Array<{ value: AiTaskType; label: string }>
): Promise<AiTaskTypeOrNone | null> => {
  if (!ai) {
    throw new Error("Gemini API key not configured for task suggestion.");
  }
  if (!userInput.trim()) {
    throw new Error("User input is empty, cannot suggest task type.");
  }

  const taskListString = availableTasks.map(t => `${t.label} (key: ${t.value})`).join('; ');
  const instruction = `Given the user's idea: "${userInput}", analyze it and suggest the most relevant AI Task Type from the following list: ${taskListString}. 
Respond ONLY with the task type's key (e.g., 'CODE_GENERATION' or 'EMAIL_COMPOSITION'). 
If the idea is too vague or no specific task type strongly matches, respond with 'NONE'.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      // FIX: Updated model to 'gemini-2.5-flash' as per guidelines.
      model: 'gemini-2.5-flash', // Using flash for quick suggestion
      contents: instruction,
      config: {
        temperature: 0.2, // Low temperature for more deterministic suggestion
        topK: 5,
        topP: 0.8,
        // thinkingConfig: { thinkingBudget: 0 } // Optional: disable thinking for low latency, if needed
      }
    });
    
    const suggestedKey = response.text.trim();

    // Validate if the suggestedKey is one of the AiTaskType enum values or "NONE"
    const isValidTaskKey = availableTasks.some(task => task.value === suggestedKey);
    if (isValidTaskKey) {
      return suggestedKey as AiTaskType;
    } else if (suggestedKey === "NONE") {
      return "NONE";
    }
    console.warn("Gemini suggested an invalid task key:", suggestedKey);
    return null; // Or "NONE" if preferred for unmappable suggestions

  } catch (error) {
    console.error("Error calling Gemini API for task suggestion:", error);
    if (error instanceof Error) {
      const geminiError = error as any;
      if (geminiError.message && geminiError.message.includes('API key not valid')) {
        throw new Error("Invalid API Key for task suggestion. Please check your API_KEY environment variable.");
      }
      throw new Error(`Failed to suggest task type: ${error.message}`);
    }
    throw new Error("Failed to suggest task type due to an unknown error.");
  }
};