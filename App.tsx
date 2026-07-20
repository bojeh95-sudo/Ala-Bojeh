
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Tools } from './components/Tools';
import { Languages } from './components/Languages';
import { Footer } from './components/Footer';
import { ToolPlayground } from './components/ToolPlayground';
import { Reviews } from './components/Reviews';
import { ShareWebsite } from './components/ShareWebsite';
import { content } from './constants';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activeToolName, setActiveToolName] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // 1. URL parsing on mount to handle direct landings / deep links
  React.useEffect(() => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    let initialLang = Language.EN;
    let initialTool: string | null = null;

    if (pathParts.length > 0) {
      const maybeLang = pathParts[0].toLowerCase();
      if (['en', 'ar', 'es', 'fr'].includes(maybeLang)) {
        initialLang = maybeLang as Language;
        if (pathParts.length > 1) {
          initialTool = pathParts[1];
        }
      } else {
        // First part is actually a tool ID
        initialTool = pathParts[0];
      }
    }

    setLanguage(initialLang);
    if (initialTool) {
      const contentForLang = content[initialLang];
      const basicTool = contentForLang.tools.basicTools.find(t => t.id === initialTool);
      const aiTool = contentForLang.tools.aiTools.find(t => t.id === initialTool);
      const imgTool = contentForLang.tools.imageTools?.find(t => t.id === initialTool);
      const pdfConvTool = contentForLang.tools.pdfConversionTools?.find(t => t.id === initialTool);
      if (basicTool || aiTool || imgTool || pdfConvTool) {
        setActiveToolId(initialTool);
        setActiveToolName(basicTool?.name || aiTool?.name || imgTool?.name || pdfConvTool?.name || initialTool);
      }
    }

    // Handle browser forward/back button clicks
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      let l = Language.EN;
      let t: string | null = null;

      if (parts.length > 0) {
        const maybeL = parts[0].toLowerCase();
        if (['en', 'ar', 'es', 'fr'].includes(maybeL)) {
          l = maybeL as Language;
          if (parts.length > 1) {
            t = parts[1];
          }
        } else {
          t = parts[0];
        }
      }

      setLanguage(l);
      if (t) {
        const c = content[l];
        const basic = c.tools.basicTools.find(x => x.id === t);
        const ai = c.tools.aiTools.find(x => x.id === t);
        const img = c.tools.imageTools?.find(x => x.id === t);
        const pdfConv = c.tools.pdfConversionTools?.find(x => x.id === t);
        if (basic || ai || img || pdfConv) {
          setActiveToolId(t);
          setActiveToolName(basic?.name || ai?.name || img?.name || pdfConv?.name || t);
        } else {
          setActiveToolId(null);
        }
      } else {
        setActiveToolId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL bar whenever state changes
  const updateUrl = (lang: Language, toolId: string | null) => {
    let newPath = '/';
    if (lang !== Language.EN || toolId) {
      newPath = `/${lang}`;
      if (toolId) {
        newPath += `/${toolId}`;
      }
    } else if (toolId) {
      newPath = `/en/${toolId}`;
    }

    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  };

  // 2. Sync DOM direction, lang attribute, Document Title, and all SEO Meta/Open Graph/Twitter Card tags dynamically
  React.useEffect(() => {
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Highly optimized translated metadata dictionary for default pages
    const seoData = {
      [Language.EN]: {
        title: 'PDFProTools - Free Online PDF Tools: Merge, Convert, Compress, Protect',
        description: 'Free Online PDF Tools: Merge, convert, compress, and protect your PDF files easily and without installation. Enjoy smart AI-powered PDF solutions.'
      },
      [Language.AR]: {
        title: 'أدوات PDF مجانية أونلاين: دمج، تحويل، ضغط، حماية ملفاتك بسهولة وبدون برامج - PDFProTools',
        description: 'أدوات PDF مجانية أونلاين: دمج، تحويل، ضغط، حماية ملفاتك بسهولة وبدون برامج. تمتع بحلول PDF متكاملة مدعومة بالذكاء الاصطناعي وبدون اشتراك.'
      },
      [Language.ES]: {
        title: 'PDFProTools - Herramientas PDF Gratuitas en Línea: Unir, Convertir, Comprimir, Proteger',
        description: 'Herramientas PDF gratuitas en línea: une, convierte, comprime y protege tus archivos PDF de forma fácil, segura y sin instalación.'
      },
      [Language.FR]: {
        title: 'PDFProTools - Outils PDF Gratuits en Ligne : Fusionner, Convertir, Compresser, Protéger',
        description: 'Outils PDF gratuits en ligne : fusionnez, convertissez, compressez et protégez vos fichiers PDF facilement, en toute sécurité et sans installation.'
      }
    };

    const currentSeo = seoData[language] || seoData[Language.EN];
    let titleText = '';
    let descText = '';

    // If a tool is active, make the metadata specific and helpful for search engines and sharing!
    if (activeToolId && activeToolName) {
      if (language === Language.AR) {
        titleText = `${activeToolName} - أداة مجانية أونلاين | PDFProTools`;
        descText = `استخدم أداة ${activeToolName} مجاناً وبسهولة فائقة أونلاين وبدون برامج. جزء من حزمة PDFProTools الذكية لمعالجة وتعديل وتحويل ملفات PDF.`;
      } else if (language === Language.ES) {
        titleText = `${activeToolName} - Herramienta Gratis en Línea | PDFProTools`;
        descText = `Utilice la herramienta ${activeToolName} gratis en línea de forma fácil y segura. Parte de PDFProTools, su solución de PDF definitiva.`;
      } else if (language === Language.FR) {
        titleText = `${activeToolName} - Outil Gratuit en Ligne | PDFProTools`;
        descText = `Utilisez l'outil ${activeToolName} gratuitement en ligne en toute simplicité et sécurité. Fait partie de PDFProTools pour tous vos besoins PDF.`;
      } else {
        titleText = `${activeToolName} - Free Online Tool | PDFProTools`;
        descText = `Use the ${activeToolName} tool for free online easily and securely. Part of the comprehensive PDFProTools suite for your PDF documents.`;
      }
    } else {
      titleText = currentSeo.title;
      descText = currentSeo.description;
    }

    // Set browser tab title
    document.title = titleText;

    // Get the absolute base URLs for social images/URLs
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.pdfprotools.com';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.pdfprotools.com';
    const imageUrl = `${origin}/social_preview.png`;

    // Inner helper function to set or append meta elements safely in the DOM
    const setMetaTag = (selector: string, contentValue: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) element.setAttribute('property', prop);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 1. Core SEO tag
    setMetaTag('meta[name="description"]', descText);

    // 2. Open Graph tags
    setMetaTag('meta[property="og:title"]', titleText);
    setMetaTag('meta[property="og:description"]', descText);
    setMetaTag('meta[property="og:url"]', currentUrl);
    setMetaTag('meta[property="og:image"]', imageUrl);
    setMetaTag('meta[property="og:type"]', 'website');

    // 3. Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', titleText);
    setMetaTag('meta[name="twitter:description"]', descText);
    setMetaTag('meta[name="twitter:url"]', currentUrl);
    setMetaTag('meta[name="twitter:image"]', imageUrl);

  }, [language, activeToolId, activeToolName]);

  const currentContent = content[language];

  const handleSelectTool = (toolId: string) => {
    const basicTool = currentContent.tools.basicTools.find(t => t.id === toolId);
    const aiTool = currentContent.tools.aiTools.find(t => t.id === toolId);
    const imgTool = currentContent.tools.imageTools?.find(t => t.id === toolId);
    const pdfConvTool = currentContent.tools.pdfConversionTools?.find(t => t.id === toolId);
    const name = basicTool?.name || aiTool?.name || imgTool?.name || pdfConvTool?.name || toolId;
    setActiveToolName(name);
    setActiveToolId(toolId);
    updateUrl(language, toolId);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        language={language}
        setLanguage={(newLang) => {
          setLanguage(newLang);
          updateUrl(newLang, activeToolId);
        }}
        content={currentContent.header}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main>
        <Hero content={currentContent.hero} />
        <Features content={currentContent.features} />
        <Tools content={currentContent.tools} onSelectTool={handleSelectTool} language={language} />
        <Languages content={currentContent.languages} />
        <Reviews language={language} />
        <ShareWebsite language={language} />
      </main>
      <Footer content={currentContent.footer} />

      {activeToolId && (
        <ToolPlayground
          toolId={activeToolId}
          toolName={activeToolName}
          language={language}
          onClose={() => {
            setActiveToolId(null);
            updateUrl(language, null);
          }}
        />
      )}
    </div>
  );
};

export default App;
