import {create} from 'zustand';

interface StrengthState {
  strength: number; 
  setStrength: (newStrength: number) => void; 
}

const usePosterIntensity = create<StrengthState>((set) => ({
  strength: 0, 
  setStrength: (newStrength) => set({ strength: newStrength }), 
}));

export default usePosterIntensity;
