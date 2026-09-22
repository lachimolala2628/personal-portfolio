import React from 'react'

const Resume = () => {
    return (
        <div className="flex flex-col h-full gap-3">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-display text-[var(--color-text-primary)]">Resume</h1>
                <a
                    href="/resume.pdf"
                    download
                    className="px-3 py-1.5 border border-[var(--color-border)] rounded text-sm hover:bg-[var(--color-surface-elevated)] transition"
                >
                    Download ↓
                </a>
            </div>
            <iframe
                src="/resume.pdf"
                title="Resume"
                className="flex-1 w-full border border-[var(--color-border)] rounded"
            />
        </div>
    )
}

export default Resume