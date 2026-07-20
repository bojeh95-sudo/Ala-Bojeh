
import React from 'react';
import type { Content } from '../types';

interface FooterProps {
  content: Content['footer'];
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-slate-300 dark:text-slate-400 border-t border-transparent dark:border-slate-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-base font-semibold text-indigo-400 dark:text-indigo-300">
          {content.visit}
        </p>
        <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
};
