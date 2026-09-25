import { useState, useEffect } from 'react';
import { useSettingsStore } from './store/settingsStore';
import { wallpapers } from './constants/wallpaperConfig';
import Navbar from './components/layout/Navbar';
import Desktop from './components/layout/Desktop';
import Taskbar from './components/layout/Taskbar';
import RouteSync from './components/routing/RouteSync';
import LockScreen from './components/layout/LockScreen';

const App = () => {
  const [showLock, setShowLock] = useState(true);
  const theme = useSettingsStore((s) => s.theme);
  const brightness = useSettingsStore((s) => s.brightness);
  const selectedWallpaper = useSettingsStore((s) => s.selectedWallpaper);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const wallpaper = wallpapers.find((w) => w.id === selectedWallpaper);
    if (wallpaper) {
      document.documentElement.style.setProperty('--color-accent', wallpaper.accent);
    }
  }, [selectedWallpaper]);

  const handleUnlock = () => {
    setShowLock(false);
  };

  if (showLock) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      <RouteSync />
      <Navbar />
      <Desktop />
      <Taskbar />
    </div>
  );
};

export default App;