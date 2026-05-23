'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS } from '@/constants/colors';

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
  alt: string;
}

interface HeroBannerCarouselProps {
  slides: BannerSlide[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

/**
 * Hero Banner Carousel Component
 * Large rotating promotional banner at top of homepage
 */
export const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({
  slides,
  autoplay = true,
  autoplayInterval = 4000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg">
      {/* Slides */}
      <div className="relative w-full aspect-video sm:aspect-[16/9] lg:aspect-[16/6]">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" style={{ color: COLORS.text.primary }} />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" style={{ color: COLORS.text.primary }} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* CTA Button (if available) */}
      {slide.cta && (
        <Link
          href={slide.cta.href}
          className="absolute bottom-8 left-8 px-6 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105 hidden sm:inline-block"
          style={{ backgroundColor: COLORS.primary.main }}
        >
          {slide.cta.text}
        </Link>
      )}
    </div>
  );
};

/**
 * Promotional Banner Component
 * Smaller horizontal promotional banners
 */
export const PromoBanner: React.FC<{
  image: string;
  alt: string;
  href: string;
  className?: string;
}> = ({ image, alt, href, className = '' }) => {
  return (
    <Link href={href} className={`relative group overflow-hidden rounded-lg ${className}`}>
      <div className="relative w-full aspect-video">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
      </div>
    </Link>
  );
};
