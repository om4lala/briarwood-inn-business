import React, { useState, useEffect } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface PropertyImage {
  id: string;
  localUrl: string;
  fallbackUrl: string;
  title: string;
}

const TOUR_GALLERY: PropertyImage[] = [
  {
    id: 'prop-ext-1',
    localUrl: '/property/hotel_image_1.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    title: 'Exterior Frontage',
  },
  {
    id: 'prop-ext-4',
    localUrl: '/property/hotel_image_4.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    title: 'Exterior Driveway',
  },
  {
    id: 'prop-lobby',
    localUrl: '/property/front_desk_night_window.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1200&q=80',
    title: 'Lobby Front Desk Window',
  },
  {
    id: 'prop-breakfast-1',
    localUrl: '/property/breakfast_area.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    title: 'Breakfast Area',
  },
  {
    id: 'prop-breakfast-2',
    localUrl: '/property/breakfast_area_2.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    title: 'Breakfast Dining Area',
  },
  {
    id: 'prop-hallway-left',
    localUrl: '/property/hallway_left.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    title: 'Left Hallway Wing',
  },
  {
    id: 'prop-hallway-right',
    localUrl: '/property/hallway_right.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    title: 'Right Hallway Wing',
  },
  {
    id: 'prop-vending',
    localUrl: '/property/vending_area.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    title: 'Vending & Ice Area',
  }
];

export const PropertyGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Get active URL (local or fallback if local fails/is empty)
  const getImageUrl = (image: PropertyImage) => {
    return failedImages[image.id] ? image.fallbackUrl : image.localUrl;
  };

  // Auto-slide effect (5 seconds)
  useEffect(() => {
    if (TOUR_GALLERY.length <= 1 || isHovering || lightboxOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOUR_GALLERY.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovering, lightboxOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? TOUR_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === TOUR_GALLERY.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Interactive Showcase Slider */}
      <div 
        className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] bg-brand-950 rounded-2xl overflow-hidden shadow-md select-none group cursor-pointer border border-brand-100/50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Sliding Images */}
        {TOUR_GALLERY.map((image, idx) => (
          <div
            key={image.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
              idx === currentIndex 
                ? 'opacity-100 z-10 scale-100' 
                : 'opacity-0 z-0 scale-[1.02] pointer-events-none'
            }`}
          >
            <img
              src={getImageUrl(image)}
              alt={image.title}
              onError={() => {
                if (!failedImages[image.id]) {
                  setFailedImages(prev => ({ ...prev, [image.id]: true }));
                }
              }}
              className="w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Note: Overlay text and caption have been moved below the image container for maximum image visibility and clean dark blue typography */}
          </div>
        ))}

        {/* Floating Slide Index Counter (Top Right) - Styled with light brand blue background and dark text */}
        {TOUR_GALLERY.length > 1 && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-brand-50/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-brand-900 z-30 border border-brand-300 shadow-sm font-bold">
            {currentIndex + 1} / {TOUR_GALLERY.length}
          </div>
        )}

        {/* Floating Maximize Button (Top Left) - Styled with light brand blue background and dark icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-brand-50/95 backdrop-blur-md p-2.5 rounded-full text-brand-900 z-30 border border-brand-300 shadow-sm hover:bg-brand-100 hover:text-brand-950 hover:border-brand-400 transition-all duration-300 hover:scale-105"
          title="View High-Res Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Navigation Arrows - Styled with light brand blue background and dark blue arrows */}
        {TOUR_GALLERY.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-50/95 hover:bg-brand-100 text-brand-900 hover:text-brand-950 border border-brand-300 hover:border-brand-400 backdrop-blur-md p-2.5 sm:p-3 rounded-full transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 focus:outline-none shadow-md hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-50/95 hover:bg-brand-100 text-brand-900 hover:text-brand-950 border border-brand-300 hover:border-brand-400 backdrop-blur-md p-2.5 sm:p-3 rounded-full transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 focus:outline-none shadow-md hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Elegant Caption Area - Positioned outside and below the image box */}
      <div className="px-1 py-1 text-center sm:text-left">
        <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-brand-600 mb-0.5">
          Property Tour
        </span>
        <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-900 leading-tight">
          {TOUR_GALLERY[currentIndex]?.title}
        </h4>
      </div>

      {/* Navigation Indicators & Hover pause guide */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        {/* Slide Dots */}
        <div className="flex justify-center items-center gap-1.5 order-2 sm:order-1">
          {TOUR_GALLERY.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentIndex 
                  ? 'w-5 bg-brand-900' 
                  : 'w-1.5 bg-brand-200 hover:bg-brand-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hover Pause Info */}
        <p className="flex items-center gap-1 text-[11px] text-brand-500 font-light order-1 sm:order-2">
          <HelpCircle className="h-3.5 w-3.5 text-brand-400" />
          Click to expand to fullscreen • Hover to pause slideshow
        </p>
      </div>

      {/* Lightbox for high-resolution full-screen viewing */}
      {lightboxOpen && TOUR_GALLERY.length > 0 && (
        <ImageLightbox
          images={TOUR_GALLERY.map((img) => getImageUrl(img))}
          initialIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          title={TOUR_GALLERY[currentIndex]?.title || 'Property Photo'}
        />
      )}
    </div>
  );
};

export default PropertyGallery;
