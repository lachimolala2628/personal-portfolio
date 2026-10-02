import React from 'react'

const timeline = [
    {
        role: 'BCA Student',
        org: 'IGNOU',
        type: 'Distance Learning',
        isCurrent: true,
        dates: 'June 2024 - June 2027',
        location: 'New Delhi, India',
        description: 'Bachelor of Computer Applications. Core coursework includes Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, and Web Programming.',
    },
    {
        role: 'Frontend Developer',
        org: 'Multiple Clients',
        type: 'Freelance',
        isCurrent: false,
        dates: 'April 2023 - October 2025',
        location: 'New Delhi, India',
        description: 'Architected and deployed responsive React and JavaScript web applications for diverse clients. Owned end-to-end project lifecycles from Figma designs to production, collaborating closely with stakeholders on cross-browser compatibility, UI performance, and clean code standards.',
    },
    {
        role: 'Frontend Developer',
        org: 'Multigraphics Group · Contract',
        type: 'Oraanj — Interior Design',
        isCurrent: false,
        dates: 'April 2023 - June 2023',
        location: 'New Delhi, India',
        description: 'Engineered a mobile-first website redesign from Figma to production. Elevating the accessibility score to **97/100** by restructuring semantic HTML and optimizing render performance, while reducing UI defects by **40%** through rigorous cross-browser testing.',
    },
    {
        role: 'Web Design & Development Certification',
        org: 'Dice Academy',
        type: 'Certification',
        isCurrent: false,
        dates: 'October 2022 - April 2023',
        location: 'New Delhi, India',
        description: 'Foundational training in core web standards, UI layout principles, and frontend engineering workflows.',
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

            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        CURRENT FOCUS
                    </span>
                </div>
                <ul className="p-4 flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Pursuing a Bachelor of Computer Applications through IGNOU, balancing structured coursework with real-world project work.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Studying AI and ML fundamentals alongside the applied AI work already in Inkwell, Lume-Studio, and AI Resume Analyzer.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Shipping full-stack side projects that push into AI-powered tools and 3D on the web.</span>
                    </li>
                </ul>
            </div>

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