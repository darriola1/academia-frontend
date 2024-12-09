"use client";

import { useContext } from "react";
import { ActiveTabContext } from "@/app/Providers";

const titles = {
	overview: "Resumen",
	students: "Estudiantes",
	classes: "Clases",
	settings: "Configuración",
	levels: "Niveles"
};

export default function DashboardHeader() {
	const { activeTab } = useContext(ActiveTabContext);

	return (
		<header className="flex justify-between items-center mb-8">
			<h2 className="text-2xl font-bold">{titles[activeTab]}</h2>
		</header>
	);
}