import { useWindowStore } from '../../store/windowStore';

function WindowControls({ id }) {
    const win = useWindowStore((s) => s.windows[id]);
    const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
    const closeWindow = useWindowStore((s) => s.closeWindow);

    const isMinimized = win.state === 'minimized';

    const handleClick = (e, action) => {
        e.stopPropagation();
        action(id);
    };

    const handleMinimizeToggle = (e) => {
        e.stopPropagation();
        if (isMinimized) {
            restoreWindow(id);
        } else {
            minimizeWindow(id);
        }
    };

    const buttonBase =
        'w-7 h-7 flex items-center justify-center border border-[var(--color-border)] transition hover:brightness-110 text-[var(--color-text-primary)] text-sm';

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={handleMinimizeToggle}
                className={`${buttonBase} bg-[var(--color-bg)]`}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
                &minus;
            </button>
            <button
                onClick={(e) => handleClick(e, toggleMaximize)}
                className={`${buttonBase} bg-[var(--color-bg)]`}
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