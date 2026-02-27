'use client';

import React, { RefObject } from 'react';

interface StepTwoProps {
  file: File | null;
  setFile: (file: File | null) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  dropRef: RefObject<HTMLDivElement>;
  onDrop: (e: React.DragEvent) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepTwo({
  file,
  setFile,
  fileInputRef,
  dropRef,
  onDrop,
  onBack,
  onNext,
}: StepTwoProps) {
  const isValid = file !== null;

  return (
    <div className="animate-slideUp mx-auto max-w-2xl px-4 sm:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1">
          <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 02</p>
        </div>
        <h2 className="mb-3 text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Upload your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">knowledge base</span>
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Attach a PDF with market research, competitor analysis, or any context you want the AI to reason over.
        </p>
      </div>

      {/* Dropzone */}
      <div
        ref={dropRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          file
            ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15'
            : 'border-border/50 bg-muted/20 hover:border-primary hover:bg-primary/5'
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file ? (
          <div className="animate-fadeIn flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-3xl shadow-lg shadow-primary/30">
              ✓
            </div>
            <div>
              <p className="font-semibold text-foreground">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted/80"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 text-4xl transition-all group-hover:bg-primary/10">
              📄
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Drop PDF here or <span className="text-primary">browse</span>
              </p>
              <p className="text-sm text-muted-foreground">PDF files only, up to 50MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBack}
          className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 sm:px-8 py-3 font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30 order-2 sm:order-1"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 sm:px-8 py-3 font-semibold transition-all duration-300 order-1 sm:order-2 ${
            isValid
              ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-95'
              : 'cursor-not-allowed bg-muted text-muted-foreground'
          }`}
        >
          Continue
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
