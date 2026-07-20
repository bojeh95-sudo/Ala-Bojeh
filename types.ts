// FIX: Import React to make the global JSX namespace available, resolving the "Cannot find namespace 'JSX'" error.
import React from 'react';

export enum Language {
    EN = 'en',
    AR = 'ar',
    ES = 'es',
    FR = 'fr',
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Tool {
  id: string;
  name: string;
}

export interface Content {
  header: {
    title: string;
    tools: string;
    features: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    button: string;
  };
  features: {
    title: string;
    items: Feature[];
  };
  tools: {
    title: string;
    basicTitle: string;
    aiTitle: string;
    imageTitle?: string;
    pdfConversionTitle?: string;
    additionalTitle?: string;
    basicTools: Tool[];
    aiTools: Tool[];
    imageTools?: Tool[];
    pdfConversionTools?: Tool[];
    additionalTools?: Tool[];
  };
  languages: {
    title: string;
    supported: string[];
  };
  footer: {
    visit: string;
    copyright: string;
  };
  support?: {
    buttonText: string;
    cardTitle: string;
    description: string;
  };
}

export type LanguageContent = {
  [key in Language]: Content;
};