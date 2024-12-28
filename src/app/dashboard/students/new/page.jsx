"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft } from 'lucide-react'
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentPersonalForm } from "@/components/students/student-personal-form"
import { StudentTutorForm } from "@/components/students/student-tutor-form"
import { StudentLevelForm } from "@/components/students/student-level-form"
import { FormActions } from "@/components/students/form-actions"
// import { useToast } from "@/components/ui/use-toast"
import { Toast } from "@/components/ui/toast" // Update: Replaced import statement

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    apellido: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Debe ser un email válido.",
    }),
    telefono: z.string().min(8, {
        message: "El teléfono debe tener al menos 8 dígitos.",
    }),
    fechaNacimiento: z.string().min(1, {
        message: "La fecha de nacimiento es requerida.",
    }),
    nivel: z.string({
        required_error: "Por favor seleccione un nivel.",
    }),
    esMenor: z.boolean().default(false),
    tutorNombre: z.string().optional(),
    tutorTelefono: z.string().optional(),
    tutorEmail: z.string().email().optional(),
}).refine((data) => {
    if (data.esMenor) {
        return data.tutorNombre && data.tutorTelefono && data.tutorEmail
    }
    return true
}, {
    message: "Los datos del tutor son requeridos para menores de edad",
    path: ["tutorNombre"]
})

export default function NewStudentPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    //   const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            fechaNacimiento: "",
            esMenor: false,
            tutorNombre: "",
            tutorTelefono: "",
            tutorEmail: "",
            nivel: "",
        },
    })

    async function onSubmit(values) {
        try {
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error("Error al crear el alumno")
            }

            Toast({
                title: "Alumno creado",
                description: "El alumno ha sido creado exitosamente.",
            })

            router.push("/students")
            router.refresh()
        } catch (error) {
            console.error("Error:", error)
            Toast({
                variant: "destructive",
                title: "Error",
                description: "Hubo un error al crear el alumno. Por favor, intente nuevamente.",
            })
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <StudentPersonalForm form={form} />
                            <StudentLevelForm form={form} />
                            <StudentTutorForm form={form} />
                            <FormActions
                                onCancel={() => router.back()}
                                loading={loading}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}