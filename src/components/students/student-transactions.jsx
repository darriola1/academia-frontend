import { Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function StudentTransactions({ transactions, onViewAll }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Últimos Movimientos</CardTitle>
                    <CardDescription>Los últimos 5 movimientos del estudiante</CardDescription>
                </div>
                <Button
                    variant="outline"
                    onClick={onViewAll}
                    className="gap-2"
                >
                    Ver todos
                    <Clock className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Fecha</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {new Date(transaction.fecha).toLocaleDateString('es-UY')}
                                </TableCell>
                                <TableCell>{transaction.descripcion}</TableCell>
                                <TableCell className={`text-right font-medium ${transaction.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {new Intl.NumberFormat("es-UY", {
                                        style: "currency",
                                        currency: "UYU",
                                        signDisplay: "always"
                                    }).format(transaction.monto)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}