"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react';

function ButtonLogOut() {
    return (
        <Button onClick={async () => {
            await signOut({
                callbackUrl: "/",
            })
        }}>
            Logout
        </Button>
    )
}

export default ButtonLogOut