import React, { useEffect, useState, TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, images, onClose]);

  if (!isOpen) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      handleNext();
    } else if (isRightSwipe && images.length > 1) {
      handlePrev();
    }
  };

  const lightboxContent = (
    <div 
      className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between items-center transition-opacity duration-300 animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Header */}
      <div 
        className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white">
          <h4 className="font-serif text-lg md:text-xl font-medium tracking-tight text-white/90">{title}</h4>
          {images.length > 1 && (
            <p className="text-xs text-white/60 mt-0.5">
              Image {currentIndex + 1} of {images.length}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScale((prev) => Math.max(1, prev - 0.5));
            }}
            className="text-white/80 hover:text-white p-2 transition-colors focus:ring-2 focus:ring-white rounded-full"
            title="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScale((prev) => Math.min(3, prev + 0.5));
            }}
            className="text-white/80 hover:text-white p-2 transition-colors focus:ring-2 focus:ring-white rounded-full"
            title="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-black hover:text-black/80 p-2 transition-colors focus:ring-2 focus:ring-white rounded-full bg-white hover:bg-white/90 shadow-sm"
            aria-label="Close fullscreen view"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main image content area */}
      <div 
        className="relative flex-grow w-full flex items-center justify-center p-4 md:p-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full hover:scale-105 transition-all z-20 backdrop-blur-sm hidden sm:block focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`${title} enlarged view`}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full md:max-w-[85vw] object-contain select-none animate-scaleIn rounded-sm shadow-2xl transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
          onClick={(e) => {
            e.stopPropagation();
            setScale((prev) => (prev >= 3 ? 1 : prev + 0.5));
          }}
        />

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full hover:scale-105 transition-all z-20 backdrop-blur-sm hidden sm:block focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* Thumbnails rail on the bottom */}
      {images.length > 1 && (
        <div 
          className="w-full h-24 mb-6 flex justify-center items-center gap-3 px-4 z-10 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setScale(1);
                setCurrentIndex(idx);
              }}
              className={`h-14 w-20 md:h-16 md:w-24 rounded overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${
                currentIndex === idx 
                  ? 'border-brand-300 scale-105 shadow-md shadow-brand-300/50' 
                  : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail view ${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return createPortal(lightboxContent, document.body);
};
export default ImageLightbox;
