"use client";

import { useContext } from "react";
import { ActiveTabContext } from "@/app/Providers";

export default function DynamicContent() {
    const { activeTab } = useContext(ActiveTabContext);

    const content = {
        overview: "Estadísticas generales del sistema.",
        students: "Lista de estudiantes registrados.",
        classes: "Horario y estado de las clases.",
        settings: "Configuraciones del sistema.",
        levels: "Configuracion de niveles"
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <p>{content[activeTab]}</p>
        </div>
    );
}