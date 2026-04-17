'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // TODO: Replace with real API call
          // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
          // const data = await res.json();
          // Demo login
          await new Promise((r) => setTimeout(r, 500));
          set({
            user: {
              id: 'demo',
              name: 'Demo Хэрэглэгч',
              email,
              createdAt: new Date().toISOString(),
            },
            token: 'demo-token',
            isLoading: false,
          });
        } catch {
          set({ isLoading: false });
          throw new Error('Нэвтрэхэд алдаа гарлаа');
        }
      },

      register: async (name, email, _password) => {
        set({ isLoading: true });
        try {
          // TODO: Replace with real API call
          await new Promise((r) => setTimeout(r, 500));
          set({
            user: {
              id: Date.now().toString(),
              name,
              email,
              createdAt: new Date().toISOString(),
            },
            token: 'demo-token',
            isLoading: false,
          });
        } catch {
          set({ isLoading: false });
          throw new Error('Бүртгүүлэхэд алдаа гарлаа');
        }
      },

      logout: () => set({ user: null, token: null }),
      setUser: (user) => set({ user }),
    }),
    { name: 'bookworm-auth', partialize: (s) => ({ user: s.user, token: s.token }) }
  )
);
