"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Moon, Sun } from 'lucide-react'
import { signIn } from 'next-auth/react';

export default function LoginPage() {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDarkMode])

	const [error, setError] = useState();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target)
		const email = formData.get('email')
		const password = formData.get('password')

		if (!email || !password) {
			setError('Por favor ingresa tanto el email como la contraseña');
			return;
		}
		// Llama a signIn de NextAuth para autenticación
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result && result.ok) {
			router.push('/dashboard'); // Redirige al dashboard si la autenticación es exitosa
		} else {
			setError('Email o contraseña incorrectos');
		}
	};

	return (
		<div className="min-h-screen max-w-md w-full p-4 bg-white dark:bg-zinc-900 flex justify-center items-center">
			<Card className="w-full max-w-sm p-6 bg-white dark:bg-zinc-800 shadow-lg rounded-lg">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<BookOpen className="h-5 w-5" />
						<h1 className="text-xl font-semibold">Academia de Inglés</h1>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsDarkMode(!isDarkMode)}
						className="h-8 w-8"
					>
						{isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
					</Button>
				</div>

				<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
					Inicia sesión para acceder a tus clases
				</p>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="email">Correo electrónico</Label>
						<Input
							id="email"
							name="email"
							type="email"
							defaultValue="darriola.dev@gmail.com"
							className="w-full dark:border-white"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							name='password'
							type="password"
							className="w-full  dark:border-white"
						/>
					</div>

					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="remember"
							className="h-4 w-4 rounded border-zinc-300"
						/>
						<Label htmlFor="remember" className="text-sm font-normal">
							Recuérdame
						</Label>
					</div>

					<Button className="w-full gap-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
						Iniciar sesión
					</Button>
					{error && <p>{error}</p>}

				</form>
			</Card>
		</div>
	)
}