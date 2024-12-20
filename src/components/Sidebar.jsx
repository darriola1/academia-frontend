'use client';
import { useContext } from "react";
import { ActiveTabContext } from "@/app/Providers";
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart, Users, Calendar, Settings, BookPlus } from 'lucide-react';
import ButtonLogOut from './ui/ButtonLogOut';

export default function Sidebar() {
    const { activeTab, setActiveTab } = useContext(ActiveTabContext);
    // Menu items - cargar dinamicamente despues segun rol
    const menuItems = [
        { name: 'Resumen', icon: BarChart, id: 'overview' },
        { name: 'Estudiantes', icon: Users, id: 'students' },
        { name: 'Tutores', icon: Users, id: 'tutores' },
        { name: 'Clases', icon: Calendar, id: 'classes' },
        { name: 'Niveles', icon: BookPlus, id: 'levels' },
        { name: 'Configuración', icon: Settings, id: 'settings' },
    ];

    return (
        <div className='fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-zinc-900 flex flex-col border-r border-gray-200 dark:border-zinc-800'>
            {/* Header */}
            <div className='flex items-center mb-8 p-4'>
                <BookOpen className='h-8 w-8 text-black dark:text-white mr-2' />
                <h1 className='text-xl font-bold text-black dark:text-white'>Academia de Inglés</h1>
            </div>

            {/* Navigation Menu */}
            <nav className='flex-1'>
                <ul className='space-y-2 px-4'>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <Button
                                variant='ghost'
                                className={`w-full justify-start ${activeTab === item.id
                                    ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                    }`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <item.icon className='h-5 w-5 mr-2' />
                                {item.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className='p-4'>
                <ButtonLogOut variant='ghost' size='icon' className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-800" />
            </div>
        </div>
    );
}