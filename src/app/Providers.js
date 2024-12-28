'use client';
import { createContext, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

// Crea un nuevo contexto para la pestaña activa
export const ActiveTabContext = createContext();

export function Providers({ children }) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
