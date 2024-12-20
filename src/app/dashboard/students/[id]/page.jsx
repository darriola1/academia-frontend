// "use client"

// // import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// export default function StudentDetails({ params }) {
//     // const router = useRouter();
//     const { id } = params; // Obtener el ID de la URL
//     const [student, setStudent] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (id) {
//             fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos/${id}`)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     setStudent(data);
//                     setLoading(false);
//                 })
//                 .catch(() => setLoading(false));
//         }
//     }, [id]);

//     if (loading) return <p>Cargando detalles...</p>;
//     if (!student) return <p>No se encontraron detalles para este estudiante.</p>;

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold">{`${student.nombre} ${student.apellido}`}</h1>
//             <p><strong>Email:</strong> {student.email}</p>
//             <p><strong>Edad:</strong> {student.edad}</p>
//             <p><strong>Balance:</strong> {student.balance_final}</p>
//             {/* Agregar más detalles si son necesarios */}
//             <button
//                 onClick={() => router.push('/students')}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//                 Volver a la lista
//             </button>
//         </div>
//     );
// }

import React from 'react';

export default async function StudentDetails({ params }) {
    // Esperamos la resolución de `params` porque es una promesa
    const { id } = await params;

    // Llamada a la API para obtener los datos del estudiante
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos/${id}`);
    if (!res.ok) {
        return <p>No se pudo cargar la información del estudiante.</p>;
    }

    const student = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{`${student.nombre} ${student.apellido}`}</h1>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Edad:</strong> {student.edad}</p>
            <p><strong>Balance:</strong> {student.balance_final}</p>
            <button
                onClick={() => window.history.back()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Volver
            </button>
        </div>
    );
}
