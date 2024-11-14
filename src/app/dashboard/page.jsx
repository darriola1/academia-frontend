// "use client"
// import ButtonLogOut from '@/components/ui/ButtonLogOut';
// import { useSession } from 'next-auth/react';
import React from 'react';
import HeaderDashboard from '@/components/HeaderDashboard';
import NavBarDashboard from '@/components/NavBarDashboard';


export default function Dashboard() {

    // const { data: session } = useSession()
    // console.log('session: ', session)


    return (
        <div className="min-h-screen ">
            <HeaderDashboard></HeaderDashboard>
            <NavBarDashboard></NavBarDashboard>
        </div>
    )
}

// export default Dashboard