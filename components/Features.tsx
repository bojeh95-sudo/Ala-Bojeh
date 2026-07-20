
import React from 'react';
import type { Content } from '../types';

interface FeaturesProps {
  content: Content['features'];
}

export const Features: React.FC<FeaturesProps> = ({ content }) => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.title}
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((feature, index) => (
            <div key={index} className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-100/60 dark:border-slate-700/80 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-1 text-base text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
