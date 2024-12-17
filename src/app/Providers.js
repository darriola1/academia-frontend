'use client';
import { createContext, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

// Crea un nuevo contexto para la pestaña activa
export const ActiveTabContext = createContext();

export function Providers({ children }) {
    const [activeTab, setActiveTab] = useState('overview'); // Estado de la pestaña activa

    return (
        <SessionProvider>
            <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
                {children}
            </ActiveTabContext.Provider>
        </SessionProvider>
    );
}
