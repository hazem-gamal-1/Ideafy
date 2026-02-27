'use client';

import React from 'react';

interface ErrorStateProps {
  error: string;
  onReset: () => void;
}

export default function ErrorState({ error, onReset }: ErrorStateProps) {
  return (
    <div className="animate-slideUp mx-auto max-w-2xl space-y-6">
      <div className="overflow-hidden rounded-2xl border border-destructive/30 bg-gradient-to-br from-destructive/10 via-destructive/5 to-background p-8 shadow-lg shadow-destructive/10">
        <div className="flex gap-6">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-destructive/20 text-3xl">
            ⚠️
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-3xl font-bold text-destructive">Analysis Failed</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">{error}</p>
            <p className="mb-6 text-sm text-muted-foreground">
              Please check your inputs and try again. If the problem persists, ensure your PDF file is valid and your internet connection is stable.
            </p>
            <button
              onClick={onReset}
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-8 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            >
              <span>Try Again</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
