'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Code, 
  Briefcase, 
  Bot, 
  ShoppingBag, 
  MessageCircle, 
  Trophy, 
  Link,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SummaryStep {
  title: string;
  icon: React.ReactNode;
  keyPoints: string[];
  color: string;
  stepNumber: number;
}

const getStepIcon = (stepNumber: number) => {
  const icons = [
    <GraduationCap key="education" className="h-8 w-8" />,
    <Code key="skills" className="h-8 w-8" />,
    <Briefcase key="internship" className="h-8 w-8" />,
    <Bot key="ai" className="h-8 w-8" />,
    <ShoppingBag key="ecommerce" className="h-8 w-8" />,
    <MessageCircle key="chat" className="h-8 w-8" />,
    <Trophy key="achievements" className="h-8 w-8" />,
    <Link key="contact" className="h-8 w-8" />
  ];
  return icons[stepNumber - 1] || <BookOpen className="h-8 w-8" />;
};

const getStepColor = (stepNumber: number) => {
  const colors = [
    'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200',
    'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200',
    'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200'
  ];
  return colors[stepNumber - 1] || 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
};

const parseSummaryText = (summaryText: string): SummaryStep[] => {
  const steps: SummaryStep[] = [];
  const lines = summaryText.split('\n');
  
  let currentStep: Partial<SummaryStep> = {};
  let currentKeyPoints: string[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check for step headers (🔹 Step X: or 🔸 Step X:)
    const stepMatch = trimmedLine.match(/^[🔹🔸]\s*Step\s*(\d+):\s*(.+)$/);
    if (stepMatch) {
      // Save previous step if exists
      if (currentStep.title && currentKeyPoints.length > 0) {
        steps.push({
          title: currentStep.title,
          icon: currentStep.icon!,
          keyPoints: currentKeyPoints,
          color: currentStep.color!,
          stepNumber: currentStep.stepNumber!
        });
      }
      
      const stepNumber = parseInt(stepMatch[1]);
      const title = stepMatch[2].trim();
      
      currentStep = {
        title,
        icon: getStepIcon(stepNumber),
        color: getStepColor(stepNumber),
        stepNumber
      };
      currentKeyPoints = [];
      continue;
    }
    
    // Check for key points (- 📘 Key Point X: or - 🧠 Key Point X: or - ✨ Key Point X:)
    const keyPointMatch = trimmedLine.match(/^-\s*[📘🧠✨]\s*Key Point \d+:\s*(.+)$/);
    if (keyPointMatch && currentStep.title) {
      currentKeyPoints.push(keyPointMatch[1].trim());
    }
  }
  
  // Add the last step
  if (currentStep.title && currentKeyPoints.length > 0) {
    steps.push({
      title: currentStep.title,
      icon: currentStep.icon!,
      keyPoints: currentKeyPoints,
      color: currentStep.color!,
      stepNumber: currentStep.stepNumber!
    });
  }
  
  return steps;
};

interface SummaryCardsProps {
  summaryText: string;
}

export const SummaryCards = ({ summaryText }: SummaryCardsProps) => {
  const steps = parseSummaryText(summaryText);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (steps.length === 0) {
    // Fallback to plain text if parsing fails
    return (
      <div className="prose prose-gray max-w-none">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
          {summaryText}
        </pre>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Navigation Buttons */}
        <Button
          onClick={prevSlide}
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Cards Container */}
        <div className="flex transition-transform duration-500 ease-in-out">
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <Card className={`${step.color} border-2 min-h-[400px] mx-4`}>
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/80 shadow-lg">
                      {step.icon}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        Step {step.stepNumber}
                      </Badge>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 px-8 pb-8">
                  {step.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-3 h-3 rounded-full bg-current opacity-70"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base leading-relaxed text-gray-700">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          {currentIndex + 1} of {steps.length} topics
        </p>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          Use arrow keys or click the dots to navigate
        </p>
      </div>
    </div>
  );
}; 