'use client';

import React from 'react';

interface RawContentProps {
  data: any;
}

export default function RawContent({ data }: RawContentProps) {
  if (typeof data === 'string') {
    return <p className="leading-relaxed whitespace-pre-wrap">{data}</p>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="animate-fadeIn">
            {typeof item === 'object' ? (
              <pre className="rounded-lg border border-border/30 bg-muted/30 p-4 text-xs overflow-x-auto leading-relaxed">
                {JSON.stringify(item, null, 2)}
              </pre>
            ) : (
              <p className="leading-relaxed">{item}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([k, v]: [string, any]) => (
          <div key={k} className="rounded-lg border border-border/30 bg-muted/20 p-4 space-y-2 animate-fadeIn">
            <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
              {k.replace(/_/g, ' ')}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {Array.isArray(v) ? v.join(', ') : String(v)}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <pre className="rounded-lg border border-border/30 bg-muted/30 p-4 text-xs overflow-x-auto leading-relaxed">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
