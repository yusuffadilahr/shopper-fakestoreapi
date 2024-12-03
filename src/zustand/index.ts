'use client'

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AuthState {
    token?: string;
    email: string;
    role: string;
    profilePicture: string;
    name: string;
}
const authStore = create(
    persist(
        (set) => ({
            token: '', email: '', role: '', profilePicture: '', name: '',

            setAuth: ({ token, email, role, profilePicture, name }: AuthState) =>
                set({ token, email, role, profilePicture, name }),

            setKeepAuth: ({ email, role, profilePicture, name }: AuthState) =>
                set({
                    email, role, profilePicture, name

                }),
            resetAuth: () => set({
                token: '',
                email: '',
                role: '',
                profilePicture: '',
                name: '',
            }),
        }),
        {
            name: 'authToken',
            partialize: (state: AuthState) => ({ token: state.token }),
        },
    ),
);

export default authStore;
