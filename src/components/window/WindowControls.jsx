import { useWindowStore } from '../../store/windowStore';

function WindowControls({ id }) {
    const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
    const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
    const closeWindow = useWindowStore((s) => s.closeWindow);

    const handleClick = (e, action) => {
        e.stopPropagation();
        action(id);
    };

    const buttonBase =
        'w-7 h-7 flex items-center justify-center border border-[var(--color-border)] transition hover:brightness-110 text-[var(--color-text-primary)] text-sm';

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={(e) => handleClick(e, minimizeWindow)}
                className={`${buttonBase} bg-[var(--color-accent)]`}
                aria-label="Minimize"
            >
                &minus;
            </button>
            <button
                onClick={(e) => handleClick(e, toggleMaximize)}
                className={`${buttonBase} bg-[var(--color-surface-elevated)]`}
                aria-label="Maximize"
            >
                <span className="w-2.5 h-2.5 border border-current" />
            </button>
            <button
                onClick={(e) => handleClick(e, closeWindow)}
                className={`${buttonBase} bg-[var(--color-bg)]`}
                aria-label="Close"
            >
                &times;
            </button>
        </div>
    );
}

export default WindowControls;