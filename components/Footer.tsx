
import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  appName: string;
  onNavigateView: (view: ViewType) => void;
}

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:underline focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] rounded-sm transition-all duration-150 ${className}`}
  >
    {children}
  </button>
);

const Footer: React.FC<FooterProps> = ({ appName, onNavigateView }) => {
  return (
    <footer className="bg-[var(--bg-card)]/80 backdrop-blur-lg text-[var(--text-secondary)] p-8 mt-20 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="container mx-auto text-center">
        <nav className="flex justify-center items-center space-x-4 md:space-x-6 mb-6" aria-label="Footer navigation">
          <FooterLink onClick={() => onNavigateView(ViewType.SUPPORT)}>Support</FooterLink>
          <span className="text-[var(--text-secondary)]/50">|</span>
          <FooterLink onClick={() => onNavigateView(ViewType.TERMS)}>Terms of Service</FooterLink>
          <span className="text-[var(--text-secondary)]/50">|</span>
          <FooterLink onClick={() => onNavigateView(ViewType.PRIVACY)}>Privacy Policy</FooterLink>
          {/* Removed Settings FooterLink
          <span className="text-[var(--text-secondary)]/50">|</span>
          <FooterLink onClick={() => onNavigateView(ViewType.SETTINGS)}>Settings</FooterLink> 
          */}
        </nav>
        <p className="text-[var(--text-primary)] font-medium">&copy; {new Date().getFullYear()} {appName}.</p>
        <p className="text-sm mt-2">Powered by Generative AI & Halleppa Dodamani Creativity Mindset.</p>
        <p className="text-xs mt-3 text-[var(--text-secondary)]/80">Version 2.5 - "Nova" Edition</p>
      </div>
    </footer>
  );
};

export default Footer;
