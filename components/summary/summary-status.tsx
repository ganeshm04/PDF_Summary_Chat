'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
// import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface SummaryStatusProps {
  status: boolean;
  onToggle: (value: boolean) => void;
  isPending: boolean;
}

export const SummaryStatus = ({
  status,
  onToggle,
  isPending,
}: SummaryStatusProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Switch
          id="summary_status"
          checked={status}
          onCheckedChange={onToggle}
          disabled={isPending}
          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-400 data-[state=checked]:to-green-500 transition-colors duration-300"
        />
        {/* {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )} */}
      </div>

      <motion.div
        key={status ? 'completed' : 'not-completed'}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Label
          htmlFor="summary_status"
          className={`text-sm font-semibold px-4 py-1 rounded-full text-gray-500 ${
            status
              ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
              : 'bg-gradient-to-r from-gray-200 to-zinc-200 border border-gray-400'
          }`}
        >
          {status ? 'Read' : 'Unread'}
        </Label>
      </motion.div>
    </div>
  );
};
