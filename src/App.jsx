import { useEffect } from 'react';
import { useSettingsStore } from './store/settingsStore';
import Navbar from './components/layout/Navbar';
import Desktop from './components/layout/Desktop';
import Taskbar from './components/layout/Taskbar';
import RouteSync from './components/routing/RouteSync';

const App = () => {
  const theme = useSettingsStore((s) => s.theme);
  const brightness = useSettingsStore((s) => s.brightness);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
}

export default App;