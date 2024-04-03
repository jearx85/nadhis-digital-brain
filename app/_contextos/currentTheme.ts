import { create } from 'zustand';

interface StoreProps {
    theme: string;
    updateTheme: (newTheme: string) => void;
}

export const useThemeContext = create<StoreProps>((set) => ({ theme: "light", updateTheme: (newTheme: string) => set({ theme: newTheme }) }))