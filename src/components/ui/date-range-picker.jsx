"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function DatePickerWithRange({ date, onDateChange }) {
    return (
        <div className="flex items-center gap-4">
            <div className="grid gap-1.5">
                <Label htmlFor="from">Desde</Label>
                <Input
                    type="date"
                    id="from"
                    value={date.from?.toISOString().split('T')[0] || ''}
                    onChange={(e) => {
                        const newDate = new Date(e.target.value)
                        onDateChange({
                            from: newDate,
                            to: date.to
                        })
                    }}
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="to">Hasta</Label>
                <Input
                    type="date"
                    id="to"
                    value={date.to?.toISOString().split('T')[0] || ''}
                    onChange={(e) => {
                        const newDate = new Date(e.target.value)
                        onDateChange({
                            from: date.from,
                            to: newDate
                        })
                    }}
                />
            </div>
        </div>
    )
}