import { useSettingsStore } from '../store/settingsStore';
import { useIsMobile } from '../hooks/useIsMobile';
import { wallpapers } from '../constants/wallpaperConfig';

const Settings = () => {
    const theme = useSettingsStore((s) => s.theme);
    const setTheme = useSettingsStore((s) => s.setTheme);
    const selectedWallpaper = useSettingsStore((s) => s.selectedWallpaper);
    const setWallpaper = useSettingsStore((s) => s.setWallpaper);
    const { isMobile } = useIsMobile();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-display text-[var(--color-text-primary)]">Settings</h1>

            {/* Appearance section */}
            <div className="border border-[var(--color-border)] rounded-md p-4 flex flex-col gap-3">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Appearance</h2>

                <div>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">Theme mode</p>
                    <div className="inline-flex border border-[var(--color-border)] rounded overflow-hidden">
                        <button
                            onClick={() => setTheme('light')}
                            className={`px-4 py-2 text-sm transition ${theme === 'light'
                                    ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                                    : 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
                                }`}
                        >
                            Light
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`px-4 py-2 text-sm transition ${theme === 'dark'
                                    ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                                    : 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
                                }`}
                        >
                            Dark
                        </button>
                    </div>
                </div>
            </div>

            {/* Wallpaper section */}
            <div className="border border-[var(--color-border)] rounded-md p-4 flex flex-col gap-3">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Wallpaper</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">
                    Choose a wallpaper for your desktop.
                </p>

                {isMobile ? (
                    <div className="flex flex-col gap-3">
                        {wallpapers.map((wp) => (
                            <button
                                key={wp.id}
                                onClick={() => setWallpaper(wp.id)}
                                className={`flex flex-col rounded overflow-hidden border-2 transition ${selectedWallpaper === wp.id
                                        ? 'border-[var(--color-accent)]'
                                        : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'
                                    }`}
                            >
                                <div
                                    className="h-32 w-full"
                                    style={{
                                        backgroundImage: `url(/src/assets/wallpapers/${wp.id}.webp)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <span className="text-xs text-[var(--color-text-primary)] bg-[var(--color-surface-elevated)] px-3 py-2 text-left">
                                    {wp.name}
                                </span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {wallpapers.map((wp) => (
                            <button
                                key={wp.id}
                                onClick={() => setWallpaper(wp.id)}
                                className={`flex flex-col rounded overflow-hidden border-2 transition ${selectedWallpaper === wp.id
                                        ? 'border-[var(--color-accent)]'
                                        : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'
                                    }`}
                            >
                                <div
                                    className="h-20 w-full"
                                    style={{
                                        backgroundImage: `url(/src/assets/wallpapers/${wp.id}.webp)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <span className="text-xs text-[var(--color-text-primary)] bg-[var(--color-surface-elevated)] px-2 py-1 text-left">
                                    {wp.name}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;