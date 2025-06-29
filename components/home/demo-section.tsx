import { Pizza } from 'lucide-react';
import { SummaryCarousel } from '@/components/summary/summary-carousel';

export const DemoSection = () => {
  // Sample slides for the demo
  const slides = [
    {
      step: 'Quick Overview',
      keyPoints: [
        { point: 'Comprehensive Next.js 15 course covering everything from fundamentals to advanced deployment strategies.' }
      ]
    },
    {
      step: 'Document Details',
      keyPoints: [
        { point: 'Type: Technical Course' },
        { point: 'For: Web Developers & React Engineers' }
      ]
    },
    {
      step: 'Key Highlights',
      keyPoints: [
        { point: 'Complete guide to Next.js 15\'s App Router' },
        { point: 'Server Components & Server Actions deep dive' },
        { point: 'Full-stack application development with Next.js' }
      ]
    },
    {
      step: 'Learning Outcomes',
      keyPoints: [
        { point: 'Understand SSR, SSG, and ISR in real projects.' },
        { point: 'Build, deploy, and optimize modern web apps.' }
      ]
    },
    {
      step: 'Get Started',
      keyPoints: [
        { point: 'Upload your PDF to see a summary like this!' }
      ]
    }
  ];

  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center text-center space-y-4 ">
          {/* Pizza Icon */}
          <div className="pizza_icon  inline-flex justify-center items-center p-2 rounded-2xl border border-gray-500/20 mb-4 bg-gray-100/80 backdrop-blur-xs">
             <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          {/* Section Heading */}
          <div className="section_heading text-center mb-16 ">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Watch how Sommaire transforms{' '}
              <span className="bg-linear-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{' '}
              into an easy-to-read summary!
            </h3>
          </div>
          {/* Summary Viewer */}
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6 w-full">
            <SummaryCarousel slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
};
