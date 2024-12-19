import { useEffect, useState } from 'react';

export default function useDarkMode() {
    const [theme, setTheme] = useState(() => {
        // Recuperar el tema desde LocalStorage o establecer un valor por defecto
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        // Aplicar la clase del tema al HTML
        document.documentElement.className = theme;

        // Guardar el tema en LocalStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}
