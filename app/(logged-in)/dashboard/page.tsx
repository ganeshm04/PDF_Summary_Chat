import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SummaryList } from '@/components/dashboard/summary-list';

const Dashboard = () => {
  return (
    <main className="max-w-5xl mx-auto min-h-screen py-10 bg-background text-foreground">
      <section className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
              Your Summaries
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Transfer your PDFs into concise, actionable insights.
            </p>
          </div>

          <Link href="/upload" passHref legacyBehavior>
            <Button
              size="lg"
              className="flex gap-2 items-center text-white bg-amber-600 hover:bg-amber-700 transition ease-in-out duration-300 hover:scale-[1.03]"
            >
              <Plus className="h-5 w-5" />
              <span>Add Summary</span>
            </Button>
          </Link>
        </div>


        {/* List of Summary */}
        <SummaryList />
      </section>
    </main>
  );
};

export default Dashboard;
