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

## ⚙️ Setup & Deployment

This application's core functionality depends on a Google Gemini API key. This key must be securely provided to the application through an environment variable.

### API Key Requirement

You must have a valid Google Gemini API key. You can get one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).

The application code expects the key to be available as an environment variable named `API_KEY`. **The application will not function without it.**

### Vercel Deployment (Recommended)

Deploying to [Vercel](https://vercel.com) is the easiest way to get this project online. Vercel's build process will automatically make the environment variable you set available to the application.

#### New Project Setup

1.  **Push to GitHub**: Make sure your project code is in a GitHub repository.
2.  **Import Project in Vercel**:
    -   Log in to your Vercel account.
    -   From your dashboard, click "Add New..." and select "Project".
    -   Connect your GitHub account and select the repository for this project.
3.  **Configure Environment Variable (Crucial Step!)**:
    -   Before you click "Deploy", expand the **"Environment Variables"** section.
    -   In the **KEY** field, you must type `API_KEY`.
    -   In the **VALUE** field, paste your Google Gemini API key (it starts with `AIzaSy...`).
    -   Click the **"Add"** button to save the variable.
4.  **Deploy**:
    -   Click the **"Deploy"** button. Vercel will build and launch your site.

#### Fixing an Existing Project on Vercel

If you've already deployed and are seeing the "API Key Not Found" error, follow these steps:

1.  Go to your project's dashboard on Vercel.
2.  Click on the **"Settings"** tab, then select **"Environment Variables"** from the side menu.
3.  Add the `API_KEY` and its value as described above and click **"Save"**.
4.  **You must redeploy the application for the change to take effect.** Go to the **"Deployments"** tab, find the latest deployment, click the three-dots menu (`...`) on the right, and select **"Redeploy"**.

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
