import { Badge } from '@/components/ui/badge';
import { Sparkle } from 'lucide-react';

export const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-amber-200 via-amber-500 to-amber-800 animate-gradient-x group">
        <Badge
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-300"
          variant={'secondary'}
        >
          <Sparkle className="h-8 w-8 mr-2 text-amber-600 animate-pulse" />
          <p className="text-base text-amber-600">Content Creation By AI</p>
        </Badge>
      </div>

      <h1 className="uppercase tracking-tight  text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mt-8">
        Start uploading{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">your PDF&apos;s </span>
          <span
            className="absolute inset-0 rounded-lg bg-amber-200/50 -rotate-2 transform -skew-y-1 "
            area-hidden="true"
          ></span>
        </span>
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center mt-2 text-gray-600">
        Get Great summary reel of the document in seconds.
      </h2>
    </div>
  );
};
