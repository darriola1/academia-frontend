import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function StudentFinancialInfo({ student }) {
    return (
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
            </CardContent>
        </Card>
    )
}