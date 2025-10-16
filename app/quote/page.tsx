"use client";

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, FileText, Calculator, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';
import MaterialSelector from '@/components/MaterialSelector';
import ContactForm from '@/components/ContactForm';
import QuoteResult from '@/components/QuoteResult';

type Step = 'purpose' | 'upload' | 'options' | 'contact' | 'result';

const steps = [
  { id: 'purpose', title: 'Purpose', icon: FileText },
  { id: 'upload', title: 'Upload Files', icon: Upload },
  { id: 'options', title: 'Options', icon: Calculator },
  { id: 'contact', title: 'Contact', icon: CreditCard },
  { id: 'result', title: 'Quote', icon: Calculator }
];

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState<Step>('purpose');
  const [quoteData, setQuoteData] = useState<{
    purpose: string;
    files: any[];
    material: string;
    options: Record<string, any>;
    contact: Record<string, any>;
    quote: any | null;
  }>({
    purpose: '',
    files: [],
    material: '',
    options: {},
    contact: {},
    quote: null
  });

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);
  const isLastStep = getCurrentStepIndex() === steps.length - 1;
  const isFirstStep = getCurrentStepIndex() === 0;

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step);
    }
  };

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as Step);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PrintFlow</span>
            </div>
          </Link>
          <Badge variant="outline" className="font-medium">
            Step {getCurrentStepIndex() + 1} of {steps.length}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = getCurrentStepIndex() > index;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : isCompleted 
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden md:block ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 ml-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {currentStep === 'purpose' && 'What are you printing?'}
              {currentStep === 'upload' && 'Upload your files'}
              {currentStep === 'options' && 'Choose your options'}
              {currentStep === 'contact' && 'Contact details'}
              {currentStep === 'result' && 'Your quote is ready'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentStep === 'purpose' && (
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { id: 'prototype', title: 'Prototype', desc: 'Testing and validation', icon: '🔬' },
                  { id: 'gift', title: 'Gift Model', desc: 'Personal or decorative', icon: '🎁' },
                  { id: 'functional', title: 'Functional Part', desc: 'End-use application', icon: '⚙️' },
                  { id: 'bulk', title: 'Bulk Order', desc: 'Multiple quantities', icon: '📦' }
                ].map((purpose) => (
                  <Card 
                    key={purpose.id}
                    className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                      quoteData.purpose === purpose.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setQuoteData({...quoteData, purpose: purpose.id})}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{purpose.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{purpose.title}</h3>
                      <p className="text-gray-600">{purpose.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 'upload' && <FileUpload onFilesChange={(files) => setQuoteData({...quoteData, files})} />}
            {currentStep === 'options' && <MaterialSelector onOptionsChange={(options) => setQuoteData({...quoteData, ...options})} />}
            {currentStep === 'contact' && <ContactForm onContactChange={(contact) => setQuoteData({...quoteData, contact})} />}
            {currentStep === 'result' && <QuoteResult quoteData={quoteData} />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={isFirstStep}
            className="px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {!isLastStep ? (
            <Button 
              onClick={nextStep}
              disabled={
                (currentStep === 'purpose' && !quoteData.purpose) ||
                (currentStep === 'upload' && quoteData.files.length === 0)
              }
              className="px-6"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Link href={`/orders/${Date.now()}`}>
              <Button className="px-6">
                Place Order
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}