'use client';

import React from 'react';
import ResultCard from '@/components/ResultCard';
import RawContent from '@/components/RawContent';

interface ResultsDisplayProps {
  results: any;
  streamLog: Array<any>;
  onReset: () => void;
}

export default function ResultsDisplay({ results, streamLog, onReset }: ResultsDisplayProps) {
  const resultConfig = [
    {
      key: 'idea_validation',
      icon: '💡',
      title: 'Idea Validation',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'legal_analysis',
      icon: '⚖️',
      title: 'Legal Analysis',
      color: 'from-amber-500 to-orange-500',
    },
    {
      key: 'swot_analysis',
      icon: '📊',
      title: 'SWOT Analysis',
      color: 'from-purple-500 to-pink-500',
    },
    {
      key: 'overall_summary',
      icon: '🧠',
      title: 'Overall Summary',
      color: 'from-emerald-500 to-teal-500',
      wide: true,
    },
  ];

  const hasStructuredResults = resultConfig.some((config) => results[config.key]);

  return (
    <div className="animate-slideUp space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1">
          <p className="text-xs font-bold tracking-wider text-primary uppercase">Analysis Complete</p>
        </div>
        <h2 className="text-5xl font-bold tracking-tight text-foreground">
          Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">results</span>
        </h2>
      </div>

      {/* Results Grid */}
      {hasStructuredResults ? (
        <div className="grid gap-6 md:grid-cols-2">
          {resultConfig.map((config) => {
            if (!results[config.key]) return null;
            return (
              <ResultCard
                key={config.key}
                icon={config.icon}
                title={config.title}
                color={config.color}
                wide={config.wide}
              >
                <RawContent data={results[config.key]} />
              </ResultCard>
            );
          })}
        </div>
      ) : (
        <ResultCard icon="◈" title="Stream Output" color="from-primary to-accent" wide>
          <div className="space-y-2">
            {(results['_raw']
              ? [{ step: 'raw', content: results['_raw'] }]
              : streamLog
            ).map((entry, i) => (
              <div key={i} className="rounded-lg border border-border/30 bg-muted/30 p-3 text-sm font-mono text-muted-foreground animate-fadeIn">
                <strong className="text-primary/80">[{entry.step}]</strong>{' '}
                {typeof entry.content === 'string'
                  ? entry.content
                  : JSON.stringify(entry.content)}
              </div>
            ))}
          </div>
        </ResultCard>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <button
          onClick={onReset}
          className="group order-2 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-3 font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30 sm:order-1"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Start Over
        </button>
        <div className="order-1 text-center text-sm text-muted-foreground sm:order-2">
          ✓ Analysis complete! Export or try another idea.
        </div>
      </div>
    </div>
  );
}
