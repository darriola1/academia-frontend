import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function StudentLayout({ children, onBack }) {
    return (
        <div className="container py-6 space-y-6">
            <div className="flex items-center justify-between text-black dark:text-white">
                <Button variant="ghost" onClick={onBack} className="-ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
            </div>
            {children}
        </div>
    )
}