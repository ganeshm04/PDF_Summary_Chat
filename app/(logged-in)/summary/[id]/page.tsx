import { getPDFSummaryById } from '@/action/summary-actions';

interface SummaryParams {
  params: { id: string };
}

import { DeleteButton } from '@/components/dashboard/delete-button';
import { SummaryStatusWrapper } from '@/components/summary/summary-status-wrapper';
import { SummaryCarousel } from '@/components/summary/summary-carousel';
import { Download, FileText, Calendar, ExternalLink } from 'lucide-react';
import { redirect } from 'next/navigation';
import { BackToDashboard } from '@/components/summary/back-dashboard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper to parse summaryText into slides for the carousel
function parseSummaryToSlides(summaryText: string) {
  // Each step object: { step: string, keyPoints: { point: string }[] }
  const lines = summaryText.split('\n');
  const slides: { step: string; keyPoints: { point: string }[] }[] = [];
  let currentStep = '';
  let currentKeyPoints: { point: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Step format: '🔹 Step 1: Title' or '🔸 Step 2: Title'
    const stepMatch = line.match(/^[🔹🔸]\s*Step\s*\d+:\s*(.+)$/);
    if (stepMatch) {
      if (currentStep && currentKeyPoints.length > 0) {
        slides.push({ step: currentStep, keyPoints: currentKeyPoints });
      }
      currentStep = stepMatch[1].trim();
      currentKeyPoints = [];
      continue;
    }
    // Key point: '- 📘 Key Point 1: ...' or similar
    const keyMatch = line.match(/^[-•]\s*[📘🧠✨⭐🚀🔄💡🛠️]?(\s*Key Point \d+:)?\s*(.+)$/);
    if (keyMatch) {
      const text = keyMatch[2].trim();
      currentKeyPoints.push({ point: text });
      continue;
    }
    // Fallback: if line starts with '-', treat as a key point
    if (line.startsWith('-')) {
      const text = line.replace(/^[-•]\s*/, '');
      currentKeyPoints.push({ point: text });
    }
  }
  if (currentStep && currentKeyPoints.length > 0) {
    slides.push({ step: currentStep, keyPoints: currentKeyPoints });
  }
  // Fallback: if no sections found, show all as one card
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
  const { id } = params;

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
        <p> Summary not found.</p>
      </section>
    );
  }

  // Convert summaryText to slides for the carousel
  const slides = parseSummaryToSlides(summary.summaryText);

  console.log(slides);
  

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <BackToDashboard />
      
      {/* Header Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
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
              <SummaryStatusWrapper
                initialStatus={summary.status}
                summaryId={summary.id}
              />
              <DeleteButton summaryId={summary?.id} />
              <button className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors shadow-sm">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Carousel */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            AI-Generated Summary
          </h2>
          <p className="text-gray-600">
            Your PDF has been analyzed and organized into key sections below
          </p>
        </div>
        
        <SummaryCarousel slides={slides} />
      </div>

      {/* Original PDF Link */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Original Document</h3>
              <p className="text-sm text-gray-600">
                View the original PDF file that was analyzed
              </p>
            </div>
            <a
              href={summary.originalFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <ExternalLink className="h-4 w-4" />
              View Original PDF
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SummaryDetails;
