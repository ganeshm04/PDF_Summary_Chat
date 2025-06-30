import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const CTASection = () => {
  return (
    <section className="py-16 px-6 bg-amber-50 text-gray-900 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-700">
          Start Summarizing PDFs Instantly
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Join thousands of users who are saving time with AI-powered document
          summaries.
        </p>
        <Button
          variant={'link'}
          size={'lg'}
          className="mt-6  bg-linear-to-r from-slate-900 to-amber-500 hover:from-amber-500 hover:to-slate-900 text-white font-semibold py-3 px-8 transition-all duration-300"
        >
          <Link
            href={'/#pricing'}
            className="no-underline inline-flex gap-2 text-center justify-center items-center"
          >
            Get Started Now{' '}
            <span> 
              {' '}
              <ArrowRight className="h-10 w-10 animate-pulse" />{' '}
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
};
