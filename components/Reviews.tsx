import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Language } from '../types';

interface Review {
  id: string;
  stars: number;
  comment: string;
  date: string;
}

interface ReviewsProps {
  language: Language;
}

const TRANSLATIONS: Record<string, any> = {
  [Language.EN]: {
    sectionTitle: 'User Reviews & Ratings',
    averageRating: 'Overall Rating',
    outOfFive: 'out of 5 stars',
    basedOn: 'Based on {count} reviews',
    writeReview: 'Rate our Website',
    ratingLabel: 'Select Your Rating:',
    commentPlaceholder: 'Write a short comment or review (optional)...',
    submitBtn: 'Submit Review',
    successMsg: 'Thank you! Your rating has been saved successfully.',
    alreadySubmitted: 'You have already submitted a review recently. You can review again in 24 hours.',
    errorMsg: 'An error occurred while submitting. Please try again later.',
    latestComments: 'Latest User Feedback',
    noComments: 'No comments yet. Be the first to share your thoughts!',
    submitting: 'Sending...',
    starAlert: 'Please select a star rating first.',
    justNow: 'Just now'
  },
  [Language.AR]: {
    sectionTitle: 'تقييمات وآراء المستخدمين',
    averageRating: 'التقييم العام للموقع',
    outOfFive: 'من 5 نجوم',
    basedOn: 'بناءً على {count} تقييم',
    writeReview: 'قيّم موقعنا وشاركنا تجربتك',
    ratingLabel: 'اختر تقييمك بالنجوم:',
    commentPlaceholder: 'اكتب رأيك أو تعليقك هنا (اختياري)...',
    submitBtn: 'إرسال التقييم',
    successMsg: 'شكراً جزيلاً! تم حفظ تقييمك ورأيك بنجاح.',
    alreadySubmitted: 'لقد أرسلت تقييماً بالفعل. يرجى الانتظار 24 ساعة للتقييم مجدداً.',
    errorMsg: 'حدث خطأ أثناء حفظ التقييم. يرجى المحاولة لاحقاً.',
    latestComments: 'آخر آراء وتعليقات الزوار',
    noComments: 'لا توجد تعليقات بعد. كن أول من يشاركنا رأيه!',
    submitting: 'جاري الإرسال...',
    starAlert: 'يرجى اختيار عدد النجوم للتقييم أولاً.',
    justNow: 'الآن'
  },
  [Language.ES]: {
    sectionTitle: 'Opiniones y Calificaciones de los Usuarios',
    averageRating: 'Calificación General',
    outOfFive: 'de 5 estrellas',
    basedOn: 'Basado en {count} opiniones',
    writeReview: 'Califica nuestro Sitio Web',
    ratingLabel: 'Selecciona tu calificación:',
    commentPlaceholder: 'Escribe un breve comentario u opinión (opcional)...',
    submitBtn: 'Enviar Opinión',
    successMsg: '¡Muchas gracias! Tu opinión ha sido guardada correctamente.',
    alreadySubmitted: 'Ya has enviado una opinión recientemente. Puedes calificar de nuevo en 24 horas.',
    errorMsg: 'Ocurrió un error al enviar. Por favor, inténtalo más tarde.',
    latestComments: 'Últimos Comentarios',
    noComments: 'Aún no hay comentarios. ¡Sé el primero en compartir tu experiencia!',
    submitting: 'Enviando...',
    starAlert: 'Por favor, selecciona una calificación por estrellas.',
    justNow: 'Ahora mismo'
  },
  [Language.FR]: {
    sectionTitle: 'Avis & Évaluations des Utilisateurs',
    averageRating: 'Note Générale du Site',
    outOfFive: 'sur 5 étoiles',
    basedOn: 'Basé sur {count} avis',
    writeReview: 'Évaluez notre Site Web',
    ratingLabel: 'Sélectionnez votre note :',
    commentPlaceholder: 'Écrivez un court commentaire ou avis (facultatif)...',
    submitBtn: 'Envoyer l\'Avis',
    successMsg: 'Merci beaucoup ! Votre évaluation a été enregistrée avec succès.',
    alreadySubmitted: 'Vous avez déjà soumis un avis récemment. Vous pourrez évaluer de nouveau dans 24 heures.',
    errorMsg: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.',
    latestComments: 'Derniers Retours Utilisateurs',
    noComments: 'Aucun avis pour le moment. Soyez le premier à donner votre avis !',
    submitting: 'Envoi...',
    starAlert: 'Veuillez sélectionner une note d\'étoiles d\'abord.',
    justNow: 'À l\'instant'
  }
};

export const Reviews: React.FC<ReviewsProps> = ({ language }) => {
  const isRTL = language === Language.AR;
  const t = TRANSLATIONS[language] || TRANSLATIONS[Language.EN];

  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Validate stars rating selected
    if (rating === 0) {
      setStatusMessage({ text: t.starAlert, isError: true });
      return;
    }

    // 24 Hour duplicate protection (Rate Limiting)
    const lastSubmission = localStorage.getItem('pdfprotools_last_review_time');
    if (lastSubmission) {
      const timeSinceLast = Date.now() - parseInt(lastSubmission, 10);
      const hours24 = 24 * 60 * 60 * 1000;
      if (timeSinceLast < hours24) {
        setStatusMessage({ text: t.alreadySubmitted, isError: true });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars: rating, comment })
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
        
        // Save submission timestamp
        localStorage.setItem('pdfprotools_last_review_time', Date.now().toString());
        
        setStatusMessage({ text: t.successMsg, isError: false });
        setRating(0);
        setComment('');
      } else {
        setStatusMessage({ text: t.errorMsg, isError: true });
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setStatusMessage({ text: t.errorMsg, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format date relative or formatted
  const formatDate = (dateStr: string) => {
    try {
      const reviewDate = new Date(dateStr);
      const diffMs = Date.now() - reviewDate.getTime();
      const diffMin = Math.floor(diffMs / (60 * 1000));
      const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
      
      if (diffMin < 5) return t.justNow;
      if (diffHours < 24) {
        if (language === Language.AR) return `قبل ${diffHours} ساعة`;
        if (language === Language.ES) return `Hace ${diffHours} horas`;
        if (language === Language.FR) return `Il y a ${diffHours} heures`;
        return `${diffHours} hours ago`;
      }
      
      return reviewDate.toLocaleDateString(language === Language.AR ? 'ar-EG' : language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section id="reviews-section" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            {t.sectionTitle}
          </h2>
          <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Overall Stats & Submission Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Stats Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl text-center space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t.averageRating}</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white">{averageRating}</span>
                <span className="text-xl font-medium text-slate-400 dark:text-slate-500">/ 5</span>
              </div>
              
              {/* Star icons display */}
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => {
                  const fillLevel = Math.max(0, Math.min(1, averageRating - (star - 1)));
                  return (
                    <div key={star} className="relative w-7 h-7">
                      {/* Empty Star */}
                      <Star className="absolute inset-0 w-7 h-7 text-slate-300 dark:text-slate-700" strokeWidth={2} />
                      {/* Filled Star overlay */}
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillLevel * 100}%` }}>
                        <Star className="w-7 h-7 fill-amber-400 text-amber-400" strokeWidth={2} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {t.basedOn.replace('{count}', totalReviews.toString())}
              </p>
            </div>

            {/* Submission Form Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
                {t.writeReview}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Clickable star selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {t.ratingLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                        title={`${star} stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment area */}
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.commentPlaceholder}
                    maxLength={500}
                    className={`w-full p-3 bg-slate-50/60 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-450 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Status Alerts */}
                {statusMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold ${
                      statusMessage.isError
                        ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30'
                        : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30'
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-md dark:shadow-none hover:shadow-lg disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer text-sm"
                >
                  {isSubmitting ? t.submitting : t.submitBtn}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Latest Reviews Feed */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <span>{t.latestComments}</span>
              <span className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full font-bold">
                {reviews.length}
              </span>
            </h3>

            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-850/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{t.noComments}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-slate-50 dark:bg-slate-800/30 border border-slate-100/80 dark:border-slate-800/80 rounded-2xl space-y-2.5 hover:shadow-sm transition-shadow duration-300"
                  >
                    <div className={`flex flex-wrap items-center justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      
                      {/* Feedback Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4.5 h-4.5 ${
                              star <= rev.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                            }`}
                            strokeWidth={2}
                          />
                        ))}
                      </div>

                      {/* Feedback Date */}
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium font-mono">
                        {formatDate(rev.date)}
                      </span>
                    </div>

                    {/* Feedback Comment (optional) */}
                    {rev.comment && (
                      <p className={`text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium break-words ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {rev.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
