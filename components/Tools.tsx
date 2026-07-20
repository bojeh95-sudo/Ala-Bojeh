import React, { useState } from 'react';
import { Language } from '../types';
import type { Content, Tool } from '../types';
import {
  Combine,
  Scissors,
  Minimize2,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image,
  Copyright,
  Lock,
  RotateCw,
  Trash2,
  ArrowDownUp,
  Unlock,
  Images,
  Crop,
  Sparkles,
  BookOpen,
  Languages,
  ScanLine,
  Paintbrush,
  MessageSquare,
  EyeOff,
  GitCompare,
  Globe,
  Hash,
  Wrench,
  Layers,
  Tags,
  QrCode
} from 'lucide-react';

interface ToolsProps {
  content: Content['tools'];
  onSelectTool: (toolId: string) => void;
  language: Language;
}

// -------------------------------------------------------------
// Bidirectional Keyboard Layout Translation Mapping
// -------------------------------------------------------------
const ENG_TO_ARB: Record<string, string> = {
  'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'د',
  'a': 'ش', 's': 'س', 'd': 'ي', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ك', "'": 'ط',
  'z': 'ئ', 'x': 'ء', 'c': 'ؤ', 'v': 'ر', 'b': 'لا', 'n': 'ى', 'm': 'ة', ',': 'و', '.': 'ز', '/': 'ظ',
  '`': 'ذ',
  'Q': 'َ', 'W': 'ً', 'E': 'ُ', 'R': 'ٌ', 'T': 'لإ', 'Y': 'إ', 'U': '`', 'I': '÷', 'O': '×', 'P': '؛',
  'A': 'ِ', 'S': 'ٍ', 'D': '[', 'F': ']', 'G': 'لأ', 'H': 'أ', 'J': 'ـ', 'K': '،', 'L': '/',
  'Z': '~', 'X': 'ْ', 'C': '}', 'V': '{', 'B': 'لآ', 'N': 'آ', 'M': '’', '<': 'و', '>': 'ز', '?': 'ظ'
};

const ARB_TO_ENG: Record<string, string> = {
  'ض': 'q', 'ص': 'w', 'ث': 'e', 'ق': 'r', 'ف': 't', 'غ': 'y', 'ع': 'u', 'ه': 'i', 'خ': 'o', 'ح': 'p', 'ج': '[', 'د': ']',
  'ش': 'a', 'س': 's', 'ي': 'd', 'ب': 'f', 'ل': 'g', 'ا': 'h', 'ت': 'j', 'ن': 'k', 'م': 'l', 'ك': ';', 'ط': "'",
  'ئ': 'z', 'ء': 'x', 'ؤ': 'c', 'ر': 'v', 'ى': 'n', 'ة': 'm', 'و': ',', 'ز': '.', 'ظ': '/',
  'ذ': '`',
  'َ': 'Q', 'ً': 'W', 'ُ': 'E', 'ٌ': 'R', 'لإ': 'T', 'إ': 'Y', '÷': 'I', '×': 'O', '؛': 'P',
  'ِ': 'A', 'ٍ': 'S', 'لأ': 'G', 'أ': 'H', 'ـ': 'J', '،': 'K',
  'ْ': 'X', 'لآ': 'B', 'آ': 'N', '’': 'M'
};

function translateLayout(text: string): string {
  let arabicCount = 0;
  let englishCount = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0x0600 && code <= 0x06FF) {
      arabicCount++;
    } else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      englishCount++;
    }
  }

  let result = '';
  if (arabicCount >= englishCount) {
    let normalized = text.replace(/\uFEFB|\uFEFC|\uFEF7|\uFEF8|\uFEF9|\uFEFA/g, 'لا');
    normalized = normalized.replace(/لا/g, 'b');

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      result += ARB_TO_ENG[char] || char;
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += ENG_TO_ARB[char] || char;
    }
  }
  return result;
}

// Localized strings for search components
const SEARCH_LABELS: Record<string, { placeholder: string; didYouMean: string; noResults: string; clear: string }> = {
  en: {
    placeholder: 'Search for a tool (e.g., merge, split, compress, ocr...)',
    didYouMean: 'Did you mean:',
    noResults: 'No tools matched your search query.',
    clear: 'Clear search'
  },
  ar: {
    placeholder: 'ابحث عن أداة (مثال: دمج، تقسيم، ضغط، ocr...)',
    didYouMean: 'هل تقصد:',
    noResults: 'لم يتم العثور على أي أدوات تطابق بحثك.',
    clear: 'مسح البحث'
  },
  es: {
    placeholder: 'Buscar una herramienta (ej. unir, dividir, comprimir, ocr...)',
    didYouMean: '¿Quiso decir:',
    noResults: 'No se encontraron herramientas que coincidan con su búsqueda.',
    clear: 'Limpiar búsqueda'
  },
  fr: {
    placeholder: 'Rechercher un outil (ex. fusionner, diviser, compresser, ocr...)',
    didYouMean: 'Vouliez-vous dire :',
    noResults: 'Aucun outil ne correspond à votre recherche.',
    clear: 'Effacer la recherche'
  }
};

// Category translation labels
const CATEGORY_LABELS: Record<string, Array<{ id: string; name: string }>> = {
  en: [
    { id: 'all', name: 'All' },
    { id: 'convert', name: 'PDF Conversion' },
    { id: 'pdf_convert', name: 'Convert to PDF' },
    { id: 'image_convert', name: 'Image Conversion' },
    { id: 'organize', name: 'Merge & Split' },
    { id: 'edit', name: 'Edit & Organize' },
    { id: 'security', name: 'Security & Protection' },
    { id: 'ai', name: 'AI Tools' },
  ],
  ar: [
    { id: 'all', name: 'الكل' },
    { id: 'convert', name: 'تحويل PDF' },
    { id: 'pdf_convert', name: 'تحويل إلى PDF' },
    { id: 'image_convert', name: 'تحويل الصور' },
    { id: 'organize', name: 'دمج وتقسيم' },
    { id: 'edit', name: 'تعديل وتنظيم' },
    { id: 'security', name: 'حماية وأمان' },
    { id: 'ai', name: 'أدوات الذكاء الاصطناعي' },
  ],
  es: [
    { id: 'all', name: 'Todo' },
    { id: 'convert', name: 'Conversión PDF' },
    { id: 'pdf_convert', name: 'Convertir a PDF' },
    { id: 'image_convert', name: 'Conversión de Imagen' },
    { id: 'organize', name: 'Unir y Dividir' },
    { id: 'edit', name: 'Editar y Organizar' },
    { id: 'security', name: 'Seguridad y Protección' },
    { id: 'ai', name: 'Herramientas de IA' },
  ],
  fr: [
    { id: 'all', name: 'Tout' },
    { id: 'convert', name: 'Conversion PDF' },
    { id: 'pdf_convert', name: 'Convertir en PDF' },
    { id: 'image_convert', name: 'Conversion d\'Image' },
    { id: 'organize', name: 'Fusionner et Diviser' },
    { id: 'edit', name: 'Modifier et Organiser' },
    { id: 'security', name: 'Sécurité et Protection' },
    { id: 'ai', name: 'Outils d\'IA' },
  ],
};

// Helpful switch notification labels
const NOTIFICATIONS: Record<string, { switchCategory: string; showAll: string }> = {
  en: {
    switchCategory: "We found matching tools in other categories.",
    showAll: "Show in 'All'"
  },
  ar: {
    switchCategory: "وجدنا أدوات مطابقة في تصنيفات أخرى.",
    showAll: "عرض في 'الكل'"
  },
  es: {
    switchCategory: "Encontramos herramientas coincidentes en otras categorías.",
    showAll: "Mostrar en 'Todo'"
  },
  fr: {
    switchCategory: "Nous avons trouvé des outils correspondants dans d'autres catégories.",
    showAll: "Afficher dans 'Tout'"
  }
};

interface ToolConfig {
  category: string;
  icon: React.ComponentType<any>;
  iconBg: string;
  descriptions: Record<string, string>;
}

// -------------------------------------------------------------
// Comprehensive Tools Configurations & Localization Info
// -------------------------------------------------------------
const TOOL_CONFIGS: Record<string, ToolConfig> = {
  merge: {
    category: 'organize',
    icon: Combine,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Combine multiple PDF files into a single, organized document.',
      ar: 'دمج عدة ملفات PDF في مستند واحد منظم وبترتيب مخصص.',
      es: 'Combine varios archivos PDF en un solo documento organizado.',
      fr: 'Combinez plusieurs fichiers PDF en un seul document organisé.'
    }
  },
  split: {
    category: 'organize',
    icon: Scissors,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Extract specific pages or split a PDF into multiple separate files.',
      ar: 'استخراج صفحات معينة أو تقسيم ملف PDF إلى عدة ملفات منفصلة.',
      es: 'Extraiga páginas específicas o divida un PDF en varios archivos independientes.',
      fr: 'Extrayez des pages spécifiques ou divisez un PDF en plusieurs fichiers séparés.'
    }
  },
  compress: {
    category: 'edit',
    icon: Minimize2,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Reduce the file size of your PDF while maintaining optimal visual quality.',
      ar: 'تقليل حجم ملف PDF مع الحفاظ على أفضل جودة بصرية ممكنة للصور والنصوص.',
      es: 'Reduzca el tamaño de su PDF manteniendo una calidad visual óptima.',
      fr: 'Réduisez la taille de votre PDF tout en conservant une qualité visuelle optimale.'
    }
  },
  pdf2word: {
    category: 'convert',
    icon: FileText,
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/60',
    descriptions: {
      en: 'Convert PDF files into fully editable Microsoft Word documents.',
      ar: 'تحويل ملفات PDF إلى مستندات Microsoft Word قابلة للتعديل بالكامل.',
      es: 'Convierta archivos PDF en documentos editables de Microsoft Word.',
      fr: 'Convertissez des fichiers PDF en documents Microsoft Word entièrement modifiables.'
    }
  },
  pdf2excel: {
    category: 'convert',
    icon: FileSpreadsheet,
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/60',
    descriptions: {
      en: 'Extract PDF tables and data into Microsoft Excel spreadsheets.',
      ar: 'استخراج جداول وبيانات PDF وتحويلها إلى جداول بيانات Microsoft Excel.',
      es: 'Extraiga tablas y datos de PDF a hojas de cálculo de Microsoft Excel.',
      fr: 'Extrayez les tableaux et les données PDF vers des feuilles de calcul Microsoft Excel.'
    }
  },
  pdf2ppt: {
    category: 'convert',
    icon: Presentation,
    iconBg: 'bg-orange-50 text-orange-600 border border-orange-100/60',
    descriptions: {
      en: 'Turn your PDF documents into interactive, editable PowerPoint presentations.',
      ar: 'حول مستندات PDF إلى عروض تقديمية تفاعلية وقابلة للتعديل في PowerPoint.',
      es: 'Convierta sus documentos PDF en presentaciones de PowerPoint editables.',
      fr: 'Transformez vos documents PDF en présentations PowerPoint éditables.'
    }
  },
  img2pdf: {
    category: 'pdf_convert',
    icon: Image,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Convert JPG, PNG, and other image formats into a clean PDF file.',
      ar: 'تحويل ملفات الصور (JPG, PNG وغيرها) إلى ملف PDF نظيف ومنسق.',
      es: 'Convierta JPG, PNG y otros formatos de imagen en un archivo PDF limpio.',
      fr: 'Convertissez des images JPG, PNG et autres formats en un fichier PDF propre.'
    }
  },
  watermark: {
    category: 'edit',
    icon: Copyright,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Add text or image watermarks to protect and brand your PDF documents.',
      ar: 'أضف علامات مائية نصية أو صور لحماية حقوقك وإبراز هويتك على مستنداتك.',
      es: 'Agregue marcas de agua de texto o imagen para proteger sus documentos PDF.',
      fr: 'Ajoutez des filigranes de texte ou d\'image pour protéger vos documents PDF.'
    }
  },
  protect: {
    category: 'security',
    icon: Lock,
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    descriptions: {
      en: 'Encrypt and restrict permissions on your PDF with a strong password.',
      ar: 'تشفير وتقييد أذونات ملف الـ PDF الخاص بك بكلمة مرور قوية وآمنة.',
      es: 'Cifre y restrinja los permisos de su PDF con una contraseña segura.',
      fr: 'Chiffrez et restreignez les autorisations sur votre PDF avec un mot de passe fort.'
    }
  },
  rotate: {
    category: 'edit',
    icon: RotateCw,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Rotate specific or all pages in your PDF to correct their orientation.',
      ar: 'تدوير صفحات معينة أو جميع صفحات ملف PDF لتصحيح اتجاهها وبشكل فوري.',
      es: 'Gire páginas específicas o todas en su PDF para corregir su orientación.',
      fr: 'Faites pivotez des pages spécifiques ou toutes les pages de votre PDF.'
    }
  },
  delete_pages: {
    category: 'edit',
    icon: Trash2,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Remove unnecessary pages from your PDF file to keep it concise.',
      ar: 'إزالة الصفحات غير الضرورية من ملف الـ PDF لتوفير المساحة وإبقاءه موجزاً.',
      es: 'Elimine las páginas innecesarias de su archivo PDF para mantenerlo conciso.',
      fr: 'Supprimez les pages inutiles de votre fichier PDF pour le garder concis.'
    }
  },
  reorder: {
    category: 'edit',
    icon: ArrowDownUp,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Rearrange the sequence of pages in your PDF document with ease.',
      ar: 'أعد ترتيب تسلسل صفحات مستند PDF الخاص بك بسهولة ويسر تام.',
      es: 'Reorganice la secuencia de páginas en su documento PDF con facilidad.',
      fr: 'Réorganisez facilement l\'ordre des pages de votre document PDF.'
    }
  },
  unlock: {
    category: 'security',
    icon: Unlock,
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    descriptions: {
      en: 'Remove passwords and restrictions from secured PDF documents.',
      ar: 'إزالة كلمات المرور والقيود الأمنية من مستندات PDF المحمية بنقرة واحدة.',
      es: 'Elimine contraseñas y restricciones de documentos PDF asegurados.',
      fr: 'Supprimez les mots de passe et les restrictions des documents PDF sécurisés.'
    }
  },
  pdf2img: {
    category: 'convert',
    icon: Images,
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100/60',
    descriptions: {
      en: 'Extract images or convert PDF pages into high-quality JPG files.',
      ar: 'استخراج الصور المضمنة أو تحويل صفحات PDF بالكامل لصور JPG عالية الجودة.',
      es: 'Extraiga imágenes o convierta páginas de PDF en archivos JPG de alta calidad.',
      fr: 'Extrayez des images ou convertissez des pages PDF en fichiers JPG de haute qualité.'
    }
  },
  pdf2png: {
    category: 'convert',
    icon: Image,
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100/60',
    descriptions: {
      en: 'Extract or convert PDF pages into high-quality PNG images with transparency support.',
      ar: 'استخراج صفحات PDF كصور PNG عالية الدقة مع دعم الخلفية الشفافة.',
      es: 'Extraiga o convierta páginas de PDF en imágenes PNG de alta calidad con soporte de transparencia.',
      fr: 'Extrayez ou convertissez des pages PDF en images PNG de haute qualité.'
    }
  },
  pdf2svg: {
    category: 'convert',
    icon: Images,
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    descriptions: {
      en: 'Convert PDF pages into scalable vector graphics (SVG) for perfect rendering at any size.',
      ar: 'تحويل صفحات PDF إلى رسومات متجهة SVG قابلة للتكبير دون خسارة الدقة.',
      es: 'Convierta páginas PDF en gráficos vectoriales escalables (SVG) para un renderizado perfecto.',
      fr: 'Convertissez les pages PDF en graphiques vectoriels adaptatifs (SVG).'
    }
  },
  pdf2html: {
    category: 'convert',
    icon: Globe,
    iconBg: 'bg-sky-50 text-sky-600 border border-sky-100/60',
    descriptions: {
      en: 'Convert your PDF documents into interactive HTML web pages retaining visual styling.',
      ar: 'تحويل محتوى مستندات PDF إلى صفحات ويب HTML تفاعلية مع الحفاظ على التنسيق والنمط.',
      es: 'Convierta sus documentos PDF en páginas web HTML interactivas que conserven el estilo visual.',
      fr: 'Convertissez vos documents PDF en pages web HTML interactives.'
    }
  },
  pdf2txt: {
    category: 'convert',
    icon: FileText,
    iconBg: 'bg-slate-50 text-slate-600 border border-slate-100/60',
    descriptions: {
      en: 'Extract raw plain text from any PDF document and save it as a clean .txt file.',
      ar: 'استخراج النص الخام فقط من أي مستند PDF وحفظه كملف .txt نظيف.',
      es: 'Extraiga texto plano de cualquier documento PDF y guárdelo como un archivo .txt limpio.',
      fr: 'Extrayez le texte brut de n\'importe quel document PDF et enregistrez-le sous forme de fichier .txt.'
    }
  },
  pdf2epub: {
    category: 'convert',
    icon: BookOpen,
    iconBg: 'bg-pink-50 text-pink-600 border border-pink-100/60',
    descriptions: {
      en: 'Convert PDF eBooks and textbooks into highly readable and reflowable EPUB format.',
      ar: 'تحويل كتب ومستندات PDF إلى صيغة EPUB التفاعلية والمريحة للقراءة للهواتف والقارئ الإلكتروني.',
      es: 'Convierta libros electrónicos y textos PDF en formato EPUB altamente legible y adaptable.',
      fr: 'Convertissez des livres électroniques PDF au format EPUB hautement lisible.'
    }
  },
  crop: {
    category: 'edit',
    icon: Crop,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Crop margins and select custom page dimensions for your PDF files.',
      ar: 'قص هوامش الصفحات وتحديد أبعاد مخصصة لملفات PDF بدقة.',
      es: 'Recorte los márgenes y seleccione dimensiones de página personalizadas.',
      fr: 'Roguez les marges et sélectionnez des dimensions de page personnalisées.'
    }
  },
  extract: {
    category: 'ai',
    icon: Sparkles,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Use AI to extract precise structured text, key-value pairs, and data from PDFs.',
      ar: 'استخدم الذكاء الاصطناعي لاستخراج نصوص منظمة ومفاهيم أساسية من ملفاتك.',
      es: 'Utilice la IA para extraer texto estructurado, pares clave-valor y datos de PDFs.',
      fr: 'Utilisez l\'IA pour extraire du texte structuré, des paires clé-valeur et des données des PDF.'
    }
  },
  summarize: {
    category: 'ai',
    icon: BookOpen,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Summarize long PDF papers and books into concise, structured bullet points instantly.',
      ar: 'لخّص الأوراق والكتب الطويلة في نقاط مخصصة ومنظمة ومفهومة فوراً.',
      es: 'Resuma documentos PDF largos y libros en viñetas concisas de forma instantánea.',
      fr: 'Résumez instantanément de longs documents PDF et des livres en puces concises.'
    }
  },
  translate: {
    category: 'ai',
    icon: Languages,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Translate PDF documents to multiple languages while keeping original layout structure.',
      ar: 'ترجمة مستندات PDF إلى لغات متعددة مع الحفاظ على التنسيق والفقرات الأصلية.',
      es: 'Traduzca documentos PDF a varios idiomas manteniendo el diseño original.',
      fr: 'Traduisez des documents PDF en plusieurs langues tout en conservant la mise en page.'
    }
  },
  ocr: {
    category: 'ai',
    icon: ScanLine,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Convert scanned and non-selectable PDFs or images into fully selectable text.',
      ar: 'تحويل ملفات PDF الممسوحة ضوئياً والصور إلى نصوص قابلة للتحديد والنسخ بالكامل.',
      es: 'Convierta PDFs escaneados o imágenes en texto completamente seleccionable.',
      fr: 'Convertissez des PDF numérisés ou des images en texte entièrement sélectionnable.'
    }
  },
  format: {
    category: 'ai',
    icon: Paintbrush,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Perfect the design and structure of your documents with AI-powered alignment.',
      ar: 'حسّن تصميم مستنداتك وتناسق الفقرات عبر محاذاة ذكية بلمسة واحدة.',
      es: 'Perfeccione el diseño de sus documentos con alineación inteligente por IA.',
      fr: 'Perfectionnez la mise en page de vos documents avec un alignement intelligent.'
    }
  },
  chat: {
    category: 'ai',
    icon: MessageSquare,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Interactive chatbot to ask questions and find details inside your uploaded PDF.',
      ar: 'تحدث مع مستندك، واطرح الأسئلة، وابحث عن التفاصيل داخل ملف الـ PDF بسهولة.',
      es: 'Chatbot interactivo para hacer preguntas y encontrar detalles en su PDF.',
      fr: 'Chatbot interactif pour poser des questions et trouver des détails dans votre PDF.'
    }
  },
  redact: {
    category: 'ai',
    icon: EyeOff,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Automatically detect and black out emails, phone numbers, and private info via AI.',
      ar: 'تحديد وحجب الإيميلات وأرقام الهواتف والمعلومات الحساسة في ملفاتك تلقائياً.',
      es: 'Detecte y oculte correos, teléfonos e información privada automáticamente mediante IA.',
      fr: 'Détectez et masquez automatiquement les e-mails, téléphones et infos privées par l\'IA.'
    }
  },
  compare: {
    category: 'ai',
    icon: GitCompare,
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    descriptions: {
      en: 'Compare two versions of a PDF document to highlight textual differences instantly.',
      ar: 'مقارنة نسختين مختلفة من مستند PDF وإبراز التعديلات والفروقات بنقرة واحدة.',
      es: 'Compare dos versiones de un documento PDF para resaltar diferencias de texto.',
      fr: 'Comparez deux versions d\'un document PDF pour surligner les différences de texte.'
    }
  },
  png2webp: {
    category: 'image_convert',
    icon: Image,
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/60',
    descriptions: {
      en: 'Convert PNG images to WEBP format for optimal speed and size.',
      ar: 'تحويل صور PNG إلى صيغة WEBP لتقليل الحجم وتسريع التحميل.',
      es: 'Convierta imágenes PNG al formato WEBP para una velocidad y tamaño óptimos.',
      fr: 'Convertissez des images PNG au format WEBP pour une vitesse et une taille optimales.'
    }
  },
  jpg2webp: {
    category: 'image_convert',
    icon: Image,
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100/60',
    descriptions: {
      en: 'Convert JPG images to WEBP format for modern, efficient compression.',
      ar: 'تحويل صور JPG إلى صيغة WEBP لضغط عصري وموفر للمساحة.',
      es: 'Convierta imágenes JPG al formato WEBP para una compresión moderna y eficiente.',
      fr: 'Convertissez des images JPG au format WEBP pour une compression moderne et efficace.'
    }
  },
  png2heic: {
    category: 'image_convert',
    icon: Images,
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    descriptions: {
      en: 'Convert PNG images to highly compressed HEIC format.',
      ar: 'تحويل صور PNG إلى صيغة HEIC عالية الضغط والفعالية.',
      es: 'Convierta imágenes PNG al formato HEIC altamente comprimido.',
      fr: 'Convertissez des images PNG au format HEIC hautement compressé.'
    }
  },
  jpg2heic: {
    category: 'image_convert',
    icon: Images,
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100/60',
    descriptions: {
      en: 'Convert JPG images to HEIC format for advanced modern file storage.',
      ar: 'تحويل صور JPG إلى صيغة HEIC لتخزين متقدم وفعال للملفات.',
      es: 'Convierta imágenes JPG al formato HEIC para un almacenamiento de archivos avanzado.',
      fr: 'Convertissez des images JPG au format HEIC pour un stockage de fichiers avancé.'
    }
  },
  docx2pdf: {
    category: 'pdf_convert',
    icon: FileText,
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/60',
    descriptions: {
      en: 'Convert Word documents (.docx/.doc) to high-quality PDF files.',
      ar: 'تحويل ملفات Word (.docx/.doc) إلى ملفات PDF مع الحفاظ على التنسيق والفقرات.',
      es: 'Convierta documentos de Word (.docx/.doc) en archivos PDF de alta calidad.',
      fr: 'Convertissez des documents Word (.docx/.doc) en fichiers PDF de haute qualité.'
    }
  },
  xlsx2pdf: {
    category: 'pdf_convert',
    icon: FileSpreadsheet,
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/60',
    descriptions: {
      en: 'Convert Excel sheets (.xlsx/.xls) to clean PDF layout pages.',
      ar: 'تحويل جداول Excel (.xlsx/.xls) إلى جداول PDF منسقة ومقروءة.',
      es: 'Convierta hojas de Excel (.xlsx/.xls) en páginas PDF limpias.',
      fr: 'Convertissez des feuilles Excel (.xlsx/.xls) en pages PDF propres.'
    }
  },
  pptx2pdf: {
    category: 'pdf_convert',
    icon: Presentation,
    iconBg: 'bg-orange-50 text-orange-600 border border-orange-100/60',
    descriptions: {
      en: 'Convert PowerPoint presentations (.pptx/.ppt) to PDF format.',
      ar: 'تحويل عروض PowerPoint التقديمية (.pptx/.ppt) إلى ملفات PDF.',
      es: 'Convierta presentaciones de PowerPoint (.pptx/.ppt) al formato PDF.',
      fr: 'Convertissez des présentations PowerPoint (.pptx/.ppt) au format PDF.'
    }
  },
  html2pdf: {
    category: 'pdf_convert',
    icon: Globe,
    iconBg: 'bg-sky-50 text-sky-600 border border-sky-100/60',
    descriptions: {
      en: 'Convert web pages (via URL) or raw HTML files into styled PDFs.',
      ar: 'تحويل صفحات الويب (عبر رابط URL) أو ملفات HTML إلى ملفات PDF منسقة.',
      es: 'Convierta páginas web (a través de URL) o archivos HTML en PDFs con estilo.',
      fr: 'Convertissez des pages Web (via URL) ou des fichiers HTML en PDF stylisés.'
    }
  },
  txt2pdf: {
    category: 'pdf_convert',
    icon: FileText,
    iconBg: 'bg-slate-50 text-slate-600 border border-slate-100/60',
    descriptions: {
      en: 'Convert plain text (.txt) files into well-formatted PDFs.',
      ar: 'تحويل ملفات النصوص البسيطة (.txt) إلى ملفات PDF منسقة ومقروءة.',
      es: 'Convierta archivos de texto plano (.txt) en PDFs bien formateados.',
      fr: 'Convertissez des fichiers texte brut (.txt) en PDF bien formatés.'
    }
  },
  rtf2pdf: {
    category: 'pdf_convert',
    icon: FileText,
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100/60',
    descriptions: {
      en: 'Convert RTF (Rich Text Format) documents to standard PDF files.',
      ar: 'تحويل ملفات الـ RTF (النصوص المنسقة) إلى مستندات PDF قياسية.',
      es: 'Convierta documentos RTF (formato de texto enriquecido) en archivos PDF estándar.',
      fr: 'Convertissez des documents RTF (format de texte enrichi) en fichiers PDF standard.'
    }
  },
  add_page_numbers: {
    category: 'edit',
    icon: Hash,
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100/60',
    descriptions: {
      en: 'Add custom styled page numbers at header or footer positions across selected page ranges.',
      ar: 'إضافة أرقام صفحات منسقة ومخصصة في ترويسة أو تذييل المستند مع تحديد نطاق الصفحات.',
      es: 'Agregue números de página personalizados en el encabezado o pie de página.',
      fr: 'Ajoutez des numéros de page personnalisés dans l\'en-tête ou le pied de page.'
    }
  },
  repair: {
    category: 'edit',
    icon: Wrench,
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    descriptions: {
      en: 'Scan and repair damaged or corrupted PDF structure to regain accessibility.',
      ar: 'فحص وإصلاح ملفات PDF التالفة أو غير القابلة للفتح واسترجاع بنيتها الداخلية.',
      es: 'Escanee y repare la estructura de PDF dañada o corrupta para recuperar el acceso.',
      fr: 'Analysez et réparez la structure PDF endommagée pour rétablir l\'accès.'
    }
  },
  flatten: {
    category: 'edit',
    icon: Layers,
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/60',
    descriptions: {
      en: 'Flatten interactive form fields and annotations into static document layers.',
      ar: 'تحويل حقول النماذج التفاعلية والطبقات والتعليقات التوضيحية إلى محتوى ثابت غير قابل للتعديل.',
      es: 'Aplana los campos de formulario interactivos y las anotaciones en capas estáticas.',
      fr: 'Aplatissez les champs de formulaire interactifs et les annotations en calques statiques.'
    }
  },
  metadata: {
    category: 'edit',
    icon: Tags,
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/60',
    descriptions: {
      en: 'View and edit internal PDF metadata parameters like Title, Author, Subject, and Keywords.',
      ar: 'عرض وتعديل حقول البيانات التعريفية (العنوان، المؤلف، الموضوع، الكلمات المفتاحية) لملف الـ PDF.',
      es: 'Ver y editar los metadatos del PDF como título, autor, asunto y palabras clave.',
      fr: 'Affichez et modifiez les métadonnées PDF comme le titre, l\'auteur, le sujet et les mots-clés.'
    }
  },
  web2pdf: {
    category: 'pdf_convert',
    icon: Globe,
    iconBg: 'bg-sky-50 text-sky-600 border border-sky-100/60',
    descriptions: {
      en: 'Convert any web page URL into a high-quality PDF document instantly.',
      ar: 'إدخال رابط ويب URL وتحويل محتويات صفحة الويب بالكامل إلى ملف PDF منسق ومقروء.',
      es: 'Convierta cualquier URL de página web en un documento PDF de alta calidad al instante.',
      fr: 'Convertissez instantanément n\'importe quelle URL de page Web en document PDF.'
    }
  },
  qrcode: {
    category: 'edit',
    icon: QrCode,
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    descriptions: {
      en: 'Generate high-quality QR codes from text/links to embed into PDF pages or download as images.',
      ar: 'إنشاء رموز QR مخصصة من روابط ونصوص لتضمينها بصفحات مستند PDF أو تحميلها كصورة مستقلة.',
      es: 'Genere códigos QR a partir de texto o enlaces para incrustar en PDF o descargar.',
      fr: 'Générez des codes QR à partir de textes/liens à intégrer dans des PDF ou à télécharger.'
    }
  }
};

const ToolCard: React.FC<{
  tool: Tool & { isAi: boolean };
  onClick: () => void;
  language: Language;
}> = ({ tool, onClick, language }) => {
  const isRTL = language === Language.AR;
  const config = TOOL_CONFIGS[tool.id];
  const IconComponent = config ? config.icon : FileText;
  const bgClass = config ? config.iconBg : 'bg-indigo-50 text-indigo-600 border border-indigo-100';
  const desc = config ? (config.descriptions[language] || config.descriptions['en'] || '') : '';

  // Dynamically map light tailwind color configurations to beautiful matching dark mode equivalents
  const getDarkBgClass = (bg: string) => {
    return bg
      .replace(/bg-([a-z]+)-50/g, 'bg-$1-50 dark:bg-$1-950/40')
      .replace(/text-([a-z]+)-600/g, 'text-$1-600 dark:text-$1-400')
      .replace(/border-([a-z]+)-100\/60/g, 'border-$1-100/60 dark:border-$1-900/30')
      .replace(/border-([a-z]+)-100/g, 'border-$1-100 dark:border-$1-900/30');
  };

  const adaptiveBgClass = getDarkBgClass(bgClass);

  return (
    <button
      onClick={onClick}
      id={`tool-card-${tool.id}`}
      className={`group w-full flex items-start p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 hover:border-indigo-200 dark:hover:border-indigo-900/80 hover:shadow-md hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-all duration-300 transform hover:-translate-y-1 text-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
        isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
      }`}
    >
      <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl ${adaptiveBgClass} ${isRTL ? 'ms-4' : 'me-4'} group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
            {tool.name}
          </h4>
          {tool.isAi && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 uppercase tracking-wider">
              AI
            </span>
          )}
        </div>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>
    </button>
  );
};

const GROUPS_CONFIG = [
  {
    id: 'group1',
    toolIds: ['merge', 'split']
  },
  {
    id: 'group2',
    toolIds: ['pdf2word', 'pdf2excel', 'pdf2ppt', 'pdf2img', 'pdf2png', 'pdf2svg', 'pdf2html', 'pdf2txt', 'pdf2epub']
  },
  {
    id: 'group3',
    toolIds: ['img2pdf', 'docx2pdf', 'xlsx2pdf', 'pptx2pdf', 'html2pdf', 'txt2pdf', 'rtf2pdf', 'web2pdf']
  },
  {
    id: 'group4',
    toolIds: ['png2webp', 'jpg2webp', 'png2heic', 'jpg2heic']
  },
  {
    id: 'group5',
    toolIds: ['compress', 'watermark', 'rotate', 'delete_pages', 'reorder', 'crop', 'add_page_numbers', 'repair', 'flatten', 'metadata', 'qrcode']
  },
  {
    id: 'group6',
    toolIds: ['protect', 'unlock']
  },
  {
    id: 'group7',
    toolIds: ['extract', 'summarize', 'translate', 'ocr', 'format', 'chat', 'redact', 'compare']
  }
];

const GROUP_LABELS: Record<string, Record<string, string>> = {
  en: {
    group1: 'Merge & Split',
    group2: 'Convert PDF (PDF to other formats)',
    group3: 'Convert to PDF (other formats to PDF)',
    group4: 'Convert Images',
    group5: 'Edit & Organize',
    group6: 'Security & Protection',
    group7: 'AI Tools'
  },
  ar: {
    group1: 'دمج وتقسيم',
    group2: 'تحويل PDF (PDF إلى صيغ أخرى)',
    group3: 'تحويل إلى PDF (صيغ أخرى إلى PDF)',
    group4: 'تحويل الصور',
    group5: 'تعديل وتنظيم',
    group6: 'حماية وأمان',
    group7: 'أدوات الذكاء الاصطناعي'
  },
  es: {
    group1: 'Unir y Dividir',
    group2: 'Convertir PDF (PDF a otros formatos)',
    group3: 'Convertir a PDF (otros formatos a PDF)',
    group4: 'Conversión de Imágenes',
    group5: 'Editar y Organizar',
    group6: 'Seguridad y Protección',
    group7: 'Herramientas de IA'
  },
  fr: {
    group1: 'Fusionner et Diviser',
    group2: 'Convertir PDF (PDF vers d\'autres formats)',
    group3: 'Convertir en PDF (autres formats vers PDF)',
    group4: 'Conversion d\'Images',
    group5: 'Modifier et Organiser',
    group6: 'Sécurité et Protection',
    group7: 'Outils d\'IA'
  }
};

export const Tools: React.FC<ToolsProps> = ({ content, onSelectTool, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const labels = SEARCH_LABELS[language] || SEARCH_LABELS[Language.EN];
  const isRTL = language === Language.AR;

  const query = searchQuery.trim().toLowerCase();

  // Helper to check if a tool matches a query
  const isToolMatch = (tool: Tool, q: string) => {
    const config = TOOL_CONFIGS[tool.id];
    const desc = config ? (config.descriptions[language] || config.descriptions['en'] || '').toLowerCase() : '';
    return tool.name.toLowerCase().includes(q) || 
           tool.id.toLowerCase().includes(q) || 
           desc.includes(q);
  };

  // Build the complete combined list of tools with category details
  const allToolsList = [
    ...content.basicTools.map(t => ({ ...t, isAi: false })),
    ...content.aiTools.map(t => ({ ...t, isAi: true })),
    ...(content.imageTools || []).map(t => ({ ...t, isAi: false })),
    ...(content.pdfConversionTools || []).map(t => ({ ...t, isAi: false })),
    ...(content.additionalTools || []).map(t => ({ ...t, isAi: false }))
  ];

  // Map tools by id for fast lookups
  const toolsMap = new Map<string, typeof allToolsList[0]>();
  allToolsList.forEach(t => {
    toolsMap.set(t.id, t);
  });

  // Distribute tools to their respective physical groups and filter by search query if any
  const groupsWithFilteredTools = GROUPS_CONFIG.map(group => {
    const matchingTools = group.toolIds
      .map(id => toolsMap.get(id))
      .filter((t): t is typeof allToolsList[0] => !!t)
      .filter(t => !query || isToolMatch(t, query));
    
    return {
      id: group.id,
      title: GROUP_LABELS[language]?.[group.id] || GROUP_LABELS[Language.EN]?.[group.id] || '',
      tools: matchingTools
    };
  });

  const hasOriginalMatches = groupsWithFilteredTools.some(g => g.tools.length > 0);

  // Compute corrected layout query suggestion
  let correctedQuery = '';
  if (query && !hasOriginalMatches) {
    const corrected = translateLayout(searchQuery.trim());
    const correctedLower = corrected.trim().toLowerCase();
    if (correctedLower !== query) {
      const hasCorrectedMatches = allToolsList.some(tool => isToolMatch(tool, correctedLower));
      if (hasCorrectedMatches) {
        correctedQuery = corrected;
      }
    }
  }

  // Handle clicking the correction suggestion
  const applyCorrection = () => {
    if (correctedQuery) {
      setSearchQuery(correctedQuery);
    }
  };

  return (
    <section id="tools" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            {content.title}
          </h2>
        </div>

        {/* Beautiful Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            {/* Search Icon */}
            <div className={`absolute inset-y-0 ${isRTL ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.placeholder}
              className={`w-full py-4 ${isRTL ? 'pl-12 pr-12' : 'pl-12 pr-12'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all`}
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                title={labels.clear}
                className={`absolute inset-y-0 ${isRTL ? 'left-4' : 'right-4'} flex items-center text-slate-400 hover:text-slate-600 focus:outline-none`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Did You Mean Suggestion Bar */}
          {correctedQuery && (
            <div className={`mt-3 px-3 py-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{labels.didYouMean}</span>
              <button
                onClick={applyCorrection}
                className="font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 underline cursor-pointer hover:no-underline transition-colors focus:outline-none text-start"
              >
                {correctedQuery}
              </button>
            </div>
          )}
        </div>

        {/* Sequential Groups and Tools Results */}
        {hasOriginalMatches ? (
          <div className="space-y-16 animate-fade-in">
            {groupsWithFilteredTools.map((group) => {
              if (group.tools.length === 0) return null;
              return (
                <div key={group.id} className="scroll-mt-24">
                  {/* Group Title */}
                  <h3 className={`text-2xl font-extrabold text-slate-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    {group.title}
                  </h3>
                  {/* Horizontal Divider Line */}
                  <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-800/80 mt-3 mb-8 rounded-full" />
                  {/* Grid of Tool Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={() => onSelectTool(tool.id)}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State Card */
          <div className="max-w-md mx-auto text-center p-12 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">{labels.noResults}</p>
            {correctedQuery && (
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                <span>{labels.didYouMean} </span>
                <button
                  onClick={applyCorrection}
                  className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline hover:no-underline transition-colors focus:outline-none"
                >
                  {correctedQuery}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
