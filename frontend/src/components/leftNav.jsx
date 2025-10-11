/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Bell, CircleUserRound, Settings,Search,ShieldCheck } from 'lucide-react'

const leftNav = () => {
    const location = useLocation();
    return (
        <section className='w-[20%] min-h-screen bg-[#FAF8F1] flex flex-col py-8 items-start pl-4 gap-10'>
            <div className="logo font-serif text-xl font-extrabold pl-6">
                <h1>EchoHeart</h1>
            </div>
            <div className="components flex flex-col gap-3 px-3 w-full">
                <NavLink
                    className="px-3 py-2 text-xl flex items-center gap-2 rounded-lg hover:bg-[#000] hover:text-white transition-colors duration-200 w-full"
                    to="/dashboard"
                >
                    <LayoutDashboard className={`${location.pathname==="/dashboard"?"fill-black":""}`} size={20} />
                    Dashboard
                </NavLink>
                <NavLink
                    className="px-3 py-2 text-xl flex items-center gap-2 rounded-lg hover:bg-[#000] hover:text-white transition-colors duration-200 w-full"
                    to="/explore"
                >
                    <Search className={`${location.pathname==="/explore"?"fill-black":""}`} size={20} />
                    Explore
                </NavLink>
                <NavLink
                    className="px-3 py-2 text-xl flex items-center gap-2 rounded-lg hover:bg-[#000] hover:text-white transition-colors duration-200 w-full"
                    to="/safe-zone"
                >
                    <ShieldCheck className={`${location.pathname==="/safe-zone"?"fill-black":""}`} size={20} />
                    Safe Zone
                </NavLink>
                <NavLink
                    className="px-3 py-2 text-xl flex items-center gap-2 rounded-lg hover:bg-[#000] hover:text-white transition-colors duration-200 w-full"
                    to="/notification"
                >
                    <Bell className={`${location.pathname==="/notification"?"fill-black":""}`} size={20} /> 
                    Notification
                </NavLink>
                <NavLink
                    className="px-3 py-2 text-xl flex items-center gap-2 rounded-lg hover:bg-[#000] hover:text-white transition-colors duration-200 w-full"
                    to="/profile"
                >
                    <CircleUserRound className={`${location.pathname==="/profile"?"stroke-3":""}`} size={20} />
                    Profile
                </NavLink>
                <NavLink
                    className="px-3 py-2 text-xl flex items-center gap-2 rounded-lg hover:bg-[#000] hover:text-white transition-colors duration-200 w-full"
                    to="/settings"
                >
                    <Settings className={`${location.pathname==="/settings"?"stroke-3":""}`} size={20} />
                    Settings
                </NavLink>
            </div>
        </section>
    )
}

export default leftNav