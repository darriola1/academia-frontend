import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function StudentTutorForm({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="esMenor"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Es menor de edad
              </FormLabel>
              <FormDescription>
                Marcar si el alumno es menor de edad y requiere un tutor
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {form.watch("esMenor") && (
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tutorNombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Tutor *</FormLabel>
                <FormControl>
                  <Input placeholder="María Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tutorTelefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono del Tutor *</FormLabel>
                <FormControl>
                  <Input placeholder="099123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tutorEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email del Tutor *</FormLabel>
                <FormControl>
                  <Input placeholder="victoria@ejemplo.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}