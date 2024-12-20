import Sidebar from '@/components/Sidebar'; // Asegúrate de que exista este componente
import './globals.css';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            {/* Sidebar persistente */}
            <Sidebar />
            {/* Contenido principal */}
            <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">{children}</main>
        </div>
    );
}
