'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Slide {
  step: string;
  keyPoints: { point: string }[];
}

interface SummaryCarouselProps {
  slides: Slide[];
}

export const SummaryCarousel: React.FC<SummaryCarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const prev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
      setAnimating(false);
    }, 200);
  };
  const next = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-0 pt-6 pb-2 flex flex-col min-h-[420px] border border-gray-100" style={{ background: 'linear-gradient(135deg, #fff 80%, #ffe4e6 100%)' }}>
      {/* Progress Bar */}
      <div className="flex px-8 mb-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full mx-0.5 flex-1 transition-all duration-300 ${i <= current ? 'bg-rose-400' : 'bg-rose-100'}`}

          >
            <div className="text-center mt-2 mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 drop-shadow-sm tracking-tight">
                {slides[current].step}
              </h2>
            </div>
          </div>
        ))}
      </div>
      {/* Step Title */}

      {/* Key Points */}
      <div className={`flex-1 flex flex-col gap-4 items-center justify-center px-4 transition-all duration-300 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {slides[current].keyPoints.map((kp, idx) => (
          <div
            key={idx}
            className="w-full max-w-md flex items-center gap-4 bg-white/90 border border-rose-100 rounded-xl px-5 py-3 shadow-md hover:shadow-lg transition-all group cursor-pointer"
          >
            <span className="flex items-center justify-center rounded-full bg-rose-100 text-rose-500 w-8 h-8 font-bold text-lg group-hover:bg-rose-400 group-hover:text-white transition-all">
              {idx + 1}
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-400 opacity-80" />
              <span className="text-base md:text-lg text-gray-800 text-left">{kp.point}</span>
            </span>
          </div>
        ))}
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between px-8 mt-8 mb-2">
        <button
          aria-label="Previous"
          onClick={prev}
          className="w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center text-rose-500 text-xl shadow transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${i === current ? 'bg-rose-400' : 'bg-rose-200'}`}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={next}
          className="w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center text-rose-500 text-xl shadow transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}; 