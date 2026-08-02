import { useWindowStore } from '../store/windowStore';
import { WINDOW_IDS } from '../constants/windowConfig';

const About = () => {
    const openWindow = useWindowStore((s) => s.openWindow);

    return (
        <div className="flex flex-col gap-6">
            {/* Name heading with decorative line */}
            <h1 className="text-4xl sm:text-5xl font-display text-[var(--color-text-primary)] flex items-center gap-4 flex-wrap">
                <span>Try</span>
                <span className="flex-1 h-px bg-[var(--color-border)] min-w-8" />
                <span>Catch</span>
            </h1>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-3 text-[var(--color-text-secondary)]">
                <p>
                    Bio paragraph one — who you are, what you do, based in [location]. Placeholder text
                    describing your role and specialty.
                </p>
                <p>
                    Bio paragraph two — personal touch, interests outside of code. Links like{' '}
                    <a href="#" className="text-[var(--color-accent)] underline">
                        LinkedIn
                    </a>{' '}
                    or{' '}
                    <a href="#" className="text-[var(--color-accent)] underline">
                        GitHub
                    </a>
                    .
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
                        <span>Placeholder focus item one.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Placeholder focus item two.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Placeholder focus item three.</span>
                    </li>
                </ul>
            </div>

            {/* Full Timeline teaser */}
            <div className="flex flex-col gap-2">
                <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                    FULL TIMELINE
                </span>
                <p className="text-[var(--color-text-secondary)] text-sm">
                    View my complete experience timeline in a dedicated window.
                </p>
                <button
                    onClick={() => openWindow(WINDOW_IDS.EXPERIENCE)}
                    className="self-start px-4 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] rounded text-sm font-medium hover:brightness-110 transition"
                >
                    Open Experience
                </button>
            </div>

            {/* Decorative illustration placeholder */}
            <div className="flex justify-center items-end mt-4 ">
                <div className="w-32 h-24 border-2 border-dashed border-[var(--color-border)] rounded flex items-center justify-center">
                    <span className="text-xs text-[var(--color-text-secondary)] text-center px-2">
                        Custom illustration goes here
                    </span>
                </div>
            </div>
        </div>
    );
}

export default About;