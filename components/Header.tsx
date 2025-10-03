
import React from 'react';
import { Theme, ViewType } from '../types';

interface HeaderProps {
  title: string;
  currentTheme: Theme;
  currentView: ViewType;
  onToggleTheme: () => void;
  onNavigateView: (view: ViewType) => void;
  onScrollToSection: (sectionId: string) => void; 
}

const NavLink: React.FC<{ 
  onClick: () => void; 
  children: React.ReactNode; 
  isActive?: boolean;
  ariaLabel?: string;
}> = ({ onClick, children, isActive = false, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150
                ${isActive 
                  ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 font-semibold' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10'}
                focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]`}
    aria-label={ariaLabel || (typeof children === 'string' ? `Navigate to ${children}` : undefined)}
    aria-current={isActive ? "page" : undefined}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ title, currentTheme, currentView, onToggleTheme, onNavigateView, onScrollToSection }) => {
  const isEnhancerView = currentView === ViewType.ENHANCER;

  return (
    <header className="bg-[var(--bg-card)]/80 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-5">
        <button
          onClick={() => onNavigateView(ViewType.HOME)}
          className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] rounded-md p-1 -ml-1"
          aria-label="Navigate to Home page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--accent-primary)" className="w-9 h-9 md:w-10 md:h-10 mr-3 transition-transform duration-300 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a15.073 15.073 0 01-7.5 0C4.064 22.456 2.25 20.285 2.25 17.75S4.064 13.044 7.5 11.25c3.436-1.828 7.5-1.828 10.936 0 3.436 1.828 5.25 4.009 5.25 6.5s-1.814 4.706-5.25 6.5zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 10.875c-.33-.588-1.995-.588-2.325 0M12 3.75c0 .414.336.75.75.75h.008c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H12.75c-.414 0-.75.336-.75.75zM16.5 4.5c0 .414.336.75.75.75h.008c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H17.25c-.414 0-.75.336-.75.75zM7.5 4.5c0 .414.336.75.75.75H8.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H8.25c-.414 0-.75.336-.75.75z" />
          </svg>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-[var(--accent-primary)] tracking-tight transition-colors duration-300 group-hover:text-[var(--accent-primary-darker)]">{title}</h1>
        </button>

        <div className="flex items-center space-x-1 md:space-x-2">
          <nav className="hidden sm:flex items-center space-x-0.5 md:space-x-1" aria-label="Main navigation">
            <NavLink onClick={() => onNavigateView(ViewType.HOME)} isActive={currentView === ViewType.HOME}>Home</NavLink>
            <NavLink onClick={() => onNavigateView(ViewType.ENHANCER)} isActive={currentView === ViewType.ENHANCER}>Enhancer</NavLink>
            {isEnhancerView && (
              <>
                <NavLink onClick={() => onScrollToSection('input-section')} ariaLabel="Scroll to Create section">Create</NavLink>
                <NavLink onClick={() => onScrollToSection('examples-section')} ariaLabel="Scroll to Examples section">Examples</NavLink>
                <NavLink onClick={() => onScrollToSection('result-section')} ariaLabel="Scroll to Result section">Result</NavLink>
              </>
            )}
            <NavLink onClick={() => onNavigateView(ViewType.SUPPORT)} isActive={currentView === ViewType.SUPPORT}>Support</NavLink>
          </nav>
          
          {/* Removed Settings NavLink
          <NavLink 
             onClick={() => onNavigateView(ViewType.SETTINGS)} 
             isActive={currentView === ViewType.SETTINGS}
             ariaLabel="Open Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.095.571.488 1.059.995 1.414l1.124.806c.55.395 1.295.17 1.65-.47L19.5 6.25c.355-.64.03-1.452-.64-1.808l-1.497-.786A2.25 2.25 0 0014.965 3h-5.93a2.25 2.25 0 00-1.908.985l-1.497.786c-.67.356-1 .998-.64 1.808l1.004 1.793c.355.64.27.89.01.47l1.124-.806c.507-.355.9-.843.995-1.414L9.594 3.94zM8.25 12.75a7.5 7.5 0 0115 0v1.5c0 .933-.324 1.804-.864 2.49l-1.146 1.467c-.14.18-.332.317-.541.399l-1.112.42a2.25 2.25 0 01-1.34.022l-1.805-.451a2.25 2.25 0 00-1.43.022L8.06 19.05c-.39.098-.796.098-1.187 0l-1.804-.45a2.25 2.25 0 00-1.432-.023L2.53 17.65a2.25 2.25 0 01-1.34-.022l-1.112-.42a2.25 2.25 0 01-.542-.4l-1.145-1.466A2.25 2.25 0 01.75 14.25v-1.5a7.5 7.5 0 0115 0z" />
            </svg>
          </NavLink>
          */}

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-[var(--accent-primary)]/20 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] transition-all duration-150"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
          >
            {currentTheme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
