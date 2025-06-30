'use client';

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  step: string;
  keyPoints: { point: string }[];
}

interface SummaryCarouselProps {
  slides: Slide[];
}

export const SummaryCarousel: React.FC<SummaryCarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const goPrev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const goNext = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  if (!slides || slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Progress bar */}
      <div className="flex justify-center mb-4">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 w-8 mx-0.5 rounded-full transition-all duration-300 ${
              idx === current ? "bg-rose-500" : "bg-rose-200"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="bg-white/80 rounded-3xl shadow-lg border border-rose-100 px-6 py-8 w-full min-h-[340px] flex flex-col items-center transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{slide.step}</h2>
        <div className="flex flex-col gap-4 w-full">
          {slide.keyPoints.map((kp, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm text-gray-800 text-base"
            >
              {/* Optional: Add an icon here if you want */}
              <span>{kp.point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center w-full mt-8 px-8">
        <button
          aria-label="Previous"
          onClick={goPrev}
          className="bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-full p-3 shadow transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          aria-label="Next"
          onClick={goNext}
          className="bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-full p-3 shadow transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};