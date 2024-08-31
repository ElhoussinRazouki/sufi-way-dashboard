// stores/useRTLStore.ts
import { create } from 'zustand';

interface RTLState {
    isRTL: boolean;
    toggleRTL: () => void;
}

export const useRTLStore = create<RTLState>((set) => ({
    isRTL: true,
    toggleRTL: () =>
        set((state) => ({ isRTL: !state.isRTL })),
}));
