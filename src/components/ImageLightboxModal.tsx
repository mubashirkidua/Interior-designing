import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MessageCircle, Maximize2 } from 'lucide-react';

export interface LightboxImageItem {
  url: string;
  title: string;
  subtitle?: string;
  category?: string;
  location?: string;
  materials?: string[];
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImageItem[];
  initialIndex?: number;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex] || images[0];

  const handleNext = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.7 : 1));
  };

  const whatsappInquiryUrl = `https://wa.me/923428156086?text=${encodeURIComponent(
    `Hello Muhammad Mubashir Ali, I am viewing the photograph of "${currentItem.title}" (${currentItem.location || 'The Ocean Interiors Portfolio'}) and would like to know more about this design style and specifications.`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="High-resolution image lightbox"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none animate-in fade-in duration-200"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10 text-white">
        <div className="flex items-center gap-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#B77958] font-bold">
            The Ocean Interiors Gallery
          </div>
          <span className="text-white/30">|</span>
          <div className="text-xs text-white/70 font-mono">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={toggleZoom}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title={zoomLevel === 1 ? 'Zoom In (1.7x)' : 'Reset Zoom'}
          >
            {zoomLevel === 1 ? <ZoomIn className="w-5 h-5" /> : <ZoomOut className="w-5 h-5 text-[#B77958]" />}
          </button>

          {/* Close Lightbox */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto py-2">
        <div
          className={`relative max-h-[76vh] max-w-[94vw] transition-transform duration-300 ease-out cursor-pointer ${
            zoomLevel > 1 ? 'overflow-auto scale-[1.7] cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
        >
          <img
            src={currentItem.url}
            alt={currentItem.title}
            className="max-h-[76vh] max-w-[94vw] object-contain rounded-xs shadow-2xl mx-auto"
          />
        </div>

        {/* Previous & Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/10 shadow-xl"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/10 shadow-xl"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Metadata & Thumbnail Filmstrip */}
      <div className="z-20 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold font-['Playfair_Display',serif] text-white">
            {currentItem.title}
          </h3>
          <p className="text-xs text-white/70">
            {currentItem.location && <span>{currentItem.location} · </span>}
            {currentItem.subtitle || currentItem.category}
          </p>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-md py-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setCurrentIndex(idx);
                }}
                className={`w-12 h-10 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  currentIndex === idx
                    ? 'border-[#B77958] scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                }`}
              >
                <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Inquire on WhatsApp */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-full transition-all cursor-pointer shrink-0 shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Inquire via WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
