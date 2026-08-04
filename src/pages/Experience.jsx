import React from 'react'

const timeline = [
    {
        role: 'Frontend Developer',
        org: 'Multigraphics Group',
        type: 'Freelance',
        isCurrent: false,
        dates: 'Month Year - Month Year',
        location: '',
        description: 'Placeholder — built the Oraanj interior design platform frontend.',
    },
    {
        role: 'Freelance Frontend Developer',
        org: 'Self-employed',
        type: 'Freelance',
        isCurrent: true,
        dates: 'Month Year - Present',
        location: '',
        description: 'Placeholder — building client and personal projects, roughly 2 years of freelance experience.',
    },
    {
        role: 'BCA Student',
        org: 'IGNOU',
        type: 'Distance Learning',
        isCurrent: true,
        dates: 'Month Year - Present',
        location: '',
        description: 'Placeholder — self-paced Bachelor of Computer Applications degree.',
    },
];

const Experience = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-display text-[var(--color-text-primary)] mb-2">Experience</h1>
                <p className="text-[var(--color-text-secondary)]">
                    A detailed timeline of my experience, current focus, and professional growth.
                </p>
            </div>

            {/* Current Focus box */}
            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        CURRENT FOCUS
                    </span>
                </div>
                <ul className="p-4 flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Placeholder current focus item one.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Placeholder current focus item two.</span>
                    </li>
                </ul>
            </div>

            {/* Career Timeline */}
            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        CAREER TIMELINE
                    </span>
                </div>
                <div className="p-4 flex flex-col gap-4 relative">
                    {timeline.map((item, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center pt-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                                {i !== timeline.length - 1 && (
                                    <span className="w-px flex-1 bg-[var(--color-border)] mt-1" />
                                )}
                            </div>
                            <div className="border border-[var(--color-border)] rounded-md p-4 flex-1 mb-2">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-[var(--color-text-primary)] font-medium">{item.role}</span>
                                    <span className="text-[var(--color-text-secondary)] text-sm">
                                        {item.org} · {item.type}
                                    </span>
                                    {item.isCurrent && (
                                        <span className="px-2 py-0.5 bg-[var(--color-accent)] text-[var(--color-bg)] text-xs rounded">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                                    {item.dates}
                                    {item.location && ` · ${item.location}`}
                                </p>
                                <p className="text-sm text-[var(--color-text-secondary)]">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Experience