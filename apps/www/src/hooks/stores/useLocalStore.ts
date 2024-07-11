import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { AppTheme } from '@/enums/AppTheme';

type LocalStore = {
    appTheme: AppTheme;
    setAppTheme: (appTheme: AppTheme) => void;
};

const useLocalStore = create(
    persist<LocalStore>(
        (set) => ({
            appTheme: AppTheme.System,
            setAppTheme: (appTheme: AppTheme) => set({ appTheme }),
        }),
        {
            name: 'local-store',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const useAppTheme = () => useLocalStore((state) => state.appTheme);
export const useSetAppTheme = () => useLocalStore((state) => state.setAppTheme);
export default useLocalStore;
