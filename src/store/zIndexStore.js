import { create } from 'zustand';

export const useZIndexStore = create((set, get) => ({
    highest: 1,
    activeType: null, 
    activeId: null,

    getNextZIndex: (type, id) => {
        const next = get().highest + 1;
        set({ highest: next, activeType: type, activeId: id });
        return next;
    },
}));