import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className, icon }) => {
  return (
    <div className={`bg-slate-900/40 border border-slate-700/80 rounded-xl shadow-2xl shadow-black/20 backdrop-blur-lg transition-all duration-300 hover:border-cyan-500/50 ${className}`}>
      <div className="px-4 py-3 sm:px-6 border-b border-slate-700/80">
        <h3 className="text-lg leading-6 font-semibold text-cyan-300 flex items-center">
          {icon && <span className="mr-3 text-cyan-400">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};
