import React from 'react';

interface HomeViewProps {
  onNavigateToEnhancer: () => void;
}

// FIX: Changed JSX.Element to React.ReactNode to resolve the 'Cannot find namespace JSX' error.
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-[var(--bg-card)] p-6 rounded-xl shadow-xl border border-[var(--border-color)]/70 transition-all duration-300 hover:shadow-2xl hover:border-[var(--accent-primary)]/50 transform hover:-translate-y-1">
    <div className="flex items-center justify-center w-12 h-12 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full mb-5 shadow-md">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
  </div>
);

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToEnhancer }) => {
  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 12L18 14.25l-.25-2.25a3.375 3.375 0 00-2.455-2.455L13.5 9l1.795-1.795a3.375 3.375 0 002.455-2.455L18 2.25l.25 2.25a3.375 3.375 0 002.455 2.455L22.5 9l-1.795 1.795a3.375 3.375 0 00-2.455 2.455zM12.75 9a.75.75 0 000-1.5.75.75 0 000 1.5zM9.75 15.75a.75.75 0 000-1.5.75.75 0 000 1.5z" /></svg>,
      title: "Intelligent Enhancement",
      description: "Transform your basic ideas into detailed, actionable prompts tailored for various AI tasks. Our AI understands context and refines your input for optimal results."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93L15 7.5l1.293-.775c.432-.26.982.036 1.153.528l.281.832c.172.507-.062 1.073-.524 1.33L16.5 10.5l.702 1.217c.25.433.014.986-.499 1.156l-1.293.421c-.407.132-.75.46-.863.867l-.248 1.03c-.09.374-.43.64-.81.64h-1.093c-.38 0-.72-.266-.81-.64l-.248-1.03a1.5 1.5 0 00-.864-.866l-1.292-.422c-.513-.168-.75-.723-.5-1.156l.703-1.217L9 10.5l-.707-.416a1.125 1.125 0 01-.524-1.33l.281-.833c.17-.49.72-.787 1.152-.527L10.5 7.5l.707-.422a1.5 1.5 0 00.78-.93l.149-.894z" /></svg>,
      title: "Task-Specific Output",
      description: "Whether it's email composition, code generation, or image creation, get prompts optimized for the specific AI task you have in mind."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
      title: "Customizable Detail & Tone",
      description: "Fine-tune the level of detail and the desired tone for the AI's output, ensuring the generated content aligns perfectly with your needs."
    },
     {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
      title: "Helpful Examples",
      description: "Stuck for ideas? Explore task-specific examples to see how basic inputs can be transformed into powerful, enhanced prompts."
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-8 md:pt-12">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
            Unlock AI's Full Potential
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
          AI Prompt Enhancer Pro transforms your simple ideas into powerful, detailed instructions for AI.
          Generate high-quality, task-specific prompts for emails, code, images, and more, effortlessly.
        </p>
        <button
          onClick={onNavigateToEnhancer}
          className="btn-animated-rainbow inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-deep)] focus:ring-[var(--accent-primary)] 
                     transform hover:scale-105 active:scale-100 transition-all duration-200 ease-in-out font-heading"
        >
          Start Enhancing Prompts Now
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000000" className="w-5 h-5 ml-2 inline">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-4xl font-heading font-semibold text-center mb-16 text-[var(--text-primary)]">
          Why Choose AI Prompt Enhancer Pro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </section>

      {/* How It Works Section (Simplified) */}
       <section className="text-center">
        <h2 className="text-4xl font-heading font-semibold text-center mb-12 text-[var(--text-primary)]">
          Simple Steps to Powerful Prompts
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          <div className="flex flex-col items-center p-6 bg-[var(--bg-card)]/50 rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] rounded-full text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-2">Input Your Idea</h3>
            <p className="text-sm text-[var(--text-secondary)]">Start with a basic concept or question.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-[var(--bg-card)]/50 rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] rounded-full text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-2">Customize Options</h3>
            <p className="text-sm text-[var(--text-secondary)]">Select task type, detail, and tone.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-[var(--bg-card)]/50 rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] rounded-full text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-2">Get Enhanced Prompt</h3>
            <p className="text-sm text-[var(--text-secondary)]">Receive a detailed, AI-ready prompt.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;