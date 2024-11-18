import React from 'react'
import { BookOpen, LogOut } from 'lucide-react';
import ButtonLogOut from './ui/ButtonLogOut';


export default function NavBarDashboard() {
    return (
        <div className="min-h-screen text-white">
            <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 p-4">
                {/* <div> */}
                <div className="flex items-center mb-8">
                    <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
                    <h1 className="text-xl font-bold">Academia de Inglés</h1>
                </div>
                <nav>
                    <ul className="space-y-2">

                        <ButtonLogOut variant="ghost" size="icon">

                        </ButtonLogOut>
                    </ul>
                </nav>
            </div>
        </div>

    );
}
