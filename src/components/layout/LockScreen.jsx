import { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useSettingsStore } from '../../store/settingsStore';
import { wallpapers } from '../../constants/wallpaperConfig';

function LockScreen({ onUnlock }) {
    const [time, setTime] = useState(new Date());
    const [isUnlocking, setIsUnlocking] = useState(false);
    const selectedWallpaper = useSettingsStore((s) => s.selectedWallpaper);

    const wallpaper = wallpapers.find((w) => w.id === selectedWallpaper) || wallpapers[0];

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleUnlock = () => {
        if (isUnlocking) return;
        setIsUnlocking(true);
        setTimeout(() => onUnlock(), 1200);
    };

    const stopClick = (e) => e.stopPropagation();

    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const formattedDate = time.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div
            onClick={handleUnlock}
            className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-4 cursor-pointer transition-opacity duration-1000 ${isUnlocking ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: wallpaper.gradient }}
        >
            <p className="text-sm text-white/90 font-medium tracking-wide">{formattedDate}</p>
            <h1 className="text-7xl sm:text-8xl font-display text-white/80 tracking-wider">{formattedTime}</h1>

            <div className="flex items-center gap-3 mt-2">
                {[
                    { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                    { Icon: FaGithub, href: '#', label: 'GitHub' },
                ].map(({ Icon, href, label }) => (
                    <button
                        key={label}
                        onClick={(e) => {
                            stopClick(e);
                            window.open(href, '_blank', 'noopener,noreferrer');
                        }}
                        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition"
                        aria-label={label}
                    >
                        <Icon />
                    </button>
                ))}
            </div>

            <div className="flex flex-col items-center mt-6">
                <h2 className="text-xl font-display text-white">Ayush Kumar</h2>
                <p className="text-xs tracking-widest text-white/70 uppercase mt-1">Frontend Developer</p>
            </div>

            <button
                onClick={handleUnlock}
                className="mt-8 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs tracking-widest uppercase hover:bg-white/25 transition"
            >
                Click to Unlock
            </button>

            {isUnlocking && (
                <p className="absolute bottom-10 text-xs tracking-widest text-white/60 uppercase">
                    Preparing desktop...
                </p>
            )}
        </div>
    );
}

export default LockScreen;