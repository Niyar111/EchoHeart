import React from 'react'
import { Search } from 'lucide-react'
const Searchpage = ({close}) => {
  return (
    <section className=' w-[80%] flex items-center justify-between  absolute z-5 border-1 border-black rounded-full gap-4 bg-white'>
        <div className='flex items-center w-full gap-1'>

        <div className='py-2 px-4  bg-[#000000] text-white rounded-l-full'>
            <Search/>
        </div>
        <input type="text" placeholder="Find your interest...." className=' outline-none border-none' />
        </div>
         <button onClick={close} className="  text-end text-2xl font-bold text-black cursor-pointer  py-1 px-4 hover:bg-[#000000] hover:text-white hover:rounded-full">✕</button>
    </section>
  )
}

export default Searchpage