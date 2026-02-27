'use client';

import React from 'react';

interface StepOneProps {
  description: string;
  setDescription: (value: string) => void;
  onNext: () => void;
}

export default function StepOne({ description, setDescription, onNext }: StepOneProps) {
  const isValid = description.length >= 5;
  const progress = Math.min((description.length / 5) * 100, 100);

  return (
    <div className="animate-slideUp mx-auto max-w-2xl px-4 sm:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1">
          <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 01</p>
        </div>
        <h2 className="mb-3 text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          What's your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">idea?</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          Describe your startup — what problem it solves, who it serves, and what makes it different.
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <textarea
            placeholder="We're building an AI-powered platform that helps small businesses automate their marketing..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full resize-none bg-transparent p-5 text-foreground placeholder-muted-foreground outline-none"
          />
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Character Counter */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {isValid ? '✓ Ready to continue' : `${Math.max(0, 5 - description.length)} characters needed`}
          </span>
          <span className="text-xs font-bold text-primary">{description.length} / 5 min</span>
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 sm:mt-10 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`group inline-flex items-center gap-2 rounded-lg px-6 sm:px-8 py-3 font-semibold transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start ${
            isValid
              ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-95'
              : 'cursor-not-allowed bg-muted text-muted-foreground'
          }`}
        >
          Continue
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
