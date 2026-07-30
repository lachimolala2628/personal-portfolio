import { useWindowStore } from '../../store/windowStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { WINDOW_IDS, windowConfig } from '../../constants/windowConfig';

const taskbarItems = Object.values(WINDOW_IDS);

const Taskbar = () => {
    const windows = useWindowStore((s) => s.windows);
    const focusedWindow = useWindowStore((s) => s.focusedWindow);
    const openWindow = useWindowStore((s) => s.openWindow);
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const { isMobile } = useIsMobile();

    const isAnyWindowMaximized = Object.values(windows).some(
        (win) => win.isOpen && win.state === 'maximized'
    );

    if (isAnyWindowMaximized) return null;

    const visibleItems = isMobile
        ? taskbarItems.filter((id) => id !== WINDOW_IDS.SETTINGS)
        : taskbarItems;

    const handleIconClick = (id) => {
        const win = windows[id];
        if (!win.isOpen) {
            openWindow(id, isMobile);
        } else if (win.state === 'minimized') {
            restoreWindow(id);
        } else {
            focusWindow(id);
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 shadow-[var(--shadow-window)] z-[9999]">
            {visibleItems.map((id) => {
                const win = windows[id];
                const isActive = focusedWindow === id && win.isOpen && win.state !== 'minimized';

                return (
                    <button
                        key={id}
                        onClick={() => handleIconClick(id)}
                        className="relative w-10 h-10 flex items-center justify-center bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded hover:brightness-110 transition"
                        aria-label={windowConfig[id].title}
                    >
                        <span className="text-xs text-[var(--color-text-primary)] font-display">
                            {windowConfig[id].title[0]}
                        </span>

                        {win.isOpen && (
                            <span
                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-orange-500' : 'bg-[var(--color-text-secondary)]'
                                    }`}
                                aria-hidden="true"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default Taskbar;