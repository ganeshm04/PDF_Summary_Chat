import { getPDFSummaries } from '@/action/summary-actions';
import { SummaryCard } from './summary-card';
import { SummaryNotFound } from '@/components/dashboard/summary-not-found';

export const SummaryList = async () => {
  const summaryList = await getPDFSummaries();

  if (!summaryList.success || !summaryList.summaries) {
    return <SummaryNotFound />;
  }

  return (
    <section className={'flex justify-between items-center'}>
      <div className="mx-auto mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {summaryList.summaries.map((summary) => (
          <SummaryCard key={summary.id} {...summary} />
        ))}
      </div>
    </section>
  );
};
