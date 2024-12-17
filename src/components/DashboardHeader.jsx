"use client";

import { useContext } from "react";
import { ActiveTabContext } from "@/app/Providers";
import { Button } from "./ui/button";
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from "react"

const titles = {
	overview: "Resumen",
	students: "Estudiantes",
	classes: "Clases",
	settings: "Configuración",
	levels: "Niveles"
};

export default function DashboardHeader() {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDarkMode])
	const { activeTab } = useContext(ActiveTabContext);

	return (
		<header className="flex justify-between items-center mb-8 bg-white dark:bg-zinc-900 p-4 border-b border-gray-200 dark:border-zinc-800">
			<h2 className="text-2xl font-bold text-black dark:text-white">{titles[activeTab]}</h2>

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