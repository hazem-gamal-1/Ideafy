'use client';

import React from 'react';

interface StreamingStateProps {
  streamLog: Array<any>;
}

export default function StreamingState({ streamLog }: StreamingStateProps) {
  return (
    <div className="animate-slideUp space-y-10">
      {/* Header */}
      <div className="space-y-10">
        <div className="flex flex-col items-center gap-8">
          <div className="relative flex h-40 w-40 items-center justify-center">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-3xl animate-pulse-glow" />
            
            {/* Rotating rings */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent animate-spin-smooth" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-6 rounded-full border-2 border-transparent border-b-primary border-l-secondary animate-spin-smooth" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
            
            {/* Center spinning loader */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 shadow-2xl shadow-primary/40 backdrop-blur-sm border border-primary/30">
              <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary border-r-secondary animate-spin-smooth" style={{ animationDuration: '2.5s' }} />
            </div>
          </div>
          
          <div className="text-center space-y-4 max-w-2xl">
            <h2 className="text-5xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-shift">
              Analyzing your idea...
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fadeIn" style={{ animationDelay: '200ms' }}>
              We're examining your startup from every angle. This may take a minute.
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mx-auto w-full max-w-2xl space-y-3">
          <div className="rounded-full bg-gradient-to-r from-muted via-muted to-muted/50 h-4 overflow-hidden shadow-lg shadow-primary/15 border border-primary/15 backdrop-blur-sm">
            <div className="h-full w-full bg-gradient-to-r from-primary via-secondary via-accent to-primary bg-[length:200%_100%] animate-shimmer" />
          </div>
          <p className="text-center text-xs text-muted-foreground font-medium tracking-widest uppercase">Processing...</p>
        </div>
      </div>

      {/* Log Display */}
      <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-card/60 to-card/40 p-6 backdrop-blur-md shadow-xl shadow-primary/10">
        <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Real-Time Analysis Log</h3>
        <div className="space-y-2.5 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {streamLog.slice(-12).map((entry, i) => (
            <div 
              key={i} 
              className="flex gap-3 rounded-lg border border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5 p-4 text-sm animate-slideRight hover:border-primary/20 transition-all duration-300 group"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="font-mono font-bold text-primary/90 min-w-fit bg-primary/10 px-2 py-1 rounded group-hover:bg-primary/20 transition-colors">
                [{entry.step}]
              </span>
              <span className="flex-1 text-muted-foreground/85 group-hover:text-muted-foreground transition-colors">
                {typeof entry.content === 'string'
                  ? entry.content.slice(0, 130)
                  : JSON.stringify(entry.content).slice(0, 130)}
                {(typeof entry.content === 'string' ? entry.content : JSON.stringify(entry.content)).length > 130 ? '...' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
