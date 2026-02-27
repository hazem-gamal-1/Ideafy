'use client';

import React from 'react';

interface ResultCardProps {
  icon: string;
  title: string;
  color: string;
  children: React.ReactNode;
  wide?: boolean;
}

export default function ResultCard({ icon, title, color, children, wide }: ResultCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 animate-fadeIn ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 text-2xl">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground/90">
          {children}
        </div>
      </div>
    </div>
  );
}
