import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function StudentLevelForm({ form }) {
  return (
    <FormField
      control={form.control}
      name="nivel"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nivel *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar nivel" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="A1">A1 - Principiante</SelectItem>
              <SelectItem value="A2">A2 - Elemental</SelectItem>
              <SelectItem value="B1">B1 - Intermedio</SelectItem>
              <SelectItem value="B2">B2 - Intermedio Alto</SelectItem>
              <SelectItem value="C1">C1 - Avanzado</SelectItem>
              <SelectItem value="C2">C2 - Dominio</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}