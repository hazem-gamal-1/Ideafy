'use client';

import { TrendingUp, Scale, Layers, FileUp, Settings, BarChart3, ArrowRight } from 'lucide-react';

interface IntroStepProps {
  onStart: () => void;
}

export default function IntroStep({ onStart }: IntroStepProps) {
  return (
    <div className="animate-slideUp mx-auto max-w-4xl space-y-12 sm:space-y-16 py-8 sm:py-12 px-4 sm:px-0">
      {/* Hero Section */}
      <div className="space-y-6 sm:space-y-8 text-center">
        <div className="animate-fadeIn inline-block rounded-full bg-gradient-to-r from-primary/15 to-accent/15 px-4 py-2 backdrop-blur-lg border border-primary/30 shadow-lg shadow-primary/10">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">AI-Powered Intelligence</p>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-tight space-y-2 sm:space-y-3">
          <span className="animate-slideDown block">Validate.</span>
          <span className="animate-slideDown block" style={{ animationDelay: '100ms' }}>Analyze.</span>
          <span className="animate-slideDown block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-shift" style={{ animationDelay: '200ms' }}>Strategize.</span>
        </h1>

        <p className="animate-fadeIn mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: '300ms' }}>
          Ideafy transforms your startup idea into comprehensive, decision-ready intelligence. Upload your knowledge base and describe your vision — our multi-agent AI system handles the rest.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            Icon: TrendingUp,
            title: 'Idea Validation',
            description: 'Market potential scoring, competition analysis, and risk identification.',
          },
          {
            Icon: Scale,
            title: 'Legal Analysis',
            description: 'Identify legal risks, compliance considerations, and recommended actions.',
          },
          {
            Icon: Layers,
            title: 'SWOT & Strategy',
            description: 'Comprehensive strengths, weaknesses, opportunities, threats, and scenarios.',
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="group animate-slideUp rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            style={{ animationDelay: `${200 + i * 100}ms` }}
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/50 transform group-hover:rotate-6">
              <feature.Icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Overview Section */}
      <div className="space-y-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 animate-slideUp" style={{ animationDelay: '500ms' }}>
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">What is Ideafy?</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ideafy is an AI-powered platform designed to evaluate startup ideas with clarity, structure, and strategic depth. By orchestrating specialized AI agents, Ideafy transforms a simple idea and supporting knowledge base into a comprehensive, decision-ready analysis. Upload your documents, describe your startup, and receive a complete, structured evaluation streamed in real time.
          </p>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="space-y-6 animate-slideUp" style={{ animationDelay: '600ms' }}>
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Architecture</h2>
          <p className="text-muted-foreground">Multi-agent AI system coordinated for comprehensive analysis</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-5 items-center">
          <div className="bg-primary/10 rounded-xl p-4 sm:p-6 text-center border border-primary/20">
            <p className="text-sm sm:text-base font-bold text-foreground">Your Input</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Idea + PDF Knowledge Base</p>
          </div>
          
          <div className="text-2xl text-primary text-center hidden md:block">→</div>
          
          <div className="bg-accent/10 rounded-xl p-4 sm:p-6 text-center border border-accent/20">
            <p className="text-sm sm:text-base font-bold text-foreground">Orchestrator</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Coordinates all agents</p>
          </div>
          
          <div className="text-2xl text-primary text-center hidden md:block">→</div>
          
          <div className="bg-secondary/10 rounded-xl p-4 sm:p-6 text-center border border-secondary/20">
            <p className="text-sm sm:text-base font-bold text-foreground">Specialized Agents</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Validation, Legal, SWOT</p>
          </div>
        </div>
      </div>

      {/* Core Capabilities Section */}
      <div className="space-y-6 animate-slideUp" style={{ animationDelay: '700ms' }}>
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Core Capabilities</h2>
          <p className="text-muted-foreground">Structured intelligence across multiple dimensions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <div className="mb-4 w-10 h-10 text-primary"><TrendingUp className="w-10 h-10" /></div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">Idea Validation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Market potential scoring (0–10)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Competition intensity analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Risk identification</span>
              </li>
            </ul>
          </div>

          <div className="group rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 sm:p-8 hover:border-secondary/50 hover:shadow-lg transition-all duration-300">
            <div className="mb-4 w-10 h-10 text-secondary"><Scale className="w-10 h-10" /></div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">Legal Analysis</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>Top legal risks identification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>Compliance considerations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>Recommended action steps</span>
              </li>
            </ul>
          </div>

          <div className="group rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-6 sm:p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
            <div className="mb-4 w-10 h-10 text-accent"><Layers className="w-10 h-10" /></div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">SWOT & Strategy</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Strengths & weaknesses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Opportunities & threats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Strategic scenarios</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-10">
        <div className="animate-slideUp text-center" style={{ animationDelay: '500ms' }}>
          <h2 className="text-5xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-lg text-muted-foreground">4 simple steps to comprehensive startup analysis</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 relative">
          {/* Connecting lines */}
          <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />
          
          {[
            { number: '1', title: 'Describe Your Idea', Icon: BarChart3 },
            { number: '2', title: 'Upload Knowledge Base', Icon: FileUp },
            { number: '3', title: 'Configure Analysis', Icon: Settings },
            { number: '4', title: 'Get Results', Icon: ArrowRight },
          ].map((step, idx) => (
            <div key={step.number} className="animate-slideUp text-center space-y-4 relative z-10" style={{ animationDelay: `${600 + idx * 100}ms` }}>
              <div className="flex justify-center">
                <div className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white font-bold text-2xl shadow-xl shadow-primary/40 transition-all duration-300 hover:scale-125 hover:shadow-2xl hover:shadow-primary/60 cursor-default animate-pulse-glow">
                  {step.number}
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{step.title}</p>
                <div className="mt-2 flex justify-center animate-bounce-subtle">
                  <step.Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="animate-slideUp text-center pt-8 sm:pt-12" style={{ animationDelay: '900ms' }}>
        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary via-accent to-secondary px-6 sm:px-12 py-3 sm:py-5 text-base sm:text-lg font-bold text-primary-foreground shadow-2xl shadow-primary/50 transition-all duration-500 hover:shadow-3xl hover:shadow-primary/70 hover:-translate-y-1 active:scale-95 overflow-hidden border border-primary/30 w-full sm:w-auto"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2 sm:gap-3 justify-center">
            Start Analysis
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-125" />
          </span>
        </button>
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground animate-fadeIn" style={{ animationDelay: '1000ms' }}>No credit card required. Free analysis included.</p>
      </div>
    </div>
  );
}
