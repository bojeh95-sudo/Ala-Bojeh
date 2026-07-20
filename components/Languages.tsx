
import React from 'react';
import type { Content } from '../types';

interface LanguagesProps {
  content: Content['languages'];
}

export const Languages: React.FC<LanguagesProps> = ({ content }) => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.title}
          </h2>
          <div className="mt-8 flex justify-center items-center flex-wrap gap-x-8 gap-y-4">
            {content.supported.map((lang, index) => (
              <span key={index} className="text-xl font-medium text-slate-600 dark:text-slate-300">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
