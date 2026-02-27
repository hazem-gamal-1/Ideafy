'use client';

import React from 'react';
import StreamingState from '@/components/StreamingState';
import ResultsDisplay from '@/components/ResultsDisplay';
import ErrorState from '@/components/ErrorState';

interface StepFourProps {
  streaming: boolean;
  streamLog: Array<any>;
  results: any;
  error: string | null;
  onReset: () => void;
}

export default function StepFour({
  streaming,
  streamLog,
  results,
  error,
  onReset,
}: StepFourProps) {
  return (
    <div className="animate-slideUp max-w-5xl mx-auto">
      {streaming && (
        <StreamingState streamLog={streamLog} />
      )}

      {error && (
        <ErrorState error={error} onReset={onReset} />
      )}

      {results && !streaming && (
        <ResultsDisplay results={results} streamLog={streamLog} onReset={onReset} />
      )}
    </div>
  );
}
