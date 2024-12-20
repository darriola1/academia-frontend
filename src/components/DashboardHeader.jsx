"use client";

import { Button } from "./ui/button";
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from "react"

const menuItems = [
	{ name: 'Resumen', href: '/dashboard' },
	{ name: 'Estudiantes', href: '/dashboard/students' },
	{ name: 'Tutores', href: '/dashboard/tutors' },
	{ name: 'Clases', href: '/dashboard/classes' },
	{ name: 'Niveles', href: '/dashboard/levels' },
	{ name: 'Configuración', href: '/dashboard/settings' },
];


export default function DashboardHeader({ titulo }) {
	const [isDarkMode, setIsDarkMode] = useState(false)

	// Encuentra el nombre basado en el pathname actual
	const currentItem = menuItems.find((item) => item.href === titulo);
	const title = currentItem ? currentItem.name : "Dashboard";

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDarkMode])

	return (
		<header className="flex justify-between items-center mb-8 bg-white dark:bg-zinc-900 p-4 border-b border-gray-200 dark:border-zinc-800">
			<h2 className="text-2xl font-bold text-black dark:text-white">{title}</h2>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsDarkMode(!isDarkMode)}
				className="h-8 w-8 text-black dark:text-white"
			>
				{isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
			</Button>
		</header>
	);
}