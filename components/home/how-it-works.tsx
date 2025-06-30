import { Brain, FileImageIcon, FileText } from 'lucide-react';
import { WorkStep } from './work-step';

export const HowItWorks = () => {
  const workSteps = [
    {
      id: 1,
      icon: FileText,
      title: 'File Upload',
      description: 'Simply drag and drop your PDF document or click to upload.',
    },
    {
      id: 2,
      icon: Brain,
      title: 'AI Analyzes',
      description:
        'Our Advanced AI processes and analyzes your document instantly.',
    },
    {
      id: 3,
      icon: FileImageIcon,
      title: 'Get Summary',
      description: 'Receive a clear, concise summary of your document.',
    },
  ];

  return (
    <section>
      <div className="how_it_works flex flex-col items-center px-6 py-10">
        <div className="how_it_works_heading_section text-center">
          <h3 className="text-amber-600 text-base font-semibold uppercase">
            How It Works
          </h3>
          <h2 className="font-bold text-3xl max-w-2xl mx-auto mt-10">
            Transform your PDF into an easy-to-digest summary in three steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          {workSteps.map((step) => {
            return <WorkStep key={step.id} {...step} />;
          })}
        </div>
      </div>
    </section>
  );
};
