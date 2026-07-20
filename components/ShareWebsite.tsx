import React, { useState } from 'react';
import { Link, Check } from 'lucide-react';
import { Language } from '../types';

interface ShareWebsiteProps {
  language: Language;
}

const TRANSLATIONS: Record<string, any> = {
  [Language.EN]: {
    title: 'Share the website with your friends',
    defaultText: 'Free & easy-to-use PDF tools - Merge, split, convert, compress, and edit PDFs online!',
    copySuccess: 'Link copied to clipboard!',
    copyTooltip: 'Copy Link',
    shareVia: 'Share via {platform}',
  },
  [Language.AR]: {
    title: 'شارك الموقع مع أصدقائك',
    defaultText: 'أدوات PDF مجانية وسهلة الاستخدام - دمج، تقسيم، تحويل، ضغط، وتعديل ملفات PDF أونلاين!',
    copySuccess: 'تم نسخ الرابط بنجاح!',
    copyTooltip: 'نسخ الرابط',
    shareVia: 'مشاركة عبر {platform}',
  },
  [Language.ES]: {
    title: 'Comparte el sitio web con tus amigos',
    defaultText: '¡Herramientas PDF gratuitas y fáciles de usar: une, divide, convierte, comprime y edita PDF en línea!',
    copySuccess: '¡Enlace copiado al portapapeles!',
    copyTooltip: 'Copiar enlace',
    shareVia: 'Compartir por {platform}',
  },
  [Language.FR]: {
    title: 'Partagez le site web avec vos amis',
    defaultText: 'Outils PDF gratuits et simples d\'utilisation - Fusionner, diviser, convertir, compresser et éditer des PDF en ligne !',
    copySuccess: 'Lien copié dans le presse-papiers !',
    copyTooltip: 'Copier le lien',
    shareVia: 'Partager via {platform}',
  }
};

export const ShareWebsite: React.FC<ShareWebsiteProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS[Language.EN];
  const [showCopied, setShowCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return 'https://pdfprotools.com';
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(t.defaultText);
    let shareLink = '';

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'telegram':
        shareLink = `https://t.telegram.me/share?url=${url}&text=${text}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer,width=600,height=450');
    }
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <section id="share-section" className="py-14 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/40">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Title */}
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-6 tracking-tight sm:text-2xl">
          {t.title}
        </h3>

        {/* Buttons Flex Container */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          {/* WhatsApp */}
          <button
            id="share-whatsapp"
            onClick={() => handleShare('whatsapp')}
            title={t.shareVia.replace('{platform}', 'WhatsApp')}
            className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.017-5.09-2.868-6.944-1.851-1.854-4.312-2.876-6.932-2.877-5.446 0-9.871 4.414-9.875 9.833-.001 1.737.478 3.427 1.386 4.931l-.983 3.597 3.684-.962zm11.534-7.054c-.315-.158-1.86-.918-2.148-1.023-.289-.104-.499-.158-.709.158-.21.315-.813 1.023-.997 1.233-.183.21-.367.236-.682.079-.315-.158-1.33-.49-2.534-1.562-.937-.836-1.57-1.87-1.753-2.185-.183-.315-.02-.486.138-.643.142-.143.315-.368.473-.551.158-.184.21-.315.315-.526.105-.21.053-.394-.026-.552-.079-.158-.709-1.708-.971-2.34-.255-.612-.513-.529-.709-.538-.182-.008-.394-.01-.604-.01-.21 0-.552.079-.841.394-.289.315-1.103 1.077-1.103 2.629 0 1.551 1.129 3.048 1.287 3.259.158.21 2.222 3.393 5.381 4.758.752.325 1.338.519 1.796.665.755.24 1.442.206 1.986.125.606-.09 1.86-.761 2.122-1.458.263-.697.263-1.293.184-1.42-.079-.126-.289-.21-.604-.368z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button
            id="share-facebook"
            onClick={() => handleShare('facebook')}
            title={t.shareVia.replace('{platform}', 'Facebook')}
            className="w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          {/* Twitter / X */}
          <button
            id="share-twitter"
            onClick={() => handleShare('twitter')}
            title={t.shareVia.replace('{platform}', 'X / Twitter')}
            className="w-12 h-12 rounded-full bg-[#000000] hover:bg-[#1a1a1a] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>

          {/* Telegram */}
          <button
            id="share-telegram"
            onClick={() => handleShare('telegram')}
            title={t.shareVia.replace('{platform}', 'Telegram')}
            className="w-12 h-12 rounded-full bg-[#26A5E4] hover:bg-[#2294cd] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 12 12 6.656 0 12-5.344 12-12 0-6.656-5.344-12-12-12zm5.888 8.16l-1.984 9.344c-.144.656-.544.816-1.088.512l-3.04-2.24-1.472 1.424c-.16.16-.288.288-.592.288l.224-3.136 5.728-5.184c.24-.224-.048-.352-.368-.128L8.144 13.52l-3.04-.96c-.656-.208-.672-.656.144-.976l11.888-4.576c.544-.208 1.024.112.808 1.152z"/>
            </svg>
          </button>

          {/* Copy Link */}
          <div className="relative">
            <button
              id="share-copylink"
              onClick={handleCopyLink}
              title={t.copyTooltip}
              className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer ${
                showCopied 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {showCopied ? (
                <Check className="w-5 h-5 animate-bounce" strokeWidth={3} />
              ) : (
                <Link className="w-5 h-5" strokeWidth={2.5} />
              )}
            </button>

            {/* Notification Bubble */}
            {showCopied && (
              <div 
                id="copy-notification"
                className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap animate-fade-in z-50 border border-transparent dark:border-slate-700"
              >
                {t.copySuccess}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
