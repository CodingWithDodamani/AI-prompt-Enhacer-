
import React from 'react';
import { Theme } from '../../types';
import { PLACEHOLDER_CONTENT, API_KEY_INFO_MESSAGE } from '../../constants';

interface SettingsViewProps {
  currentTheme: Theme;
  onToggleTheme: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentTheme, onToggleTheme }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--accent-primary)] mb-10 text-center">
        {PLACEHOLDER_CONTENT.SETTINGS_TITLE}
      </h1>

      <div className="space-y-10">
        {/* Appearance Settings */}
        <section className="bg-[var(--bg-card)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--border-color)]/70">
          <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-[var(--accent-secondary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125V4.125C21 3.504 20.496 3 19.875 3H12M9 3.75l3 3m0 0l3-3m-3 3v12.75" />
            </svg>
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-[var(--text-secondary)]">Interface Theme:</p>
            <button
              onClick={onToggleTheme}
              className="px-5 py-2.5 rounded-lg hover:bg-[var(--accent-primary)]/20 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] transition-all duration-150 flex items-center font-medium border border-[var(--border-color-input)]"
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
            >
              {currentTheme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
              Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </section>

        {/* API Key Information */}
        <section className="bg-[var(--bg-card)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--border-color)]/70">
          <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-[var(--accent-secondary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            API Key Configuration
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {API_KEY_INFO_MESSAGE}
          </p>
          <p className="text-sm text-[var(--text-secondary)]/80 mt-3 italic">
            Currently, the API key is managed via an environment variable (<code>API_KEY</code>) in the application's deployment environment. Future updates may allow direct input here.
          </p>
        </section>

        {/* Account Settings (Placeholder) */}
        <section className="bg-[var(--bg-card)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--border-color)]/70 opacity-60">
          <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-6 flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-[var(--accent-secondary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Account (Conceptual)
          </h2>
          <p className="text-[var(--text-secondary)] mb-4 italic">
            User accounts and related settings are not yet implemented in this version. The features below are conceptual placeholders for future development.
          </p>
          <div className="space-y-3">
            <button disabled className="w-full text-left px-4 py-3 bg-[var(--bg-input)] text-[var(--text-secondary)] rounded-lg cursor-not-allowed">Manage Subscription</button>
            <button disabled className="w-full text-left px-4 py-3 bg-[var(--bg-input)] text-[var(--text-secondary)] rounded-lg cursor-not-allowed">View Billing History</button>
            <button disabled className="w-full text-left px-4 py-3 bg-[var(--bg-input)] text-[var(--text-secondary)] rounded-lg cursor-not-allowed">Logout</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
