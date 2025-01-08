import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StudentPersonalInfo({ student }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Datos personales del estudiante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Nombre</p>
                        <p className="text-sm font-medium">{student.nombre}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Apellido</p>
                        <p className="text-sm font-medium">{student.apellido}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{student.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Edad</p>
                        <p className="text-sm font-medium">{student.edad} años</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}