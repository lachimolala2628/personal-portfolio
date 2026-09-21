import { useRef, useState, useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';
import { WINDOW_IDS } from '../constants/windowConfig';

const About = () => {

    const openWindow = useWindowStore((s) => s.openWindow);
    const headingRef = useRef(null);
    const [fontSize, setFontSize] = useState(48);

    useEffect(() => {
        const el = headingRef.current;
        if (!el) return;

        const fitText = () => {
            let size = 44;
            el.style.fontSize = `${size}px`;

            while (el.scrollWidth > el.clientWidth && size > 12) {
                size -= 1;
                el.style.fontSize = `${size}px`;
            }

            setFontSize(size);
        };

        const observer = new ResizeObserver(() => {
            fitText();
        });

        observer.observe(el);
        fitText();

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <h1
                ref={headingRef}
                style={{ fontSize: `${fontSize}px` }}
                className="sticky -top-4 z-10 -mx-4 -mt-4 px-4 pt-4 pb-3 bg-[var(--color-surface)] font-display text-[var(--color-text-primary)] flex items-center gap-4 whitespace-nowrap overflow-hidden"
            >
                <span>Ayush</span>
                <span className="w-16 h-px bg-[var(--color-border)] shrink-0" />
                <span>Kumar</span>
            </h1>

            <div className="flex flex-col gap-3 text-[var(--color-text-secondary)]">
                <p>
                    Based in New Delhi, I'm a frontend developer and UI/UX designer with around 2 years of
                    freelance experience. I specialize in building clean, functional interfaces using
                    React, Next.js, and Tailwind CSS — turning ideas into products that actually feel good
                    to use.
                </p>
                <p>
                    Outside of code, I'm usually behind a camera, painting, or lost in a book — and I'm
                    always poking around new technologies just to see how they work. You can find me on{' '}
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

            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        CURRENT FOCUS
                    </span>
                </div>
                <ul className="p-4 flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Completing a self-paced BCA through IGNOU.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Building personal projects and exploring new tools in the React and Next.js ecosystem.</span>
                    </li>
                </ul>
            </div>

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

            <div className="hidden lg:flex justify-center items-end mt-4">
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