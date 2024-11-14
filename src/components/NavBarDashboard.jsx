import React from 'react'
import { BookOpen } from 'lucide-react';

export default function NavBarDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-b text-white">
            <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 p-4">
                <div className="flex items-center mb-8">
                    <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
                    <h1 className="text-xl font-bold">Academia de Inglés</h1>
                </div>
            </div>
        </div>

    );
}
