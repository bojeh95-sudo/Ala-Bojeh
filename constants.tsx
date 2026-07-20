
import React from 'react';
import { Language } from './types';
import type { LanguageContent } from './types';

export { Language };

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);
const NoSymbolIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);


export const content: LanguageContent = {
    [Language.EN]: {
        header: { title: 'PDFProTools', tools: 'Tools', features: 'Features', language: 'Language' },
        hero: {
            title: 'Your Ultimate PDF Solution',
            subtitle: '🚀 Free Online PDF Tools Powered by AI',
            button: 'Explore Tools'
        },
        features: {
            title: '✨ Key Features',
            items: [
                { icon: <CheckIcon />, title: '100% Free', description: 'No hidden costs or subscription fees.' },
                { icon: <CheckIcon />, title: 'No Registration', description: 'Use our tools instantly without signing up.' },
                { icon: <ZapIcon />, title: 'AI-Powered', description: 'Leverage artificial intelligence for smart results.' },
                { icon: <GlobeIcon />, title: 'Multi-Language', description: 'Support for various languages across the globe.' },
                { icon: <LockIcon />, title: 'Fast & Secure', description: 'Your files are processed quickly and privately.' },
                { icon: <NoSymbolIcon />, title: 'No Watermarks', description: 'Download your files clean and unbranded.' }
            ]
        },
        tools: {
            title: '🛠️ Our Tools',
            basicTitle: 'Basic Tools',
            aiTitle: 'AI Tools',
            basicTools: [
                { id: 'merge', name: 'Merge PDF files' },
                { id: 'split', name: 'Split PDF documents' },
                { id: 'compress', name: 'Compress PDF size' },
                { id: 'pdf2word', name: 'PDF to Word converter' },
                { id: 'pdf2excel', name: 'PDF to Excel converter' },
                { id: 'pdf2ppt', name: 'PDF to PowerPoint converter' },
                { id: 'img2pdf', name: 'Image to PDF converter' },
                { id: 'watermark', name: 'Add watermarks' },
                { id: 'protect', name: 'PDF protection' },
                { id: 'rotate', name: 'Rotate PDF pages' },
                { id: 'delete_pages', name: 'Delete PDF pages' },
                { id: 'reorder', name: 'Reorder PDF pages' },
                { id: 'unlock', name: 'Unlock PDF (Remove password)' },
                { id: 'pdf2img', name: 'PDF to JPG converter' },
                { id: 'pdf2png', name: 'PDF to PNG converter' },
                { id: 'pdf2svg', name: 'PDF to SVG converter' },
                { id: 'pdf2html', name: 'PDF to HTML converter' },
                { id: 'pdf2txt', name: 'PDF to Text converter' },
                { id: 'pdf2epub', name: 'PDF to EPUB converter' },
                { id: 'crop', name: 'Crop PDF pages' }
            ],
            aiTools: [
                { id: 'extract', name: 'Smart text extraction' },
                { id: 'summarize', name: 'Automatic PDF summarization' },
                { id: 'translate', name: 'PDF translation' },
                { id: 'ocr', name: 'OCR for scanned documents' },
                { id: 'format', name: 'Intelligent formatting' },
                { id: 'chat', name: 'Chat with PDF (AI Ask & Answer)' },
                { id: 'redact', name: 'Auto-redact sensitive info' },
                { id: 'compare', name: 'Compare PDF versions with AI' }
            ],
            imageTitle: 'Image Conversion',
            imageTools: [
                { id: 'png2webp', name: 'PNG to WEBP' },
                { id: 'jpg2webp', name: 'JPG to WEBP' },
                { id: 'png2heic', name: 'PNG to HEIC' },
                { id: 'jpg2heic', name: 'JPG to HEIC' }
            ],
            pdfConversionTitle: 'Convert to PDF',
            pdfConversionTools: [
                { id: 'docx2pdf', name: 'Word to PDF' },
                { id: 'xlsx2pdf', name: 'Excel to PDF' },
                { id: 'pptx2pdf', name: 'PowerPoint to PDF' },
                { id: 'html2pdf', name: 'HTML to PDF' },
                { id: 'txt2pdf', name: 'Text to PDF' },
                { id: 'rtf2pdf', name: 'RTF to PDF' }
            ],
            additionalTitle: 'Additional Tools',
            additionalTools: [
                { id: 'add_page_numbers', name: 'Add page numbers' },
                { id: 'repair', name: 'Repair damaged PDF' },
                { id: 'flatten', name: 'Flatten PDF layers' },
                { id: 'metadata', name: 'Edit PDF metadata' },
                { id: 'web2pdf', name: 'Convert web page to PDF' },
                { id: 'qrcode', name: 'Generate QR code' }
            ]
        },
        languages: {
            title: '🌍 Supported Languages',
            supported: ['English', 'العربية', 'Español', 'Français']
        },
        footer: {
            visit: 'Visit now: www.pdfprotools.com',
            copyright: '© 2024 PDFProTools. All rights reserved.'
        }
    },
    [Language.AR]: {
        header: { title: 'PDFProTools', tools: 'أدوات', features: 'ميزات', language: 'لغة' },
        hero: {
            title: 'حل PDF النهائي الخاص بك',
            subtitle: '🚀 أدوات PDF مجانية عبر الإنترنت مدعومة بالذكاء الاصطناعي',
            button: 'اكتشف الأدوات'
        },
        features: {
            title: '✨ الميزات الرئيسية',
            items: [
                { icon: <CheckIcon />, title: 'مجاني 100٪', description: 'لا توجد تكاليف خفية أو رسوم اشتراك.' },
                { icon: <CheckIcon />, title: 'لا يتطلب التسجيل', description: 'استخدم أدواتنا على الفور دون تسجيل.' },
                { icon: <ZapIcon />, title: 'مدعوم بالذكاء الاصطناعي', description: 'استفد من الذكاء الاصطناعي للحصول على نتائج ذكية.' },
                { icon: <GlobeIcon />, title: 'متعدد اللغات', description: 'دعم لغات مختلفة حول العالم.' },
                { icon: <LockIcon />, title: 'سريع وآمن', description: 'تتم معالجة ملفاتك بسرعة وخصوصية.' },
                { icon: <NoSymbolIcon />, title: 'بدون علامات مائية', description: 'قم بتنزيل ملفاتك نظيفة وغير موسومة.' }
            ]
        },
        tools: {
            title: '🛠️ أدواتنا',
            basicTitle: 'الأدوات الأساسية',
            aiTitle: 'أدوات الذكاء الاصطناعي',
            basicTools: [
                { id: 'merge', name: 'دمج ملفات PDF' },
                { id: 'split', name: 'تقسيم مستندات PDF' },
                { id: 'compress', name: 'ضغط حجم PDF' },
                { id: 'pdf2word', name: 'تحويل PDF إلى Word' },
                { id: 'pdf2excel', name: 'تحويل PDF إلى Excel' },
                { id: 'pdf2ppt', name: 'تحويل PDF إلى PowerPoint' },
                { id: 'img2pdf', name: 'تحويل الصور إلى PDF' },
                { id: 'watermark', name: 'إضافة علامات مائية' },
                { id: 'protect', name: 'حماية PDF' },
                { id: 'rotate', name: 'تدوير صفحات PDF' },
                { id: 'delete_pages', name: 'حذف صفحات من PDF' },
                { id: 'reorder', name: 'إعادة ترتيب صفحات PDF' },
                { id: 'unlock', name: 'فك حماية PDF (إزالة كلمة السر)' },
                { id: 'pdf2img', name: 'تحويل PDF إلى صور JPG' },
                { id: 'pdf2png', name: 'تحويل PDF إلى صور PNG' },
                { id: 'pdf2svg', name: 'تحويل PDF إلى رسومات متجهة SVG' },
                { id: 'pdf2html', name: 'تحويل PDF إلى صفحة ويب HTML' },
                { id: 'pdf2txt', name: 'تحويل PDF إلى نص خام TXT' },
                { id: 'pdf2epub', name: 'تحويل PDF إلى كتاب إلكتروني EPUB' },
                { id: 'crop', name: 'قص واقتصاص صفحات PDF' }
            ],
            aiTools: [
                { id: 'extract', name: 'استخراج نصوص ذكي' },
                { id: 'summarize', name: 'تلخيص PDF تلقائي' },
                { id: 'translate', name: 'ترجمة PDF' },
                { id: 'ocr', name: 'التعرف الضوئي على الحروف للمستندات الممسوحة ضوئياً' },
                { id: 'format', name: 'تنسيق ذكي' },
                { id: 'chat', name: 'محادثة مع ملف PDF بالذكاء الاصطناعي' },
                { id: 'redact', name: 'إخفاء وتنقية المعلومات الحساسة تلقائياً' },
                { id: 'compare', name: 'مقارنة نسختين من PDF بالذكاء الاصطناعي' }
            ],
            imageTitle: 'تحويل الصور',
            imageTools: [
                { id: 'png2webp', name: 'تحويل PNG إلى WEBP' },
                { id: 'jpg2webp', name: 'تحويل JPG إلى WEBP' },
                { id: 'png2heic', name: 'تحويل PNG إلى HEIC' },
                { id: 'jpg2heic', name: 'تحويل JPG إلى HEIC' }
            ],
            pdfConversionTitle: 'تحويل ملفات إلى PDF',
            pdfConversionTools: [
                { id: 'docx2pdf', name: 'Word إلى PDF' },
                { id: 'xlsx2pdf', name: 'Excel إلى PDF' },
                { id: 'pptx2pdf', name: 'PowerPoint إلى PDF' },
                { id: 'html2pdf', name: 'HTML إلى PDF' },
                { id: 'txt2pdf', name: 'نص إلى PDF' },
                { id: 'rtf2pdf', name: 'RTF إلى PDF' }
            ],
            additionalTitle: 'أدوات إضافية',
            additionalTools: [
                { id: 'add_page_numbers', name: 'إضافة أرقام صفحات' },
                { id: 'repair', name: 'إصلاح ملف PDF تالف' },
                { id: 'flatten', name: 'تسطيح PDF (Flatten)' },
                { id: 'metadata', name: 'تعديل بيانات الملف التعريفية (Metadata)' },
                { id: 'web2pdf', name: 'تحويل صفحة ويب إلى PDF' },
                { id: 'qrcode', name: 'إنشاء رمز QR' }
            ]
        },
        languages: {
            title: '🌍 اللغات المدعومة',
            supported: ['English', 'العربية', 'Español', 'Français']
        },
        footer: {
            visit: 'قم بزيارة الآن: www.pdfprotools.com',
            copyright: '© 2024 PDFProTools. كل الحقوق محفوظة.'
        }
    },
    [Language.ES]: {
        header: { title: 'PDFProTools', tools: 'Herramientas', features: 'Características', language: 'Idioma' },
        hero: {
            title: 'Su solución definitiva para PDF',
            subtitle: '🚀 Herramientas PDF en línea gratuitas impulsadas por IA',
            button: 'Explorar Herramientas'
        },
        features: {
            title: '✨ Características Clave',
            items: [
                { icon: <CheckIcon />, title: '100% Gratis', description: 'Sin costos ocultos ni cuotas de suscripción.' },
                { icon: <CheckIcon />, title: 'Sin registro', description: 'Utilice nuestras herramientas al instante sin registrarse.' },
                { icon: <ZapIcon />, title: 'Impulsado por IA', description: 'Aproveche la inteligencia artificial para obtener resultados inteligentes.' },
                { icon: <GlobeIcon />, title: 'Multi-idioma', description: 'Soporte para varios idiomas en todo el mundo.' },
                { icon: <LockIcon />, title: 'Rápido y Seguro', description: 'Sus archivos se procesan de forma rápida y privada.' },
                { icon: <NoSymbolIcon />, title: 'Sin marcas de agua', description: 'Descargue sus archivos limpios y sin marcas.' }
            ]
        },
        tools: {
            title: '🛠️ Nuestras Herramientas',
            basicTitle: 'Herramientas Básicas',
            aiTitle: 'Herramientas de IA',
            basicTools: [
                { id: 'merge', name: 'Unir archivos PDF' },
                { id: 'split', name: 'Dividir documentos PDF' },
                { id: 'compress', name: 'Comprimir tamaño de PDF' },
                { id: 'pdf2word', name: 'Convertidor de PDF a Word' },
                { id: 'pdf2excel', name: 'Convertidor de PDF a Excel' },
                { id: 'pdf2ppt', name: 'Convertidor de PDF a PowerPoint' },
                { id: 'img2pdf', name: 'Convertidor de imagen a PDF' },
                { id: 'watermark', name: 'Añadir marcas de agua' },
                { id: 'protect', name: 'Protección de PDF' },
                { id: 'rotate', name: 'Rotar páginas de PDF' },
                { id: 'delete_pages', name: 'Eliminar páginas de PDF' },
                { id: 'reorder', name: 'Reordenar páginas de PDF' },
                { id: 'unlock', name: 'Desbloquear PDF (Eliminar contraseña)' },
                { id: 'pdf2img', name: 'Convertidor de PDF a JPG' },
                { id: 'pdf2png', name: 'Convertidor de PDF a PNG' },
                { id: 'pdf2svg', name: 'Convertidor de PDF a SVG' },
                { id: 'pdf2html', name: 'Convertidor de PDF a HTML' },
                { id: 'pdf2txt', name: 'Convertidor de PDF a Texto raw' },
                { id: 'pdf2epub', name: 'Convertidor de PDF a EPUB' },
                { id: 'crop', name: 'Recortar páginas de PDF' }
            ],
            aiTools: [
                { id: 'extract', name: 'Extracción de texto inteligente' },
                { id: 'summarize', name: 'Resumen automático de PDF' },
                { id: 'translate', name: 'Traducción de PDF' },
                { id: 'ocr', name: 'OCR para documentos escaneados' },
                { id: 'format', name: 'Formato inteligente' },
                { id: 'chat', name: 'Chatear con PDF con IA' },
                { id: 'redact', name: 'Ocultar información sensible con IA' },
                { id: 'compare', name: 'Comparar versiones de PDF con IA' }
            ],
            imageTitle: 'Conversión de Imagen',
            imageTools: [
                { id: 'png2webp', name: 'Convertir PNG a WEBP' },
                { id: 'jpg2webp', name: 'Convertir JPG a WEBP' },
                { id: 'png2heic', name: 'Convertir PNG a HEIC' },
                { id: 'jpg2heic', name: 'Convertir JPG a HEIC' }
            ],
            pdfConversionTitle: 'Convertir a PDF',
            pdfConversionTools: [
                { id: 'docx2pdf', name: 'Word a PDF' },
                { id: 'xlsx2pdf', name: 'Excel a PDF' },
                { id: 'pptx2pdf', name: 'PowerPoint a PDF' },
                { id: 'html2pdf', name: 'HTML a PDF' },
                { id: 'txt2pdf', name: 'Texto a PDF' },
                { id: 'rtf2pdf', name: 'RTF a PDF' }
            ],
            additionalTitle: 'Herramientas adicionales',
            additionalTools: [
                { id: 'add_page_numbers', name: 'Agregar números de página' },
                { id: 'repair', name: 'Reparar PDF dañado' },
                { id: 'flatten', name: 'Aplanar capas de PDF' },
                { id: 'metadata', name: 'Editar metadatos de PDF' },
                { id: 'web2pdf', name: 'Convertir página web a PDF' },
                { id: 'qrcode', name: 'Generar código QR' }
            ]
        },
        languages: {
            title: '🌍 Idiomas Soportados',
            supported: ['English', 'العربية', 'Español', 'Français']
        },
        footer: {
            visit: 'Visite ahora: www.pdfprotools.com',
            copyright: '© 2024 PDFProTools. Todos los derechos reservados.'
        }
    },
    [Language.FR]: {
        header: { title: 'PDFProTools', tools: 'Outils', features: 'Fonctionnalités', language: 'Langue' },
        hero: {
            title: 'Votre solution PDF ultime',
            subtitle: '🚀 Outils PDF en ligne gratuits alimentés par l\'IA',
            button: 'Explorer les outils'
        },
        features: {
            title: '✨ Fonctionnalités Clés',
            items: [
                { icon: <CheckIcon />, title: '100% Gratuit', description: 'Aucun coût caché ni frais d\'abonnement.' },
                { icon: <CheckIcon />, title: 'Aucune inscription', description: 'Utilisez nos outils instantanément sans vous inscrire.' },
                { icon: <ZapIcon />, title: 'Alimenté par l\'IA', description: 'Tirez parti de l\'intelligence artificielle pour des résultats intelligents.' },
                { icon: <GlobeIcon />, title: 'Multi-langue', description: 'Prise en charge de différentes langues à travers le monde.' },
                { icon: <LockIcon />, title: 'Rapide et Sécurisé', description: 'Vos fichiers sont traités rapidement et en toute confidentialité.' },
                { icon: <NoSymbolIcon />, title: 'Sans filigrane', description: 'Téléchargez vos fichiers propres et sans marque.' }
            ]
        },
        tools: {
            title: '🛠️ Nos Outils',
            basicTitle: 'Outils de Base',
            aiTitle: 'Outils d\'IA',
            basicTools: [
                { id: 'merge', name: 'Fusionner des fichiers PDF' },
                { id: 'split', name: 'Diviser des documents PDF' },
                { id: 'compress', name: 'Compresser la taille du PDF' },
                { id: 'pdf2word', name: 'Convertisseur PDF vers Word' },
                { id: 'pdf2excel', name: 'Convertisseur PDF vers Excel' },
                { id: 'pdf2ppt', name: 'Convertisseur PDF vers PowerPoint' },
                { id: 'img2pdf', name: 'Convertisseur d\'image en PDF' },
                { id: 'watermark', name: 'Ajouter des filigranes' },
                { id: 'protect', name: 'Protection PDF' },
                { id: 'rotate', name: 'Pivoter les pages PDF' },
                { id: 'delete_pages', name: 'Supprimer des pages PDF' },
                { id: 'reorder', name: 'Réorganiser les pages PDF' },
                { id: 'unlock', name: 'Déverrouiller le PDF (Supprimer le mot de passe)' },
                { id: 'pdf2img', name: 'Convertisseur PDF en JPG' },
                { id: 'pdf2png', name: 'Convertisseur PDF vers PNG' },
                { id: 'pdf2svg', name: 'Convertisseur PDF vers SVG' },
                { id: 'pdf2html', name: 'Convertisseur PDF vers HTML' },
                { id: 'pdf2txt', name: 'Convertisseur PDF vers Texte brut' },
                { id: 'pdf2epub', name: 'Convertisseur PDF vers EPUB' },
                { id: 'crop', name: 'Rogner les pages PDF' }
            ],
            aiTools: [
                { id: 'extract', name: 'Extraction de texte intelligente' },
                { id: 'summarize', name: 'Résumé automatique de PDF' },
                { id: 'translate', name: 'Traduction de PDF' },
                { id: 'ocr', name: 'OCR pour les documents numérisés' },
                { id: 'format', name: 'Mise en forme intelligente' },
                { id: 'chat', name: 'Discuter avec le PDF par l\'IA' },
                { id: 'redact', name: 'Masquer les infos sensibles par l\'IA' },
                { id: 'compare', name: 'Comparer les versions PDF par l\'IA' }
            ],
            imageTitle: 'Conversion d\'Image',
            imageTools: [
                { id: 'png2webp', name: 'Convertir PNG en WEBP' },
                { id: 'jpg2webp', name: 'Convertir JPG en WEBP' },
                { id: 'png2heic', name: 'Convertir PNG en HEIC' },
                { id: 'jpg2heic', name: 'Convertir JPG en HEIC' }
            ],
            pdfConversionTitle: 'Convertir en PDF',
            pdfConversionTools: [
                { id: 'docx2pdf', name: 'Word en PDF' },
                { id: 'xlsx2pdf', name: 'Excel en PDF' },
                { id: 'pptx2pdf', name: 'PowerPoint en PDF' },
                { id: 'html2pdf', name: 'HTML en PDF' },
                { id: 'txt2pdf', name: 'Texte en PDF' },
                { id: 'rtf2pdf', name: 'RTF en PDF' }
            ],
            additionalTitle: 'Outils supplémentaires',
            additionalTools: [
                { id: 'add_page_numbers', name: 'Ajouter des numéros de page' },
                { id: 'repair', name: 'Réparer un PDF endommagé' },
                { id: 'flatten', name: 'Aplatir les calques PDF' },
                { id: 'metadata', name: 'Modifier les métadonnées PDF' },
                { id: 'web2pdf', name: 'Convertir une page Web en PDF' },
                { id: 'qrcode', name: 'Générer un code QR' }
            ]
        },
        languages: {
            title: '🌍 Langues Prises en Charge',
            supported: ['English', 'العربية', 'Español', 'Français']
        },
        footer: {
            visit: 'Visitez maintenant : www.pdfprotools.com',
            copyright: '© 2024 PDFProTools. Tous droits réservés.'
        }
    }
};
