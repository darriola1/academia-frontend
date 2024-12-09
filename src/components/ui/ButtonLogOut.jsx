"use client"
import React from 'react'
import { LogOut } from 'lucide-react';
import { Button } from './button'
import { signOut } from 'next-auth/react';

function ButtonLogOut() {
    return (
        <Button onClick={async () => {
            await signOut({
                callbackUrl: "/",
            })
        }}>
            <LogOut></LogOut>Logout
        </Button>
    )
}

export default ButtonLogOut