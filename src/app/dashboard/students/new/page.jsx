// "use client"

// import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react"
// import { ArrowLeft } from 'lucide-react'
// import { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Toast } from "@/components/ui/toast"

// // Datos de ejemplo - esto vendrá de tu API
// const tutoresData = [
//     { id: 1, nombre: "María Pérez" },
//     { id: 2, nombre: "Juan González" },
//     { id: 3, nombre: "Ana Rodríguez" },
// ]

// export default function NewStudentPage() {
//     const router = useRouter()
//     const { data: session } = useSession()
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState("")
//     const [esMenor, setEsMenor] = useState(false)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const formData = new FormData(e.target)
//         const values = {
//             nombre: formData.get('nombre'),
//             apellido: formData.get('apellido'),
//             email: formData.get('email'),
//             telefono: formData.get('telefono'),
//             fechaNacimiento: formData.get('fechaNacimiento'),
//             nivel: formData.get('nivel'),
//             esMenor: esMenor,
//             tutorId: esMenor ? formData.get('tutorId') : undefined
//         }

//         // Validaciones básicas
//         if (!values.nombre || !values.apellido || !values.email || !values.telefono || !values.fechaNacimiento || !values.nivel) {
//             setError("Todos los campos marcados con * son obligatorios")
//             return
//         }

//         if (esMenor && !values.tutorId) {
//             setError("Debe seleccionar un tutor para estudiantes menores de edad")
//             return
//         }

//         try {
//             setLoading(true)
//             setError("")

//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos`, {
//                 method: "POST",
//                 headers: {
//                     "Authorization": `Bearer ${session.accessToken}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//             })

//             if (!response.ok) {
//                 throw new Error("Error al crear el alumno")
//             }

//             Toast({
//                 title: "Alumno creado",
//                 description: "El alumno ha sido creado exitosamente.",
//             })

//             router.push("/students")
//             router.refresh()
//         } catch (error) {
//             console.error("Error:", error)
//             setError("Hubo un error al crear el alumno. Por favor, intente nuevamente.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="container py-6 space-y-6">
//             <Button variant="ghost" onClick={() => router.back()} className="-ml-4">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Volver
//             </Button>

//             <Card>
//                 <CardHeader>
//                     <CardTitle>Nuevo Alumno</CardTitle>
//                     <CardDescription>
//                         Ingresa los datos del nuevo alumno. Los campos marcados con * son obligatorios.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Datos Personales */}
//                         <div className="grid gap-4 md:grid-cols-2">
//                             <div className="space-y-2">
//                                 <Label htmlFor="nombre">Nombre *</Label>
//                                 <Input
//                                     id="nombre"
//                                     name="nombre"
//                                     placeholder="Juan"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="apellido">Apellido *</Label>
//                                 <Input
//                                     id="apellido"
//                                     name="apellido"
//                                     placeholder="Pérez"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email *</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="juan@ejemplo.com"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="telefono">Teléfono *</Label>
//                                 <Input
//                                     id="telefono"
//                                     name="telefono"
//                                     placeholder="099123456"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
//                                 <Input
//                                     id="fechaNacimiento"
//                                     name="fechaNacimiento"
//                                     type="date"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="nivel">Nivel *</Label>
//                                 <Select name="nivel">
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Seleccionar nivel" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="A1">A1 - Principiante</SelectItem>
//                                         <SelectItem value="A2">A2 - Elemental</SelectItem>
//                                         <SelectItem value="B1">B1 - Intermedio</SelectItem>
//                                         <SelectItem value="B2">B2 - Intermedio Alto</SelectItem>
//                                         <SelectItem value="C1">C1 - Avanzado</SelectItem>
//                                         <SelectItem value="C2">C2 - Dominio</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>

//                         {/* Selector de Tutor */}
//                         <div className="space-y-6">
//                             <div className="flex items-start space-x-3">
//                                 <Checkbox
//                                     id="esMenor"
//                                     checked={esMenor}
//                                     onCheckedChange={setEsMenor}
//                                 />
//                                 <div className="grid gap-1.5 leading-none">
//                                     <Label htmlFor="esMenor">
//                                         Es menor de edad
//                                     </Label>
//                                     <p className="text-sm text-muted-foreground">
//                                         Marcar si el alumno es menor de edad y requiere un tutor
//                                     </p>
//                                 </div>
//                             </div>

//                             {esMenor && (
//                                 <div className="space-y-2">
//                                     <Label htmlFor="tutorId">Tutor *</Label>
//                                     <Select name="tutorId">
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Seleccionar tutor" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {tutoresData.map((tutor) => (
//                                                 <SelectItem key={tutor.id} value={tutor.id.toString()}>
//                                                     {tutor.nombre}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             )}
//                         </div>

//                         {error && (
//                             <p className="text-sm text-destructive">{error}</p>
//                         )}

//                         {/* Acciones */}
//                         <div className="flex justify-end gap-4">
//                             <Button type="button" variant="outline" onClick={() => router.back()}>
//                                 Cancelar
//                             </Button>
//                             <Button type="submit" disabled={loading}>
//                                 {loading ? "Guardando..." : "Guardar"}
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Toast } from "@/components/ui/toast"

// Datos de ejemplo - esto vendrá de tu API
const tutoresData = [
    { id: 1, nombre: "María Pérez" },
    { id: 2, nombre: "Juan González" },
    { id: 3, nombre: "Ana Rodríguez" },
]

export default function NewStudentPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("") // Error manejado como cadena de texto
    const [esMenor, setEsMenor] = useState(false)

    // Función para validar el formulario
    const validateForm = (values, esMenor) => {
        const errors = {}

        if (!values.nombre) errors.nombre = "El nombre es obligatorio"
        if (!values.apellido) errors.apellido = "El apellido es obligatorio"
        if (!values.email) {
            errors.email = "El email es obligatorio"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "El email no tiene un formato válido"
        }
        if (!values.telefono) errors.telefono = "El teléfono es obligatorio"
        if (!values.fechaNacimiento) errors.fechaNacimiento = "La fecha de nacimiento es obligatoria"
        if (!values.nivel) errors.nivel = "El nivel es obligatorio"
        if (esMenor && !values.tutorId) errors.tutorId = "Debe seleccionar un tutor para estudiantes menores de edad"

        return errors
    }

    // Manejo de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const values = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            fechaNacimiento: formData.get('fechaNacimiento'),
            nivel: formData.get('nivel'),
            esMenor: esMenor,
            tutorId: esMenor ? formData.get('tutorId') : undefined,
        }

        const formErrors = validateForm(values, esMenor)
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors) // Manejar errores como objeto
            return
        }

        try {
            setLoading(true)
            setError("")

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al crear el alumno")
            }

            Toast({
                title: "Alumno creado",
                description: "El alumno ha sido creado exitosamente.",
            })

            router.push("/students")
            router.refresh()
        } catch (error) {
            console.error("Error:", error.message)
            setError(error.message) // Manejo de error específico
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-6 space-y-6">
            <Button variant="ghost" onClick={() => router.back()} className="-ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Nuevo Alumno</CardTitle>
                    <CardDescription>
                        Ingresa los datos del nuevo alumno. Los campos marcados con * son obligatorios.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Datos Personales */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre *</Label>
                                <Input id="nombre" name="nombre" placeholder="Juan" />
                                {error.nombre && <p className="text-sm text-destructive">{error.nombre}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="apellido">Apellido *</Label>
                                <Input id="apellido" name="apellido" placeholder="Pérez" />
                                {error.apellido && <p className="text-sm text-destructive">{error.apellido}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" name="email" type="email" placeholder="juan@ejemplo.com" />
                                {error.email && <p className="text-sm text-destructive">{error.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telefono">Teléfono *</Label>
                                <Input id="telefono" name="telefono" placeholder="099123456" />
                                {error.telefono && <p className="text-sm text-destructive">{error.telefono}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                                <Input id="fechaNacimiento" name="fechaNacimiento" type="date" />
                                {error.fechaNacimiento && <p className="text-sm text-destructive">{error.fechaNacimiento}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nivel">Nivel *</Label>
                                <Select name="nivel">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar nivel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A1">A1 - Principiante</SelectItem>
                                        <SelectItem value="A2">A2 - Elemental</SelectItem>
                                        <SelectItem value="B1">B1 - Intermedio</SelectItem>
                                        <SelectItem value="B2">B2 - Intermedio Alto</SelectItem>
                                        <SelectItem value="C1">C1 - Avanzado</SelectItem>
                                        <SelectItem value="C2">C2 - Dominio</SelectItem>
                                    </SelectContent>
                                </Select>
                                {error.nivel && <p className="text-sm text-destructive">{error.nivel}</p>}
                            </div>
                        </div>

                        {/* Selector de Tutor */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="esMenor"
                                    checked={esMenor}
                                    onCheckedChange={setEsMenor}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="esMenor">
                                        Es menor de edad
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Marcar si el alumno es menor de edad y requiere un tutor
                                    </p>
                                </div>
                            </div>

                            {esMenor && (
                                <div className="space-y-2">
                                    <Label htmlFor="tutorId">Tutor *</Label>
                                    <Select name="tutorId">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar tutor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tutoresData.map((tutor) => (
                                                <SelectItem key={tutor.id} value={tutor.id.toString()}>
                                                    {tutor.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {error.tutorId && <p className="text-sm text-destructive">{error.tutorId}</p>}
                                </div>
                            )}
                        </div>

                        {typeof error === "string" && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}

                        {/* Acciones */}
                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Guardando..." : "Guardar"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
