import { useEffect } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { WINDOW_IDS } from '../../constants/windowConfig';
import Window from '../window/Window';
import About from '../../pages/About';
import Work from '../../pages/Work';
import Experience from '../../pages/Experience';
import Contact from '../../pages/Contact';
import Settings from '../../pages/Settings';
import Help from '../../pages/Help';

const pageComponents = {
    [WINDOW_IDS.ABOUT]: About,
    [WINDOW_IDS.WORK]: Work,
    [WINDOW_IDS.EXPERIENCE]: Experience,
    [WINDOW_IDS.CONTACT]: Contact,
    [WINDOW_IDS.SETTINGS]: Settings,
    [WINDOW_IDS.HELP]: Help,
};

const desktopIcons = [
    { id: WINDOW_IDS.ABOUT, label: 'About' },
    { id: WINDOW_IDS.WORK, label: 'Work' },
];

const Desktop = () => {
    const initializeApp = useWindowStore((s) => s.initializeApp);
    const openWindow = useWindowStore((s) => s.openWindow);
    const selectedWallpaper = useSettingsStore((s) => s.selectedWallpaper);
    const { isMobile } = useIsMobile();

    useEffect(() => {
        initializeApp();
    }, [initializeApp]);

    const iconContainerClass = isMobile
        ? 'absolute top-4 left-4 right-4 flex flex-row gap-1 h-14'
        : 'absolute top-4 left-4 flex flex-col gap-6';

    return (
        <div
            className="absolute left-0 right-0 bottom-0 bg-[var(--color-bg)]"
            style={{
                top: 'var(--navbar-height)',
                backgroundImage: `url(/src/assets/wallpapers/${selectedWallpaper}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={iconContainerClass}>
                {desktopIcons.map((icon) => (
                    <button
                        key={icon.id}
                        onClick={() => openWindow(icon.id, isMobile)}
                        className="flex flex-col items-center gap-1 w-20 group"
                    >
                        <div className="w-10 h-10 bg-[var(--color-accent)] border border-[var(--color-border)] rounded flex items-center justify-center group-hover:brightness-110 transition">
                            <span className="text-lg">{icon.label[0]}</span>
                        </div>
                        <span className="text-xs text-white drop-shadow">{icon.label}</span>
                    </button>
                ))}
            </div>

            {Object.values(WINDOW_IDS).map((id) => {
                const PageContent = pageComponents[id];
                return (
                    <Window key={id} id={id}>
                        <PageContent />
                    </Window>
                );
            })}
        </div>
    );
}

export default Desktop;