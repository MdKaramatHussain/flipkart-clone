'use client';

import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { BORDER_RADIUS, SHADOWS } from '@/constants/layout';
import { useCountdown } from '@/hooks/useCountdown';

const BANNER_IMAGE = '/sale-is-live.jpg';
const BANNER_ALT = 'Sale Is Live promotional banner';

export function SaleIsLive() {
  const { formattedTime, isActive } = useCountdown();

  if (!isActive) {
    return null;
  }

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div
          className="bg-white rounded-lg p-4 sm:p-6"
          style={{
            borderRadius: BORDER_RADIUS.lg,
            boxShadow: SHADOWS.md,
          }}
        >
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ color: COLORS.text.primary }}
            >
              🔥 Sale Is Live
            </h2>
            <p
              className="text-sm sm:text-base font-medium"
              style={{ color: COLORS.text.secondary }}
            >
              Offer Ends In:
            </p>
            <p
              className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums tracking-wide"
              style={{ color: COLORS.error.main }}
              aria-live="polite"
              aria-label={`Offer ends in ${formattedTime}`}
            >
              {formattedTime}
            </p>
          </div>

          <div
            className="relative w-full overflow-hidden"
            style={{ borderRadius: BORDER_RADIUS.lg }}
          >
            <Image
              src={BANNER_IMAGE}
              alt={BANNER_ALT}
              width={1920}
              height={640}
              className="w-full h-auto object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
