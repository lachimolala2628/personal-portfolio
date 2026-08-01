import { useState, useEffect } from 'react';

const FIRST_VISIT_DURATION = 1800;
const RETURN_VISIT_DURATION = 500;

const BootScreen = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
    const duration = isFirstVisit ? FIRST_VISIT_DURATION : RETURN_VISIT_DURATION;

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadeOut(true), duration - 200);
        const completeTimer = setTimeout(() => onComplete(), duration);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [duration, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--color-bg)] transition-opacity duration-200 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="w-12 h-12 bg-[var(--color-accent)] border border-[var(--color-border)] rounded flex items-center justify-center mb-4">
                <span className="text-2xl font-display text-[var(--color-bg)]">A</span>
            </div>
            {isFirstVisit && (
                <>
                    <p className="text-sm text-[var(--color-text-secondary)] font-body tracking-widest">
                        BOOTING SYSTEM...
                    </p>
                    <div className="w-48 h-1 bg-[var(--color-surface-elevated)] rounded-full mt-4 overflow-hidden">
                        <div
                            className="h-full bg-[var(--color-accent)] rounded-full"
                            style={{
                                animation: `bootProgress ${FIRST_VISIT_DURATION}ms linear forwards`,
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default BootScreen;