import { create } from 'zustand';
import { useZIndexStore } from './zIndexStore';

export const useProjectWindowStore = create((set) => ({
    openProjects: {},
    focusedProject: null,

    openProject: (slug) =>
        set((s) => {
            const newZ = useZIndexStore.getState().getNextZIndex('project', slug);
            return {
                openProjects: {
                    ...s.openProjects,
                    [slug]: {
                        position: { x: 150, y: 100 },
                        size: { width: 900, height: 550 },
                        zIndex: newZ,
                        state: 'normal',
                    },
                },
                focusedProject: slug,
            };
        }),

    closeProject: (slug) =>
        set((s) => {
            const updated = { ...s.openProjects };
            delete updated[slug];
            return {
                openProjects: updated,
                focusedProject: s.focusedProject === slug ? null : s.focusedProject,
            };
        }),

    focusProject: (slug) =>
        set((s) => {
            const newZ = useZIndexStore.getState().getNextZIndex('project', slug);
            return {
                openProjects: {
                    ...s.openProjects,
                    [slug]: { ...s.openProjects[slug], zIndex: newZ },
                },
                focusedProject: slug,
            };
        }),

    minimizeProject: (slug) =>
        set((s) => ({
            openProjects: {
                ...s.openProjects,
                [slug]: { ...s.openProjects[slug], state: 'minimized' },
            },
        })),

    restoreProject: (slug) =>
        set((s) => {
            const newZ = useZIndexStore.getState().getNextZIndex('project', slug);
            return {
                openProjects: {
                    ...s.openProjects,
                    [slug]: { ...s.openProjects[slug], state: 'normal', zIndex: newZ },
                },
                focusedProject: slug,
            };
        }),

    toggleProjectMaximize: (slug) =>
        set((s) => ({
            openProjects: {
                ...s.openProjects,
                [slug]: {
                    ...s.openProjects[slug],
                    state: s.openProjects[slug].state === 'maximized' ? 'normal' : 'maximized',
                },
            },
        })),

    updateProjectPosition: (slug, position) =>
        set((s) => ({
            openProjects: {
                ...s.openProjects,
                [slug]: { ...s.openProjects[slug], position },
            },
        })),

    updateProjectSize: (slug, size) =>
        set((s) => ({
            openProjects: {
                ...s.openProjects,
                [slug]: { ...s.openProjects[slug], size },
            },
        })),
}));