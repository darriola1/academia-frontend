"use client"

import { useState } from 'react'
import { CalendarIcon, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function MonthPicker({ selectedMonth, onMonthSelect }) {
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const [customMonth, setCustomMonth] = useState(selectedMonth.month.toString())
  const [customYear, setCustomYear] = useState(selectedMonth.year.toString())

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const currentDate = new Date()
  const currentMonth = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  }

  const previousMonth = {
    month: currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
    year: currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()
  }

  const formatMonthYear = (month, year) => `${months[month]} ${year}`

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentDate.getFullYear() - 2 + i).toString()
  )

  const handleCustomSelect = () => {
    onMonthSelect({
      month: parseInt(customMonth),
      year: parseInt(customYear)
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start gap-2">
            <CalendarIcon className="h-4 w-4" />
            {selectedMonth ? formatMonthYear(selectedMonth.month, selectedMonth.year) : "Seleccionar mes"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px]">
          <DropdownMenuItem
            onClick={() => {
              onMonthSelect(currentMonth)
              setShowCustomPicker(false)
            }}
            className="flex items-center justify-between"
          >
            Mes actual
            {selectedMonth?.month === currentMonth.month &&
              selectedMonth?.year === currentMonth.year &&
              <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onMonthSelect(previousMonth)
              setShowCustomPicker(false)
            }}
            className="flex items-center justify-between"
          >
            Mes anterior
            {selectedMonth?.month === previousMonth.month &&
              selectedMonth?.year === previousMonth.year &&
              <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowCustomPicker(prev => !prev)}
            className="flex items-center justify-between"
          >
            Personalizado
            {showCustomPicker ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showCustomPicker && (
        <div className="flex gap-2">
          <Select value={customMonth} onValueChange={setCustomMonth}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={customYear} onValueChange={setCustomYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleCustomSelect}>
            Aplicar
          </Button>
        </div>
      )}
    </div>
  )
}