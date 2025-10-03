
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  color?: string; // Allow custom color
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', message, color }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-[3px]', // Slightly thinner border for md
    lg: 'w-16 h-16 border-4',
  };

  const spinnerColor = color || 'var(--accent-primary)';

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]}`}
        style={{ borderColor: spinnerColor, borderTopColor: 'transparent' }}
      ></div>
      {message && <p className="mt-3 text-[var(--text-secondary)] text-sm font-medium">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
