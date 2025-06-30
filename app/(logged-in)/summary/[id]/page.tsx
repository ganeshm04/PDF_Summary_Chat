import { getPDFSummaryById } from '@/action/summary-actions';

interface SummaryParams {
  params: { id: string };
}

import { DeleteButton } from '@/components/dashboard/delete-button';
import { SummaryCarousel } from '@/components/summary/summary-carousel';
import { FileText, Calendar, ExternalLink } from 'lucide-react';
import { redirect } from 'next/navigation';
import { BackToDashboard } from '@/components/summary/back-dashboard';
import { Badge } from '@/components/ui/badge';
import { Card,CardHeader, CardTitle } from '@/components/ui/card';

// Helper to parse summaryText into slides for the carousel
function parseSummaryToSlides(summaryText: string) {

  // Split on each step (handles both 🔹 and 🔸)
  const stepRegex = /[🔹🔸]\s*Step\s*\d+:/g;
  const stepSplits = [];
  let match;
  let lastIndex = 0;

  // Find all step matches and their indices
  while ((match = stepRegex.exec(summaryText)) !== null) {
    if (match.index !== 0) {
      stepSplits.push({ start: lastIndex, end: match.index });
      lastIndex = match.index;
    }
  }
  // Add the last step
  stepSplits.push({ start: lastIndex, end: summaryText.length });

  const slides = stepSplits.map(({ start, end }) => {
    const stepChunk = summaryText.slice(start, end).trim();
    // Extract the step title (after "Step X:" and before first " - ")
    const stepTitleMatch = stepChunk.match(/^[🔹🔸]\s*Step\s*\d+:\s*([^-\n]+)/);
    const step = stepTitleMatch ? stepTitleMatch[1].trim() : 'Step';

    // Extract all key points (split by " - " and filter those that look like key points)
    const keyPoints: { point: string }[] = [];
    const keyPointRegex = /[-•]?\s*[📘🧠✨⭐🚀🔄💡🛠️]?\s*Key Point \d+:\s*([^-.]+)/g;
    let kpMatch;
    while ((kpMatch = keyPointRegex.exec(stepChunk)) !== null) {
      keyPoints.push({ point: kpMatch[1].trim() });
    }

    return {
      step,
      keyPoints,
    };
  }).filter(slide => slide.keyPoints.length > 0);


  if (slides.length === 0) {
    return [
      {
        step: 'Summary',
        keyPoints: [{ point: summaryText }]
      }
    ];
  }
  return slides;
}

const SummaryDetails = async ({ params }: SummaryParams) => {
  const { id } = await params;

  if (!id) {
    throw new Error('ID is required to fetch individual summary.');
  }

  const response = await getPDFSummaryById(id);

  if (!response.success || response.error) {
    redirect('/dashboard');
  }

  const summary = response.summary;

  if (!summary) {
    return (
      <section className="w-full py-10 text-center text-muted-foreground">
        <p>Summary not found.</p>
      </section>
    );
  }

  const slides = parseSummaryToSlides(summary.summaryText);



  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-rose-50/50">
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <BackToDashboard />

        {/* Header Card */}
        <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-rose-600" />
                  {summary.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(summary.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {summary.fileName}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={summary.originalFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Original PDF
                </a>
                <DeleteButton summaryId={summary?.id} />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Summary Carousel Section */}
        <div className="space-y-6 py-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Your AI-Generated Summary
            </h2>
            <p className="text-gray-600">
              We have analyzed your PDF and broken it down into key sections for easier understanding
            </p>
          </div>

          <SummaryCarousel slides={slides} />
        </div>
      </section>
    </div>
  );
};

export default SummaryDetails;
