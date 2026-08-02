import { create } from 'zustand';
import { WINDOW_IDS, windowConfig } from '../constants/windowConfig';



const buildInitialWindows = () => {
    const windows = {};
    Object.values(WINDOW_IDS).forEach((id) => {
        windows[id] = {
            isOpen: false,
            state: 'normal',
            position: windowConfig[id].defaultPosition,
            size: windowConfig[id].defaultSize,
            zIndex: 1,
        };
    });
    return windows;
};

export const useWindowStore = create((set, get) => ({
    windows: buildInitialWindows(),
    focusedWindow: null,
    highestZIndex: 1,
    isTaskbarVisible: true,
    setTaskbarVisible: (visible) => set({ isTaskbarVisible: visible }),

    // Call this once when the app first loads
    initializeApp: () => {
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (!hasVisited) {
            get().openWindow(WINDOW_IDS.ABOUT);
            localStorage.setItem('hasVisitedBefore', 'true');
        }
    },

    openWindow: (id, isMobile = false) =>
        set((s) => {
            const newZ = s.highestZIndex + 1;
            let updatedWindows = { ...s.windows };

            if (isMobile) {
                // Close every other open window first
                Object.keys(updatedWindows).forEach((windowId) => {
                    if (windowId !== id && updatedWindows[windowId].isOpen) {
                        updatedWindows[windowId] = { ...updatedWindows[windowId], isOpen: false };
                    }
                });
            }

            updatedWindows[id] = {
                ...updatedWindows[id],
                isOpen: true,
                state: 'normal',
                zIndex: newZ,
            };

            return {
                windows: updatedWindows,
                focusedWindow: id,
                highestZIndex: newZ,
            };
        }),

    closeWindow: (id) =>
        set((s) => ({
            windows: { ...s.windows, [id]: { ...s.windows[id], isOpen: false } },
            focusedWindow: s.focusedWindow === id ? null : s.focusedWindow,
        })),

    focusWindow: (id) =>
        set((s) => {
            const newZ = s.highestZIndex + 1;
            return {
                windows: { ...s.windows, [id]: { ...s.windows[id], zIndex: newZ } },
                focusedWindow: id,
                highestZIndex: newZ,
            };
        }),

    minimizeWindow: (id) =>
        set((s) => ({
            windows: { ...s.windows, [id]: { ...s.windows[id], state: 'minimized' } },
        })),

    toggleMaximize: (id) =>
        set((s) => ({
            windows: {
                ...s.windows,
                [id]: {
                    ...s.windows[id],
                    state: s.windows[id].state === 'maximized' ? 'normal' : 'maximized',
                },
            },
        })),

    restoreWindow: (id) =>
        set((s) => {
            const newZ = s.highestZIndex + 1;
            return {
                windows: { ...s.windows, [id]: { ...s.windows[id], state: 'normal', zIndex: newZ } },
                focusedWindow: id,
                highestZIndex: newZ,
            };
        }),

    updatePosition: (id, position) =>
        set((s) => ({
            windows: { ...s.windows, [id]: { ...s.windows[id], position } },
        })),

    updateSize: (id, size) =>
        set((s) => ({
            windows: { ...s.windows, [id]: { ...s.windows[id], size } },
        })),
}));