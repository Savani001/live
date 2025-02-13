import { create } from 'zustand';

interface DataState {
  displayData: string;
  isConnected: boolean;
  darkMode: boolean;
  showHistory: boolean;
  history: string[];
  latency: number;
  systemHealth: number;
  anomalies: number;
  transmissionRate: number;
  setDisplayData: (data: string) => void;
  setIsConnected: (status: boolean) => void;
  toggleDarkMode: () => void;
  toggleHistory: () => void;
  addToHistory: (data: string) => void;
  setLatency: (latency: number) => void;
  setSystemHealth: (health: number) => void;
  setAnomalies: (count: number) => void;
  setTransmissionRate: (rate: number) => void;
}

const getRandomDigits = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
};

export const useStore = create<DataState>((set) => ({
  displayData: getRandomDigits(),
  isConnected: true,
  darkMode: true,
  showHistory: false,
  history: [],
  latency: Math.random() * 50 + 10,
  systemHealth: 98,
  anomalies: 0,
  transmissionRate: 500,
  setDisplayData: (data) => set({ displayData: data }),
  setIsConnected: (status) => set({ isConnected: status }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleHistory: () => set((state) => ({ showHistory: !state.showHistory })),
  addToHistory: (data) => set((state) => ({ 
    history: [data, ...state.history].slice(0, 10)
  })),
  setLatency: (latency) => set({ latency }),
  setSystemHealth: (health) => set({ systemHealth: health }),
  setAnomalies: (count) => set({ anomalies: count }),
  setTransmissionRate: (rate) => set({ transmissionRate: rate }),
}));