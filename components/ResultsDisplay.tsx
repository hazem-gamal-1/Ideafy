'use client';

import React, { useMemo } from 'react';
import {
  Lightbulb, Scale, BarChart2, BrainCircuit,
  AlertTriangle, TrendingUp, TrendingDown, Compass,
  ShieldAlert, Milestone, ArrowLeft, CheckCircle2,
  Terminal, Diamond,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface IdeaValidation {
  market_score: number | null;
  competition_score: number | null;
  risks: string[];
  summary: string;
}

interface LegalAnalysis {
  legal_risks: string[];
  recommended_steps: string[];
  summary: string;
}

interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  scenarios: string[];
  summary: string;
}

interface ParsedResults {
  idea_validation: IdeaValidation | null;
  legal_analysis: LegalAnalysis | null;
  swot_analysis: SwotAnalysis | null;
  overall_summary: string;
}

interface ResultsDisplayProps {
  results: any;
  streamLog: Array<any>;
  onReset: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSER — handles Python-repr strings, raw stream text, and structured objects
// ─────────────────────────────────────────────────────────────────────────────

function flattenToString(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(flattenToString).join(' ');
  if (typeof value === 'object') return Object.values(value).map(flattenToString).join(' ');
  return String(value);
}

function extractList(text: string, key: string): string[] {
  const re = new RegExp(`${key}=\\[([^\\]]*?)\\]`);
  const m = text.match(re);
  if (!m) return [];
  return m[1]
    .split(/,\s*/)
    .map(s => s.replace(/^['"\s]+|['"\s]+$/g, '').trim())
    .filter(Boolean);
}

function extractStr(text: string, key: string): string {
  // handles both single and double quotes, and multi-sentence values
  const re = new RegExp(`${key}='((?:[^'\\\\]|\\\\.)*)'\s*(?:[,)]|$)`);
  const m = text.match(re);
  if (m) return m[1].trim();
  const re2 = new RegExp(`${key}="((?:[^"\\\\]|\\\\.)*)"`);
  const m2 = text.match(re2);
  return m2 ? m2[1].trim() : '';
}

function extractFloat(text: string, key: string): number | null {
  const m = text.match(new RegExp(`${key}=([\\d.]+)`));
  return m ? parseFloat(m[1]) : null;
}

function parseResults(results: any): ParsedResults {
  // ── Case 1: clean nested object (ideal) ──
  if (
    results &&
    typeof results === 'object' &&
    !Array.isArray(results) &&
    results.idea_validation &&
    typeof results.idea_validation === 'object' &&
    !Array.isArray(results.idea_validation)
  ) {
    const iv = results.idea_validation;
    const la = results.legal_analysis ?? {};
    const sw = results.swot_analysis ?? {};
    return {
      idea_validation: {
        market_score: iv.market_score ?? null,
        competition_score: iv.competition_score ?? null,
        risks: Array.isArray(iv.risks) ? iv.risks : [],
        summary: iv.summary ?? '',
      },
      legal_analysis: {
        legal_risks: Array.isArray(la.legal_risks) ? la.legal_risks : [],
        recommended_steps: Array.isArray(la.recommended_steps) ? la.recommended_steps : [],
        summary: la.summary ?? '',
      },
      swot_analysis: {
        strengths:     Array.isArray(sw.strengths)     ? sw.strengths     : [],
        weaknesses:    Array.isArray(sw.weaknesses)    ? sw.weaknesses    : [],
        opportunities: Array.isArray(sw.opportunities) ? sw.opportunities : [],
        threats:       Array.isArray(sw.threats)       ? sw.threats       : [],
        scenarios:     Array.isArray(sw.scenarios)     ? sw.scenarios     : [],
        summary:       sw.summary ?? '',
      },
      overall_summary: typeof results.overall_summary === 'string'
        ? results.overall_summary
        : flattenToString(results.overall_summary),
    };
  }

  // ── Case 2: everything is flat raw text / Python repr ──
  const raw = flattenToString(results);

  if (!raw) return { idea_validation: null, legal_analysis: null, swot_analysis: null, overall_summary: '' };

  // Extract all summary= occurrences in order
  const summaryRe = /summary='((?:[^'\\]|\\.)*)'/g;
  const summaries: string[] = [];
  let sm: RegExpExecArray | null;
  while ((sm = summaryRe.exec(raw)) !== null) summaries.push(sm[1].trim());

  const overallMatch = raw.match(/overall_summary='((?:[^'\\]|\\.)*)'/);
  const overallSummary = overallMatch ? overallMatch[1].trim() : (summaries[3] ?? '');

  const idea_validation: IdeaValidation = {
    market_score:      extractFloat(raw, 'market_score'),
    competition_score: extractFloat(raw, 'competition_score'),
    risks:             extractList(raw, 'risks'),
    summary:           summaries[0] ?? '',
  };

  const legal_analysis: LegalAnalysis = {
    legal_risks:        extractList(raw, 'legal_risks'),
    recommended_steps:  extractList(raw, 'recommended_steps'),
    summary:            summaries[1] ?? '',
  };

  const swot_analysis: SwotAnalysis = {
    strengths:     extractList(raw, 'strengths'),
    weaknesses:    extractList(raw, 'weaknesses'),
    opportunities: extractList(raw, 'opportunities'),
    threats:       extractList(raw, 'threats'),
    scenarios:     extractList(raw, 'scenarios'),
    summary:       summaries[2] ?? '',
  };

  const hasData =
    idea_validation.market_score !== null ||
    idea_validation.risks.length > 0 ||
    legal_analysis.legal_risks.length > 0 ||
    swot_analysis.strengths.length > 0;

  return {
    idea_validation: hasData ? idea_validation : null,
    legal_analysis:  hasData ? legal_analysis  : null,
    swot_analysis:   hasData ? swot_analysis   : null,
    overall_summary: overallSummary,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVE UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ScoreRing({ score, max = 10, colorClass, label }: {
  score: number; max?: number; colorClass: string; label: string;
}) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (score / max) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center w-[72px] h-[72px]">
        <svg className="absolute inset-0 -rotate-90" width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor"
            strokeWidth="5" className="text-muted/25" />
          <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor"
            strokeWidth="5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            className={colorClass} style={{ transition: 'stroke-dasharray 1.2s ease' }} />
        </svg>
        <div className="flex flex-col items-center leading-none">
          <span className="text-lg font-black text-foreground">{score}</span>
          <span className="text-[9px] text-muted-foreground/50 font-medium">/10</span>
        </div>
      </div>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const TAG_CONFIG: Record<string, { cls: string; Icon: React.ElementType }> = {
  risk:        { cls: 'bg-red-500/10 text-red-400 border-red-500/20',            Icon: AlertTriangle },
  strength:    { cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', Icon: TrendingUp    },
  weakness:    { cls: 'bg-orange-500/10 text-orange-400 border-orange-500/20',   Icon: TrendingDown  },
  opportunity: { cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20',         Icon: Compass       },
  threat:      { cls: 'bg-red-500/10 text-red-400 border-red-500/20',            Icon: ShieldAlert   },
  scenario:    { cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20',   Icon: Milestone     },
  default:     { cls: 'bg-muted/40 text-muted-foreground border-border/30',      Icon: Diamond       },
};

function Tag({ children, variant = 'default' }: {
  children: React.ReactNode; variant?: keyof typeof TAG_CONFIG;
}) {
  const { cls, Icon } = TAG_CONFIG[variant] ?? TAG_CONFIG.default;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cls}`}>
      <Icon size={10} strokeWidth={2.5} />
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2.5">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-border/25 my-5" />;
}

function Card({ icon, title, accent, children, wide }: {
  icon: React.ReactNode; title: string; accent: string;
  children: React.ReactNode; wide?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/70 to-card/30 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg ${wide ? 'md:col-span-2' : ''}`}>
      <div className={`h-[3px] w-full bg-gradient-to-r ${accent}`} />
      <div className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50">
            {icon}
          </div>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION CARDS
// ─────────────────────────────────────────────────────────────────────────────

function IdeaValidationCard({ data }: { data: IdeaValidation }) {
  return (
    <Card icon={<Lightbulb size={18} className="text-blue-400" />}
      title="Idea Validation" accent="from-blue-500 to-cyan-500">

      {(data.market_score !== null || data.competition_score !== null) && (
        <>
          <SectionLabel>Scores</SectionLabel>
          <div className="flex gap-6 mb-1">
            {data.market_score !== null && (
              <ScoreRing score={data.market_score} colorClass="text-blue-400" label="Market" />
            )}
            {data.competition_score !== null && (
              <ScoreRing score={data.competition_score} colorClass="text-cyan-400" label="Competition" />
            )}
          </div>
          <Divider />
        </>
      )}

      {data.risks.length > 0 && (
        <>
          <SectionLabel>Key Risks</SectionLabel>
          <div className="flex flex-wrap gap-2 mb-1">
            {data.risks.map((r, i) => <Tag key={i} variant="risk">{r}</Tag>)}
          </div>
          <Divider />
        </>
      )}

      {data.summary && (
        <>
          <SectionLabel>Summary</SectionLabel>
          <p className="leading-relaxed text-muted-foreground/90">{data.summary}</p>
        </>
      )}
    </Card>
  );
}

function LegalCard({ data }: { data: LegalAnalysis }) {
  return (
    <Card icon={<Scale size={18} className="text-amber-400" />}
      title="Legal Analysis" accent="from-amber-500 to-orange-500">

      {data.legal_risks.length > 0 && (
        <>
          <SectionLabel>Legal Risks</SectionLabel>
          <ul className="space-y-2.5 mb-1">
            {data.legal_risks.map((r, i) => (
              <li key={i} className="flex gap-2.5 text-muted-foreground/90 leading-relaxed">
                <Diamond size={9} className="mt-[5px] text-orange-400 flex-shrink-0 fill-orange-400/60" />
                {r}
              </li>
            ))}
          </ul>
          <Divider />
        </>
      )}

      {data.recommended_steps.length > 0 && (
        <>
          <SectionLabel>Recommended Steps</SectionLabel>
          <ol className="space-y-2.5 mb-1">
            {data.recommended_steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground/90 leading-relaxed">
                <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <Divider />
        </>
      )}

      {data.summary && (
        <>
          <SectionLabel>Summary</SectionLabel>
          <p className="leading-relaxed text-muted-foreground/90">{data.summary}</p>
        </>
      )}
    </Card>
  );
}

function SwotCard({ data }: { data: SwotAnalysis }) {
  const quadrants = [
    { label: 'Strengths',     items: data.strengths,     variant: 'strength'    as const, Icon: TrendingUp,  bg: 'bg-emerald-500/5 border-emerald-500/15' },
    { label: 'Weaknesses',    items: data.weaknesses,    variant: 'weakness'    as const, Icon: TrendingDown, bg: 'bg-orange-500/5  border-orange-500/15'  },
    { label: 'Opportunities', items: data.opportunities, variant: 'opportunity' as const, Icon: Compass,      bg: 'bg-blue-500/5    border-blue-500/15'    },
    { label: 'Threats',       items: data.threats,       variant: 'threat'      as const, Icon: ShieldAlert,  bg: 'bg-red-500/5     border-red-500/15'     },
  ];

  return (
    <Card icon={<BarChart2 size={18} className="text-purple-400" />}
      title="SWOT Analysis" accent="from-purple-500 to-pink-500">

      <div className="grid grid-cols-2 gap-2.5 mb-1">
        {quadrants.map(({ label, items, variant, Icon, bg }) => (
          <div key={label} className={`rounded-xl border p-3 space-y-2 ${bg}`}>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              <Icon size={10} strokeWidth={2.5} /> {label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.length > 0
                ? items.map((item, i) => <Tag key={i} variant={variant}>{item}</Tag>)
                : <span className="text-xs text-muted-foreground/30 italic">—</span>
              }
            </div>
          </div>
        ))}
      </div>

      {data.scenarios.length > 0 && (
        <>
          <Divider />
          <SectionLabel>Future Scenarios</SectionLabel>
          <ul className="space-y-2 mb-1">
            {data.scenarios.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-xs text-muted-foreground/90 leading-relaxed">
                <Milestone size={11} className="mt-0.5 text-purple-400 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </>
      )}

      {data.summary && (
        <>
          <Divider />
          <SectionLabel>Summary</SectionLabel>
          <p className="leading-relaxed text-muted-foreground/90">{data.summary}</p>
        </>
      )}
    </Card>
  );
}

function OverallSummaryCard({ text }: { text: string }) {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()).filter(Boolean) ?? [text];
  return (
    <Card icon={<BrainCircuit size={18} className="text-emerald-400" />}
      title="Overall Summary" accent="from-emerald-500 to-teal-500" wide>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sentences.map((s, i) => (
          <div key={i} className="rounded-xl border border-border/20 bg-muted/15 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground/90">{s}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RawFallbackCard({ results, streamLog }: { results: any; streamLog: any[] }) {
  const entries = results['_raw']
    ? [{ step: 'raw', content: results['_raw'] }]
    : streamLog;
  return (
    <Card icon={<Terminal size={18} className="text-primary" />}
      title="Stream Output" accent="from-primary to-accent" wide>
      <div className="space-y-2 font-mono">
        {entries.map((e, i) => (
          <div key={i} className="rounded-lg border border-border/30 bg-muted/30 p-3 text-xs text-muted-foreground">
            <strong className="text-primary/80">[{e.step}]</strong>{' '}
            {typeof e.content === 'string' ? e.content : JSON.stringify(e.content)}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function ResultsDisplay({ results, streamLog, onReset }: ResultsDisplayProps) {
  const parsed = useMemo(() => parseResults(results), [results]);

  const hasStructured =
    parsed.idea_validation !== null ||
    parsed.legal_analysis  !== null ||
    parsed.swot_analysis   !== null ||
    !!parsed.overall_summary;

  return (
    <div className="animate-slideUp space-y-10">

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1">
          <CheckCircle2 size={12} className="text-primary" />
          <p className="text-xs font-bold tracking-wider text-primary uppercase">Analysis Complete</p>
        </div>
        <h2 className="text-5xl font-bold tracking-tight text-foreground">
          Your{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            results
          </span>
        </h2>
      </div>

      {/* Results */}
      {hasStructured ? (
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            {parsed.idea_validation && <IdeaValidationCard data={parsed.idea_validation} />}
            {parsed.legal_analysis   && <LegalCard          data={parsed.legal_analysis}  />}
            {parsed.swot_analysis    && <SwotCard           data={parsed.swot_analysis}   />}
          </div>
          {parsed.overall_summary && (
            <OverallSummaryCard text={parsed.overall_summary} />
          )}
        </div>
      ) : (
        <RawFallbackCard results={results} streamLog={streamLog} />
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-border/30">
        <button
          onClick={onReset}
          className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border px-7 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Start Over
        </button>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 size={13} className="text-emerald-400" />
          Analysis complete — export or try another idea.
        </p>
      </div>

    </div>
  );
}