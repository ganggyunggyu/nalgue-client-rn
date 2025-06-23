import { create } from 'zustand';

export interface OnboardingState {
  step: number;
  phone: string;
  preferences: string[];
  name: string; // ✅ 추가
  setStep: (step: number) => void;
  nextStep: () => void;
  setPhone: (phone: string) => void;
  setPreferences: (prefs: string[]) => void;
  setName: (name: string) => void; // ✅ 추가
  completeOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  phone: '',
  preferences: [],
  name: '',
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  setPhone: (phone) => set({ phone }),
  setPreferences: (preferences) => set({ preferences }),
  setName: (name) => set({ name }), // ✅ 추가
  completeOnboarding: () => set({ step: 999 }), // Home으로 넘어가게
}));
