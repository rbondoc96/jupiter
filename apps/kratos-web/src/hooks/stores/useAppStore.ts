import {create} from 'zustand';

type AppStoreData = {
    name: string;
    setName: (name: string) => void;
};

export const useAppStore = create<AppStoreData>(set => ({
    name: '',
    setName: (name: string) => set({name}),
}));

export const useAppName = () => useAppStore(state => state.name);
export const useAppSetName = () => useAppStore(state => state.setName);
