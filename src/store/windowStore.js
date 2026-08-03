import { create } from 'zustand';
import { WINDOW_IDS, windowConfig } from '../constants/windowConfig';
import { useZIndexStore } from './zIndexStore';

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
    isTaskbarVisible: true,

    setTaskbarVisible: (visible) => set({ isTaskbarVisible: visible }),

    initializeApp: () => {
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (!hasVisited) {
            get().openWindow(WINDOW_IDS.ABOUT);
            localStorage.setItem('hasVisitedBefore', 'true');
        }
    },

    openWindow: (id, isMobile = false) =>
        set((s) => {
            const newZ = useZIndexStore.getState().getNextZIndex('window', id);
            let updatedWindows = { ...s.windows };

            if (isMobile) {
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
            };
        }),

    closeWindow: (id) =>
        set((s) => ({
            windows: { ...s.windows, [id]: { ...s.windows[id], isOpen: false } },
            focusedWindow: s.focusedWindow === id ? null : s.focusedWindow,
        })),

    focusWindow: (id) =>
        set((s) => {
            const newZ = useZIndexStore.getState().getNextZIndex('window', id);
            return {
                windows: { ...s.windows, [id]: { ...s.windows[id], zIndex: newZ } },
                focusedWindow: id,
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
            const newZ = useZIndexStore.getState().getNextZIndex('window', id);
            return {
                windows: { ...s.windows, [id]: { ...s.windows[id], state: 'normal', zIndex: newZ } },
                focusedWindow: id,
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