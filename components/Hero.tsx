
import React from 'react';
import type { Content } from '../types';

interface HeroProps {
  content: Content['hero'];
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <div className="relative pt-16 pb-20 text-center">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
            <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0))]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                PDFProTools
                <span className="block text-indigo-600 dark:text-indigo-400">{content.title}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {content.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
                <a
                    href="#tools"
                    className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg transform transition-transform hover:scale-105"
                >
                    {content.button}
                </a>
            </div>
        </div>
    </div>
  );
};
