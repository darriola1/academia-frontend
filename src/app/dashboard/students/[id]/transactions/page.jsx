"use client"

import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft, ArrowUpDown, Calendar, Download, Loader2 } from 'lucide-react'
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MonthPicker } from "@/components/ui/month-picker"

// Datos de ejemplo - esto vendría de tu API
const transactionsData = [
    {
        id: 1,
        fecha: "2024-01-15",
        descripcion: "Pago mensualidad Enero",
        monto: 5000,
        tipo: "ingreso",
        metodo: "Efectivo"
    },
    {
        id: 2,
        fecha: "2024-01-10",
        descripcion: "Cargo por materiales",
        monto: -1500,
        tipo: "egreso",
        metodo: "Transferencia"
    },
    {
        id: 3,
        fecha: "2024-12-10",
        descripcion: "Cargo por materiales",
        monto: -1500,
        tipo: "egreso",
        metodo: "Transferencia"
    },
    {
        id: 4,
        fecha: "2024-03-10",
        descripcion: "Cargo por materiales",
        monto: -1500,
        tipo: "egreso",
        metodo: "Transferencia"
    },
    // ... más transacciones para ejemplo
]

export default function StudentTransactionsPage() {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()
    const [student, setStudent] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [selectedMonth, setSelectedMonth] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    console.log('selectedMonth: ', selectedMonth)
    // console.log('year: ', year)
    const itemsPerPage = 10

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // Fetch student data
                const studentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alumnos/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`,
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                });
                if (!studentResponse.ok) throw new Error('Error al cargar el estudiante')
                const studentData = await studentResponse.json()
                setStudent(studentData)

                // Fetch transactions data
                // Aquí iría tu fetch real a la API de transacciones
                // Por ahora usamos los datos de ejemplo
                setTransactions(transactionsData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (session?.accessToken) {
            fetchData()
        }
    }, [session, params.id])

    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.fecha)
        return (
            transactionDate.getMonth() === selectedMonth.month &&
            transactionDate.getFullYear() === selectedMonth.year
        )
    })

    const paginatedTransactions = filteredTransactions.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    )

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

    const exportToExcel = () => {
        const dataToExport = filteredTransactions.map(t => ({
            Fecha: new Date(t.fecha).toLocaleDateString('es-UY'),
            Descripción: t.descripcion,
            Método: t.metodo,
            Monto: t.monto,
            Tipo: t.tipo
        }))

        const ws = XLSX.utils.json_to_sheet(dataToExport)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Transacciones")

        // Generar el archivo
        XLSX.writeFile(wb, `transacciones_${student.nombre}_${student.apellido}.xlsx`)
    }

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
            <div className="flex items-center justify-between text-black dark:text-white">
                <Button variant="ghost" onClick={() => router.back()} className="-ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Movimientos del Estudiante</CardTitle>
                            <CardDescription>
                                Historial de transacciones de {student.nombre} {student.apellido}
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">Balance Actual</p>
                            <p className="text-2xl font-bold">
                                {new Intl.NumberFormat("es-UY", {
                                    style: "currency",
                                    currency: "UYU",
                                }).format(student.balance_final ?? 0)}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <MonthPicker
                            selectedMonth={selectedMonth}
                            onMonthSelect={setSelectedMonth}
                        />
                        <Button
                            variant="outline"
                            onClick={exportToExcel}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Exportar a Excel
                        </Button>
                    </div>

                    <div className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-700">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-transparent px-0 font-medium"
                                        >
                                            Fecha
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-transparent px-0 font-medium"
                                        >
                                            Descripción
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-transparent px-0 font-medium"
                                        >
                                            Método
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-right">
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-transparent px-0 font-medium"
                                        >
                                            Monto
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedTransactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No se encontraron movimientos para el mes seleccionado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                {new Date(transaction.fecha).toLocaleDateString('es-UY')}
                                            </TableCell>
                                            <TableCell>{transaction.descripcion}</TableCell>
                                            <TableCell>{transaction.metodo}</TableCell>
                                            <TableCell className={`text-right font-medium ${transaction.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                {new Intl.NumberFormat("es-UY", {
                                                    style: "currency",
                                                    currency: "UYU",
                                                    signDisplay: "always"
                                                }).format(transaction.monto)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Mostrando {Math.min(itemsPerPage, filteredTransactions.length)} de {filteredTransactions.length} movimientos
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}