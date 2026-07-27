import { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { useWindowStore } from '../../store/windowStore';
import { WINDOW_IDS } from '../../constants/windowConfig';

function Navbar() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [time, setTime] = useState(new Date());

    const theme = useSettingsStore((s) => s.theme);
    const brightness = useSettingsStore((s) => s.brightness);
    const setTheme = useSettingsStore((s) => s.setTheme);
    const setBrightness = useSettingsStore((s) => s.setBrightness);

    const openWindow = useWindowStore((s) => s.openWindow);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleOpenSettings = () => {
        openWindow(WINDOW_IDS.SETTINGS);
        setIsDialogOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] flex items-center justify-between px-4 bg-[var(--color-bg)] border-b border-[var(--color-border)] z-[9999]">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded flex items-center justify-center">
                    <span className="text-xs font-display text-[var(--color-text-primary)]">A</span>
                </div>
            </div>

            <div className="flex items-center gap-4 relative">
                <button
                    onClick={() => setIsDialogOpen((prev) => !prev)}
                    className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition"
                    aria-label="Quick settings"
                >
                    ☀
                </button>
                <span className="text-sm text-[var(--color-text-primary)] font-body">
                    {formattedTime}
                </span>

                {isDialogOpen && (
                    <div className="absolute top-12 right-0 w-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-[var(--shadow-window)] p-4 flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-[var(--color-text-secondary)] block mb-1">
                                Brightness
                            </label>
                            <input
                                type="range"
                                min="30"
                                max="100"
                                value={brightness}
                                onChange={(e) => setBrightness(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--color-text-secondary)]">Theme</span>
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="text-xs px-2 py-1 border border-[var(--color-border)] rounded bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
                            >
                                {theme === 'dark' ? 'Dark' : 'Light'}
                            </button>
                        </div>

                        <button
                            onClick={handleOpenSettings}
                            className="text-xs text-[var(--color-text-primary)] text-left self-start hover:opacity-70 transition bg-transparent border-none p-0"
                        >
                            Open Settings...
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;