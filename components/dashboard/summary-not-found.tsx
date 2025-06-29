import { File, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const SummaryNotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-[50vh] px-6 bg-[#fdfdfd] dark:bg-[#1a1a1a]">
      <div className="text-center space-y-6 max-w-xl bg-white dark:bg-[#2a2a2a] p-8 rounded-2xl shadow-md border border-[#f5f5f5] dark:border-[#333]">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-rose-900">
          <File className="h-8 w-8 text-rose-500 dark:text-rose-300" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-200">
            No summaries yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You haven&apos;t created any summaries yet. Let&apos;s begin with
            uploading a PDF and let the magic unfold.
          </p>
        </div>

        {/* Call to action */}
        <Link href="/upload">
          <Button className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-colors duration-300">
            <Plus className="h-8 w-8 text-white animate-pulse" />
            Create Your First Summary
          </Button>
        </Link>
      </div>
    </section>
  );
};
