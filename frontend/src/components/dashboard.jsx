import React from 'react'
import { Search, Bell, User, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
const dashboard = () => {
    return (
        <section className='h-full w-[80%] pt-10 flex flex-col gap-16 items-center py-10'>
            <div className="header flex items-center justify-center gap-4 w-full">
                <div className="search w-[70%] h-[3rem] flex items-center justify-between   border-1 border-[#999595]  rounded-full gap-4 bg-white">
                    <div className='flex items-center w-full gap-1'>

                        <div className='py-2 px-4   text-black rounded-l-full'>
                            <Search />
                        </div>
                        <input type="text" placeholder="Find your interest...." className=' outline-none border-none' />
                    </div>
                </div>
                <NavLink
                to="/notification"
                className="notification f">
                    <Bell />
                </NavLink>
                <NavLink
                to="/profile"
                className="profile flex items-center gap-2 border-l-1  pl-3">
                    <div className="profile-logo p-2 border-1 border-black rounded-full">

                        <User className='' />
                    </div>
                    <h2 className="username">paramjitsaikia</h2>
                </NavLink>
            </div>

            <div className="look h-[12rem] bg-[#000] text-white w-[90%] rounded-3xl flex flex-col items-center justify-center" >
                <p className='text-3xl font-bold font-serif text-[#929191]'>Preserve Tradition, Share Stories, Stay Secure</p>
               
            </div>
            <div className="section flex justify-evenly items-center w-[80%] gap-8 px-10 h-[4rem]">
                <NavLink
                to="/create-post"
                className="group create bg-red border-1 w-1/3 h-full flex items-center justify-center rounded-full">
                    <Plus className='group-hover:scale-120 transition-transform duration-200' />
                </NavLink>
                   <NavLink
                to="/tourist-guides"
                className="group create bg-red border-1 w-1/3 h-full flex items-center justify-center rounded-full">
                    <p className='group-hover:scale-120 transition-transform duration-200' >
                        Tourist Guide
                    </p>
                </NavLink>
                <div className="areaSOS hover:bg-black hover:text-white transition-transform duration-200 border-1 bg-red w-1/3 h-full flex items-center justify-center rounded-full">
                    <p>Area Alert</p>
                </div>
                <div className=" hover:bg-black hover:text-white transition-transform duration-200  border-1 w-1/3 h-full flex items-center justify-center rounded-full">
                    <p>Military Alert</p>
                </div>
            </div>

            <div className="notifications w-[90%] border-1 rounded-2xl">
            <h2 className='h-[3rem] py-3 px-4 bg-[#cfcdcd] rounded-t-2xl'>Recent Notifications</h2>
            <div className="notifications p-4 flex flex-col gap-3">
    <div className="notification-item border-1 p-3 rounded-xl bg-[#f8f8f8]">
        <p className="text-sm text-gray-600">Category: <span className="font-semibold text-red-600">Military Alert</span></p>
        <p className="mt-1 text-black">Unidentified drone detected near the northern border. Stay alert.</p>
        <p className="text-xs text-gray-500 mt-1">Issued by: Defense Department | Date: 10 Oct 2025</p>
    </div>
    <div className="notification-item border-1 p-3 rounded-xl bg-[#f8f8f8]">
        <p className="text-sm text-gray-600">Category: <span className="font-semibold text-orange-600">Area Alert</span></p>
        <p className="mt-1 text-black">Flood warning in Sector 12. Residents advised to move to higher ground.</p>
        <p className="text-xs text-gray-500 mt-1">Issued by: Local Authority | Date: 10 Oct 2025</p>
    </div>
    <div className="notification-item border-1 p-3 rounded-xl bg-[#f8f8f8]">
        <p className="text-sm text-gray-600">Category: <span className="font-semibold text-orange-600">Area Alert</span></p>
        <p className="mt-1 text-black">Scheduled maintenance of water supply tomorrow from 9 AM to 1 PM.</p>
        <p className="text-xs text-gray-500 mt-1">Issued by: City Department | Date: 9 Oct 2025</p>
    </div>
    <div className="notification-item border-1 p-3 rounded-xl bg-[#f8f8f8]">
        <p className="text-sm text-gray-600">Category: <span className="font-semibold text-red-600">Military Alert</span></p>
        <p className="mt-1 text-black">Training exercise scheduled at nearby base. Expect loud sounds.</p>
        <p className="text-xs text-gray-500 mt-1">Issued by: Indian Army | Date: 8 Oct 2025</p>
    </div>
</div>
            </div>
        </section>
    )
}

export default dashboard