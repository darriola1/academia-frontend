export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-black dark:text-white">Bienvenido al Dashboard</h1>
            <p className="text-gray-600">
                Aquí puedes acceder a las métricas clave y gestionar los datos de la academia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  text-black dark:text-white">
                {/* Ejemplo de métricas */}
                <div className="p-4 bg-white dark:bg-zinc-800 rounded shadow">
                    <h2 className="text-lg font-semibold">Estudiantes Totales</h2>
                    <p className="text-2xl font-bold">125</p>
                </div>

                <div className="p-4 bg-white dark:bg-zinc-800 rounded shadow">
                    <h2 className="text-lg font-semibold">Tutores Activos</h2>
                    <p className="text-2xl font-bold">12</p>
                </div>

                <div className="p-4 bg-white dark:bg-zinc-800 rounded shadow">
                    <h2 className="text-lg font-semibold">Clases Programadas</h2>
                    <p className="text-2xl font-bold">45</p>
                </div>
            </div>
        </div>
    );
}
