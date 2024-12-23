// "use client"

// import { useParams, useRouter } from "next/navigation"
// import { useSession } from "next-auth/react"
// import { ArrowLeft, Loader2 } from 'lucide-react'
// import { useEffect, useState } from "react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"

// export default function StudentPage() {
//     const params = useParams()
//     const router = useRouter()
//     const { data: session } = useSession()
//     const [student, setStudent] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchStudent = async () => {
//             try {
//                 setLoading(true)
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos/${params.id}`, {
//                     method: "GET",
//                     headers: {
//                         "Authorization": `Bearer ${session.accessToken}`,
//                         "Content-Type": "application/json",
//                     },
//                     redirect: "follow",
//                 });
//                 if (!response.ok) throw new Error('Error al cargar el estudiante')
//                 const data = await response.json()
//                 console.log('data: ' + data)
//                 setStudent(data)
//             } catch (err) {
//                 setError(err.message)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         if (session?.accessToken) {
//             fetchStudent()
//         }
//     }, [session, params.id])

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Loader2 className="h-8 w-8 animate-spin" />
//             </div>
//         )
//     }

//     if (error) {
//         return (
//             <div className="container py-10">
//                 <div className="w-full p-4 text-center text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg">
//                     {error}
//                 </div>
//             </div>
//         )
//     }

//     if (!student) return null

//     console.log('Student: ' + student)

//     return (
//         <div className="container py-6 space-y-6">
//             <div className="flex items-center justify-between  text-black dark:text-white">
//                 <Button variant="ghost" onClick={() => router.back()} className="-ml-4">
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Volver
//                 </Button>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Información Personal</CardTitle>
//                         <CardDescription>Datos personales del estudiante</CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Nombre</p>
//                                 <p className="text-sm font-medium">{student.nombre}</p>
//                                 {/* <p className="text-sm font-medium">Nombre</p>
//                                 <p className="text-sm text-muted-foreground">{student.nombre}</p> */}
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Apellido</p>
//                                 <p className="text-sm font-medium">{student.apellido}</p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Email</p>
//                                 <p className="text-sm font-medium">{student.email}</p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Edad</p>
//                                 <p className="text-sm font-medium">{student.edad} años</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Estado de Cuenta</CardTitle>
//                         <CardDescription>Información financiera del estudiante</CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div>
//                             <p className="text-sm font-medium">Balance Final</p>
//                             <p className="text-2xl font-bold">
//                                 {new Intl.NumberFormat("es-UY", {
//                                     style: "currency",
//                                     currency: "UYU",
//                                 }).format(student.balance_final ?? 0)}
//                             </p>
//                         </div>
//                         <Separator />
//                         <div className="space-y-2">
//                             <p className="text-sm font-medium">Últimos Movimientos</p>
//                             <p className="text-sm text-muted-foreground">
//                                 No hay movimientos registrados.
//                             </p>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     )
// }


"use client"

import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from "react"

import { StudentLayout } from "@/components/students/student-layout"
import { StudentPersonalInfo } from "@/components/students/student-personal-info"
import { StudentFinancialInfo } from "@/components/students/student-financial-info"
import { StudentTransactions } from "@/components/students/student-transactions"

// // Datos de ejemplo para las transacciones
// const transactionsData = [
//     {
//         id: 1,
//         fecha: "2024-01-15",
//         descripcion: "Pago mensualidad Enero",
//         monto: 5000,
//         tipo: "ingreso"
//     },
//     {
//         id: 2,
//         fecha: "2024-01-10",
//         descripcion: "Cargo por materiales",
//         monto: -1500,
//         tipo: "egreso"
//     },
//     {
//         id: 3,
//         fecha: "2023-12-15",
//         descripcion: "Pago mensualidad Diciembre",
//         monto: 5000,
//         tipo: "ingreso"
//     },
//     {
//         id: 4,
//         fecha: "2023-12-05",
//         descripcion: "Descuento por pronto pago",
//         monto: 500,
//         tipo: "ingreso"
//     },
//     {
//         id: 5,
//         fecha: "2023-11-15",
//         descripcion: "Pago mensualidad Noviembre",
//         monto: 5000,
//         tipo: "ingreso"
//     }
// ]

export default function StudentPage() {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()
    const [student, setStudent] = useState(null)
    const [transactions, setTransactions] = useState([]);
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
                setStudent(data)

                // Fetch last 5 transactions
                const transactionsResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos/${params.id}/transacciones?limit=5`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${session.accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!transactionsResponse.ok) throw new Error("Error al cargar transacciones");
                const transactionsData = await transactionsResponse.json();
                setTransactions(transactionsData);
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
        <StudentLayout onBack={() => router.back()}>
            <div className="grid gap-6 md:grid-cols-2">
                <StudentPersonalInfo student={student} />
                <StudentFinancialInfo student={student} />
            </div>
            <StudentTransactions
                transactions={transactions}
                onViewAll={() => router.push(`/students/${params.id}/transactions`)}
            />
        </StudentLayout>
    )
}