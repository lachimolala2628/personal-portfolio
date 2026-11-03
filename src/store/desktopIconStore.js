import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useDesktopIconStore = create(
    persist(
        (set) => ({
            positions: {},
            setPosition: (id, position) =>
                set((s) => ({ positions: { ...s.positions, [id]: position } })),
            resetPositions: () => set({ positions: {} }),
        }),
        {
            name: 'desktop-icons',
            storage: createJSONStorage(() => localStorage),
        }
    )
);