'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  title: string;
  className?: string;
  variant?: 'card' | 'details';
  showThumbnails?: boolean;
  showArrows?: boolean;
  showCounter?: boolean;
  showDots?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const ImageSlider = ({
  images,
  title,
  className = '',
  variant = 'details',
  showThumbnails = false,
  showArrows = true,
  showCounter = true,
  showDots = false,
  onClick,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const validImages = images.filter(Boolean);

  // Single image - no controls needed (YAGNI)
  if (validImages.length <= 1) {
    return (
      <div className={`relative w-full overflow-hidden rounded-lg ${className || 'aspect-video'}`}>
        <Image
          src={validImages[0] || '/placeholder-property.jpg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
      </div>
    );
  }

  // Navigation logic (DRY)
  const goToPrevious = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex(index);
  };

  // Styling based on variant (SOLID - Open/Closed Principle)
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return {
          duration: 'duration-800',
          counterSize: 'text-xs',
          counterPadding: 'px-2 py-1',
          counterPosition: 'top-3 right-3',
          arrowSize: 'w-4 h-4',
          arrowPadding: 'p-1.5',
          arrowPosition: 'left-2 right-2',
        };
      case 'details':
      default:
        return {
          duration: 'duration-1000',
          counterSize: 'text-sm',
          counterPadding: 'px-3 py-1',
          counterPosition: 'top-4 right-4',
          arrowSize: 'w-5 h-5',
          arrowPadding: 'p-2',
          arrowPosition: 'left-4 right-4',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`group relative overflow-hidden ${className}`} onClick={onClick}>
      {/* Image Slider */}
      <div
        className={`flex transition-transform ${styles.duration} h-full ease-in-out`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {validImages.map((image, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Counter */}
      {showCounter && (
        <div
          className={`absolute ${styles.counterPosition} bg-black/60 text-white ${styles.counterPadding} rounded-full ${styles.counterSize} font-medium transition-all duration-300`}
        >
          {currentIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Navigation Arrows */}
      {showArrows && validImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute ${styles.arrowPosition.split(' ')[0]} top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 ${styles.arrowPadding} rounded-full opacity-0 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white group-hover:opacity-100`}
            aria-label="Previous image"
          >
            <svg className={styles.arrowSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className={`absolute ${styles.arrowPosition.split(' ')[1]} top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 ${styles.arrowPadding} rounded-full opacity-0 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white group-hover:opacity-100`}
            aria-label="Next image"
          >
            <svg className={styles.arrowSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && validImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={e => goToSlide(index, e)}
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && validImages.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                currentIndex === index
                  ? 'border-blue-500 ring-2 ring-blue-500/30'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
