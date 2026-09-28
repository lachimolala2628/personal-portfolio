import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useZIndexStore = create(
    persist(
        (set, get) => ({
            highest: 1,
            activeType: null,
            activeId: null,

            getNextZIndex: (type, id) => {
                const next = get().highest + 1;
                set({ highest: next, activeType: type, activeId: id });
                return next;
            },
        }),
        {
            name: 'zindex-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (s) => ({
                highest: s.highest,
                activeType: s.activeType,
                activeId: s.activeId,
            }),
        }
    )
);