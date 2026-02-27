'use client';

import React from 'react';
import { SparkleIcon } from 'lucide-react';
const steps = ['Describe', 'Upload', 'Configure', 'Results'];

export default function Header({ currentStep }: { currentStep: number }) {
  const isIntroStep = currentStep === -1;

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-gradient-to-b from-background via-background/97 to-background/85 backdrop-blur-2xl shadow-sm shadow-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-default">
            <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground shadow-xl shadow-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/70 group-hover:scale-115 group-hover:-rotate-3 border border-primary/20">
              <SparkleIcon className="h-10 w-10 sm:h-8 sm:w-8" />
              
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-foreground">Ideafy</h1>
              <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">Startup Intelligence</p>
            </div>
          </div>

          {/* Progress Steps - Desktop (Hidden on Intro) */}
          {!isIntroStep && (
            <div className="hidden gap-4 sm:gap-6 md:flex lg:gap-8">
              {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-1.5 sm:gap-2 animate-slideRight" style={{ animationDelay: `${i * 50}ms` }}>
                <div
                  className={`relative h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                    i < currentStep
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/40 scale-100'
                      : i === currentStep
                        ? 'bg-primary/10 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg shadow-primary/20 animate-pulse-glow scale-105'
                        : 'border-2 border-border/60 text-muted-foreground bg-muted/20 hover:border-primary/30'
                  }`}
                >
                  {i < currentStep ? (
                    <span className="text-base sm:text-lg animate-scaleIn">✓</span>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold tracking-wider uppercase transition-all duration-300 hidden sm:inline ${
                    i === currentStep
                      ? 'text-primary opacity-100 font-bold'
                      : i < currentStep
                        ? 'text-primary/60 font-medium'
                        : 'text-muted-foreground opacity-60'
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
            </div>
          )}

          {/* Progress - Mobile (Hidden on Intro) */}
          {!isIntroStep && (
            <div className="flex sm:hidden">
              <span className="text-xs sm:text-sm font-bold text-primary">
                {currentStep + 1}/{steps.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
