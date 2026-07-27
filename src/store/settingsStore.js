import { create } from 'zustand';

const WALLPAPER_KEY = 'selectedWallpaper';
const DEFAULT_WALLPAPER = 'wallpaper-1';

const getStoredWallpaper = () => {
    return localStorage.getItem(WALLPAPER_KEY) || DEFAULT_WALLPAPER;
};

export const useSettingsStore = create((set) => ({
    selectedWallpaper: getStoredWallpaper(),

    setWallpaper: (wallpaperId) => {
        localStorage.setItem(WALLPAPER_KEY, wallpaperId);
        set({ selectedWallpaper: wallpaperId });
    },
}));