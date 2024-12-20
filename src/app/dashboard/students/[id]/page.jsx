"use client"

import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function StudentPage() {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`,
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                });
                if (!response.ok) throw new Error('Error al cargar el estudiante')
                const data = await response.json()
                console.log(data)
                setStudent(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (session?.accessToken) {
            fetchStudent()
        }
    }, [session, params.id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-10">
                <div className="w-full p-4 text-center text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg">
                    {error}
                </div>
            </div>
        )
    }

    if (!student) return null

    return (
        <div className="container py-6 space-y-6">
            <div className="flex items-center justify-between  text-black dark:text-white">
                <Button variant="ghost" onClick={() => router.back()} className="-ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>Datos personales del estudiante</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium">Nombre</p>
                                <p className="text-sm text-muted-foreground">{student.nombre}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Apellido</p>
                                <p className="text-sm text-muted-foreground">{student.apellido}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Edad</p>
                                <p className="text-sm text-muted-foreground">{student.edad} años</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estado de Cuenta</CardTitle>
                        <CardDescription>Información financiera del estudiante</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">Balance Final</p>
                            <p className="text-2xl font-bold">
                                {new Intl.NumberFormat("es-UY", {
                                    style: "currency",
                                    currency: "UYU",
                                }).format(student.balance_final ?? 0)}
                            </p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Últimos Movimientos</p>
                            <p className="text-sm text-muted-foreground">
                                No hay movimientos registrados.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}