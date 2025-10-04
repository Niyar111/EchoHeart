import React from 'react'
import Jaapi from "../assets/Gapi.png"
import { Search } from 'lucide-react'
const Explore = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center'>
<div className="mt-[2rem] items w-[95%] rounded-2xl h-[82%] shadow-md shadow-black border-2 border-black grid grid-cols-6 grid-rows-6">
  <div className="library  col-span-4 row-span-4 rounded-2xl items-center">
    <div className="items grid-cols-2 grid gap-8  w-[90%]  items-center ">
              <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
                <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
              </div>
    
              <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
                <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
              </div>
    
              <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
                <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
              </div>
    
              <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
                <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
              </div>
    
    
    
            </div>
  </div>
<div className="touristGuide bg-green-400 items-center col-start-5 col-span-2 row-span-2">
  <h1>touristGuide</h1>
</div>
<div className="search group hover:bg-[#00aeff] rounded-xl flex flex-col justify-center items-center w-full h-full col-start-5 col-span-2 row-span-2 cursor-pointer">
  <Search className='group-hover:text-white group-hover:scale-50 transition-transform duration-500' size={200}/>
  <p className='hidden group-hover:block group-hover:scale-100 text-4xl text-white text-center'>search</p>
</div>
<div className="create bg-red-400 col-start-5 col-span-2 row-span-2"></div>
<div className="sSOS bg-orange-400 col-start-3 row-start-5 col-span-2 row-span-2"></div>
<div className="aSOS bg-pink-400 col-start-1 row-start-5 col-span-2 row-span-2"></div>
</div>


    </section>
  )
}

export default Explore