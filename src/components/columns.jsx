'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Definimos las columnas de la tabla
export const columns = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Nombre
                {/* <ArrowUpDown className='ml-2 h-4 w-4' /> */}
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'age',
        header: 'Edad',
        cell: ({ row }) => <div>{row.getValue('age')} años</div>,
    },
    {
        accessorKey: 'level',
        header: 'Nivel',
        cell: ({ row }) => <div>{row.getValue('level')}</div>,
    },
    {
        accessorKey: 'attendance',
        header: 'Asistencia',
        cell: ({ row }) => <div>{row.getValue('attendance')}</div>,
    },
];
