import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function StudentDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/alumnos/${id}`)
                .then((res) => res.json())
                .then(setStudent);
        }
    }, [id]);

    if (!student) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Detalles de {student.nombre}</h1>
            {/* Renderiza más detalles del estudiante */}
        </div>
    );
}
