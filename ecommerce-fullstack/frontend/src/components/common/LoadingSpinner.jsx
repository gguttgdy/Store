import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'primary', text = 'Loading...', variant = 'spinner' }) => {
  const sizeClasses = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '2rem', height: '2rem' },
    lg: { width: '3rem', height: '3rem' },
    xl: { width: '4rem', height: '4rem' }
  };

  const colorClasses = {
    primary: 'var(--primary-solid)',
    secondary: 'var(--gray-500)',
    success: 'var(--success)',
    danger: 'var(--danger)',
    warning: 'var(--warning)',
    info: 'var(--info)'
  };

  if (variant === 'dots') {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-4">
        <div className="d-flex gap-2 mb-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-circle"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: colorClasses[color],
                animation: `dotPulse 1s infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
        {text && <p className="text-muted mb-0 small">{text}</p>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-4">
        <div
          className="rounded-circle"
          style={{
            ...sizeClasses[size],
            backgroundColor: colorClasses[color],
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        />
        {text && <p className="text-muted mb-0 small mt-3">{text}</p>}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div
        className="spinner-border"
        style={{
          ...sizeClasses[size],
          borderColor: `${colorClasses[color]}`,
          borderRightColor: 'transparent'
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="text-muted mb-0 small mt-3">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
