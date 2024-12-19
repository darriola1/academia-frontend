'use client';

import { useContext } from "react";
import { ActiveTabContext } from "@/app/Providers";

// Importa los componentes de cada tab
import Overview from "./Overview";
// import StudentList from "./StudentList";
import Classes from "./Classes";
import Settings from "./Settings";
import { StudentsTable } from "./StudentTable";

export default function DynamicContent() {
    const { activeTab } = useContext(ActiveTabContext);

    // Mapeo de tabs a componentes
    const componentsMap = {
        overview: <Overview />,
        students: <StudentsTable />,
        classes: <Classes />,
        settings: <Settings />,
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 text-black dark:text-white">
            {componentsMap[activeTab] || <p>Seleccione una opción del menú.</p>}
        </div>
    );
}