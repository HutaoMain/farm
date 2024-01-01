import { create } from "zustand";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("farm-user") || null,
  setUser: (user) => {
    localStorage.setItem("farm-user", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("farm-user");
    set({ user: null });
  },
}));

export default useAuthStore;
