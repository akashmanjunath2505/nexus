import React, { useState, useEffect } from 'react';

const analysisTexts = [
  "Calibrating Bayesian models...",
  "Weaving pathomechanistic graphs...",
  "Scanning for evidence anchors...",
  "Auditing for cognitive bias...",
  "Forging differential hypotheses...",
  "Calculating urgency gradients...",
  "Synthesizing evidence...",
];

export const Loader: React.FC = () => {
  const [text, setText] = useState(analysisTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(prevText => {
        const currentIndex = analysisTexts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % analysisTexts.length;
        return analysisTexts[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 relative mb-4">
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
          <circle cx="50" cy="50" r="45" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="2" fill="none" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }}>
          <circle cx="50" cy="50" r="35" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" fill="none" />
        </svg>
         <svg viewBox="0 0 100 100" className="absolute inset-0">
            <path d="M50,5 L50,95 M5,50 L95,50 M17.6,17.6 L82.4,82.4 M17.6,82.4 L82.4,17.6" stroke="rgba(0, 255, 255, 0.1)" strokeWidth="1"/>
            <circle cx="50" cy="50" r="10" fill="rgba(0, 255, 255, 0.5)" className="animate-pulse" />
        </svg>
      </div>
      <p className="mt-4 text-slate-100 font-medium text-xl">NEXUS Analyzing</p>
      <p className="mt-2 text-sm text-cyan-400 h-5 transition-all duration-300">{text}</p>
    </div>
  );
};