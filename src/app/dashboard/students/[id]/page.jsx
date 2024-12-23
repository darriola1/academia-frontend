"use client"

import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from "react"

import { StudentLayout } from "@/components/students/student-layout"
import { StudentPersonalInfo } from "@/components/students/student-personal-info"
import { StudentFinancialInfo } from "@/components/students/student-financial-info"
import { StudentTransactions } from "@/components/students/student-transactions"

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