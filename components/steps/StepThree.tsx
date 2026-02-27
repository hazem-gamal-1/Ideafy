'use client';

import React from 'react';
import { ChartNoAxesCombinedIcon,Trophy ,Icon, Rocket} from 'lucide-react';
interface StepThreeProps {
  trendsMode: string;
  setTrendsMode: (mode: string) => void;
  trendsText: string;
  setTrendsText: (text: string) => void;
  competitorsMode: string;
  setCompetitorsMode: (mode: string) => void;
  competitorsText: string;
  setCompetitorsText: (text: string) => void;
  onBack: () => void;
  onAnalyze: () => void;
}

export default function StepThree({
  trendsMode,
  setTrendsMode,
  trendsText,
  setTrendsText,
  competitorsMode,
  setCompetitorsMode,
  competitorsText,
  setCompetitorsText,
  onBack,
  onAnalyze,
}: StepThreeProps) {
  return (
    <div className="animate-slideUp mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1">
          <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 03</p>
        </div>
        <h2 className="mb-3 text-5xl font-bold tracking-tight text-foreground">
          Configure <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">analysis</span>
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Choose how the AI collects market context — automatically or with your custom input.
        </p>
      </div>

      {/* Config Cards */}
      <div className="space-y-6">
        {/* Trends Card */}
        <ConfigCard
          icon={<ChartNoAxesCombinedIcon className="h-10 w-10 text-primary" />}
          title="Market Trends"
          mode={trendsMode}
          setMode={setTrendsMode}
          customText={trendsText}
          setCustomText={setTrendsText}
          autoNote="AI will automatically search for relevant market trends based on your idea."
          customPlaceholder="e.g. AI adoption rising 40% YoY, SMB SaaS market growing..."
        />

        {/* Competitors Card */}
        <ConfigCard
          icon={<Trophy className="h-10 w-10 text-primary" />}
          title="Market Competitors"
          mode={competitorsMode}
          setMode={setCompetitorsMode}
          customText={competitorsText}
          setCustomText={setCompetitorsText}
          autoNote="AI will automatically identify and analyze your key competitors."
          customPlaceholder="e.g. Notion, Monday.com, Asana, ClickUp..."
        />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between gap-4">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back
        </button>
        <button
          onClick={onAnalyze}
          className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-8 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
        >
          Run Analysis
         <Rocket className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

interface ConfigCardProps {
  icon: string|any;
  title: string;
  mode: string;
  setMode: (mode: string) => void;
  customText: string;
  setCustomText: (text: string) => void;
  autoNote: string;
  customPlaceholder: string;
}

function ConfigCard({
  icon,
  title,
  mode,
  setMode,
  customText,
  setCustomText,
  autoNote,
  customPlaceholder,
}: ConfigCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>

        {/* Mode Toggle */}
        <div className="mb-5 inline-flex gap-2 rounded-lg border border-border/50 bg-muted/30 p-1">
          <button
            onClick={() => setMode('auto')}
            className={`rounded-md px-4 py-2 font-semibold transition-all duration-200 ${
              mode === 'auto'
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Auto Search
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`rounded-md px-4 py-2 font-semibold transition-all duration-200 ${
              mode === 'custom'
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Custom Input
          </button>
        </div>

        {/* Content */}
        {mode === 'custom' ? (
          <textarea
            placeholder={customPlaceholder}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-border/50 bg-background/50 p-4 text-foreground placeholder-muted-foreground/60 resize-none transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        ) : (
          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{autoNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
