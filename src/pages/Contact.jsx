import React from 'react'

const contactLinks = [
    {
        label: 'Email',
        value: 'aayushkumar1228@gmail.com',
        href: 'mailto:aayushkumar1228@gmail.com',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ayush-kumar2822',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/lachimolala2628',
    },
];

const Contact = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-display text-[var(--color-text-primary)] mb-2">Contact</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Let's connect—whether you're hiring for a frontend role, looking to collaborate on a project, or just want to discuss web development and emerging tech.
                </p>
            </div>

            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        GET IN TOUCH
                    </span>
                </div>
                <div className="flex flex-col divide-y divide-[var(--color-border)]">
                    {contactLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => window.open(link.href, link.href.startsWith('mailto:') ? '_self' : '_blank')}
                            className="px-4 py-3 flex items-center justify-between text-left hover:bg-[var(--color-surface-elevated)] transition group"
                        >
                            <div>
                                <span className="text-xs tracking-wider text-[var(--color-text-secondary)] block mb-0.5">
                                    {link.label.toUpperCase()}
                                </span>
                                {link.value && <span className="text-[var(--color-text-primary)]">{link.value}</span>}
                            </div>
                            <span className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition">
                                ↗
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[var(--color-text-secondary)] text-sm italic">
                    I typically respond within 24 hours.
                </p>
            </div>
        </div>
    )
}

export default Contact