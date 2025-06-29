'use client';

import React, { useTransition } from 'react';
import { SummaryStatus } from './summary-status';
import { toggleSummaryStatus } from '@/action/summary-actions';
import { toast } from 'sonner';

export interface SummaryStatusWrapperProps {
  initialStatus: boolean;
  summaryId: string;
}

export const SummaryStatusWrapper = ({
  initialStatus = false,
  summaryId,
}: SummaryStatusWrapperProps) => {
  const [status, setStatus] = React.useState(initialStatus);
  const [isPending, startTransition] = useTransition();
  const handleToggle = (value: boolean) => {
    setStatus(value);

    startTransition(async () => {
      const resp = await toggleSummaryStatus(summaryId, value);
      if (!resp.success) {
        setStatus(!value);
        console.log(resp.message);
        toast.error('Please try again letter');
      }
    });
  };

  return (
    <SummaryStatus
      status={status}
      onToggle={handleToggle}
      isPending={isPending}
    />
  );
};
