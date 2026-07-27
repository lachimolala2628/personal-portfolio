import { create } from 'zustand';

const WALLPAPER_KEY = 'selectedWallpaper';
const THEME_KEY = 'theme';
const BRIGHTNESS_KEY = 'brightness';

const DEFAULT_WALLPAPER = 'wallpaper-1';
const DEFAULT_THEME = 'dark';
const DEFAULT_BRIGHTNESS = 100;

const getStored = (key, fallback) => {
    return localStorage.getItem(key) || fallback;
};

export const useSettingsStore = create((set) => ({
    selectedWallpaper: getStored(WALLPAPER_KEY, DEFAULT_WALLPAPER),
    theme: getStored(THEME_KEY, DEFAULT_THEME),
    brightness: Number(getStored(BRIGHTNESS_KEY, DEFAULT_BRIGHTNESS)),

    setWallpaper: (wallpaperId) => {
        localStorage.setItem(WALLPAPER_KEY, wallpaperId);
        set({ selectedWallpaper: wallpaperId });
    },

    setTheme: (theme) => {
        localStorage.setItem(THEME_KEY, theme);
        set({ theme });
    },

    setBrightness: (value) => {
        localStorage.setItem(BRIGHTNESS_KEY, value);
        set({ brightness: value });
    },
}));