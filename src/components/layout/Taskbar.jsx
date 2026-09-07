import { useState } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { WINDOW_IDS, windowConfig } from '../../constants/windowConfig';
import { PiBagSimpleThin } from "react-icons/pi";
import { CiSquareAlert } from "react-icons/ci";
import { PiListBulletsLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { TfiHelpAlt } from "react-icons/tfi";

const taskbarItems = Object.values(WINDOW_IDS);

const iconMap = {
    [WINDOW_IDS.ABOUT]: CiSquareAlert,
    [WINDOW_IDS.WORK]: PiBagSimpleThin,
    [WINDOW_IDS.EXPERIENCE]: PiListBulletsLight,
    [WINDOW_IDS.CONTACT]: CiMail,
    [WINDOW_IDS.SETTINGS]: IoSettingsOutline,
    [WINDOW_IDS.HELP]: TfiHelpAlt,
};

const Taskbar = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const windows = useWindowStore((s) => s.windows);
    const focusedWindow = useWindowStore((s) => s.focusedWindow);
    const openWindow = useWindowStore((s) => s.openWindow);
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const isTaskbarVisible = useWindowStore((s) => s.isTaskbarVisible);
    const { isMobile, isTouchDevice } = useIsMobile();

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

    const shouldHide = isTouchDevice && !isTaskbarVisible;

    return (
        <div
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 shadow-[var(--shadow-window)] z-[9999] transition-all duration-300 ${shouldHide ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
                }`}
        >
            {visibleItems.map((id) => {
                const win = windows[id];
                const isActive = focusedWindow === id && win.isOpen && win.state !== 'minimized';

                return (
                    <button
                        key={id}
                        onClick={() => handleIconClick(id)}
                        onMouseEnter={() => setHoveredId(id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative w-10 h-10 flex items-center justify-center bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded hover:brightness-110 transition"
                        aria-label={windowConfig[id].title}
                    >
                        {(() => {
                            const Icon = iconMap[id];
                            return <Icon className="text-sm text-[var(--color-text-primary)]" />;
                        })()}

                        {win.isOpen && (
                            <span
                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-orange-500' : 'bg-[var(--color-text-secondary)]'
                                    }`}
                                aria-hidden="true"
                            />
                        )}

                        {hoveredId === id && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs text-[var(--color-text-primary)] shadow-[var(--shadow-window)] pointer-events-none">
                                {windowConfig[id].title}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-surface)] border-r border-b border-[var(--color-border)] rotate-45" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default Taskbar;