
# AI Prompt Enhancer Pro

**Transform your simple ideas into powerful, detailed instructions for any AI model.**

AI Prompt Enhancer Pro is a sophisticated web application designed to help users craft highly effective prompts for generative AI. By taking a basic idea or question, the tool uses the Google Gemini API to generate a structured, detailed, and context-rich prompt tailored to specific tasks like email composition, code generation, image creation, and more.

---

## ✨ Key Features

-   **Intelligent Enhancement**: Leverages the Google Gemini API to turn vague ideas into clear, actionable prompts.
-   **Task-Specific Optimization**: Select from a range of AI tasks (e.g., Code Generation, Story Writing) to get a prompt that is optimized for that specific purpose.
-   **Fine-Grained Control**:
    -   **Goal Templates**: Kickstart your prompt with pre-defined structures for common goals.
    -   **Detail Levels**: Choose between `Concise`, `Detailed`, and `Step-by-step` to control the verbosity of the enhanced prompt.
    -   **Tone Customization**: Select a predefined tone (`Formal`, `Humorous`, etc.) or define a custom tone with specific keywords to include or avoid.
-   **AI-Powered Suggestions**: Automatically suggests the most relevant primary task type based on your core idea.
-   **Dynamic Examples**: View helpful examples that update in real-time as you select different task types, providing inspiration and clarity.
-   **Sleek & Responsive UI**: A modern, user-friendly interface built with React and Tailwind CSS, featuring both light and dark themes to suit your preference.
-   **Copy-to-Clipboard**: Easily copy the generated prompt with a single click, ready to be used in your favorite AI tool.

---

## 🚀 How It Works

The process is designed to be simple and intuitive:

1.  **Enter Your Core Idea**: Start by typing a basic concept, question, or goal into the main text area. You can also use an optional Goal Template to get started.
2.  **Customize Your Options**:
    -   Select the **Primary AI Task Type** that best fits your goal. Use the "Suggest" button to let the AI help you decide.
    -   Choose the desired **Detail Level** and **Tone**.
    -   (Optional) Refine your request further with advanced options for specific details and tone keywords.
3.  **Enhance & Use**: Click the **"Enhance My Prompt"** button. The application sends your configured request to the Gemini API and displays the detailed, ready-to-use prompt in the results section.

---

## 🛠️ Technology Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Gemini API via `@google/genai`](https://github.com/google/generative-ai-js)

---

## ⚙️ Setup & Configuration

This application is designed to run in an environment where the Google Gemini API key is securely managed.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari, Edge).
-   A valid Google Gemini API key.

### API Key Configuration

The application requires the Google Gemini API key to be set as an environment variable named `API_KEY`.

```
API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

The application client-side code will access this key via `process.env.API_KEY`. It is crucial that this environment variable is correctly configured in the execution or build environment where the application is deployed. **The application will not function without it.**

---

## 📁 Project Structure

The project is organized into a modular and maintainable structure:

```
.
├── index.html                # Main HTML entry point
├── index.tsx                 # Core React application component (App.tsx)
├── components/               # Reusable React UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── UserInputSection.tsx
│   ├── GeneratedPromptSection.tsx
│   └── ...
├── services/
│   └── geminiService.ts      # Logic for interacting with the Google Gemini API
├── constants.ts              # Application-wide constants (e.g., task types, examples)
├── types.ts                  # TypeScript type definitions and enums
└── README.md                 # This file
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
