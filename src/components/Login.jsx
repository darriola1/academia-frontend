"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';


export default function Login() {

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
		<div className='max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl '>
			<div className='flex justify-center items-center'>
				<BookOpen className='h-12 w-12 text-blue-400' />
			</div>
			<div className='text-center'>
				<h2 className='mt-6 text-3xl font-extrabold text-white'>Academia de Inglés</h2>
				<p className='mt-2 text-sm text-gray-400'>Inicia sesión para acceder a tus clases</p>
			</div>
			<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
				<div className='rounded-md -space-y-px'>
					<div className='my-2'>
						<Label htmlFor='email-address' className='sr-only'>
							Correo electrónico
						</Label>
						<Input id='email-address' name='email' type='email' autoComplete='email' required className='rounded-t-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' placeholder='Correo electrónico' />
					</div>
					<div className='my-2'>
						<Label htmlFor='password' className='sr-only'>
							Contraseña
						</Label>
						<Input id='password' name='password' type='password' autoComplete='current-password' required className='rounded-b-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' placeholder='Contraseña' />
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='text-sm'>
						<a href='#' className='font-medium text-blue-400 hover:text-blue-300'>
							¿Olvidaste tu contraseña?
						</a>
					</div>
				</div>
				<Button type='submit'
					className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
					Iniciar sesión
				</Button>
				{error && <p>{error}</p>}
			</form>
			<div className='text-center'>
				<p className='mt-2 text-sm text-gray-400'>
					¿No tienes una cuenta?{' '}
					<a href='#' className='font-medium text-blue-400 hover:text-blue-300'>
						Regístrate aquí
					</a>
				</p>
			</div>
		</div>
	);
}
