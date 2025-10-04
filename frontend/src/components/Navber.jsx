import React from 'react'
import { Link } from 'react-router-dom'
import { Search, CircleUserRound } from 'lucide-react';
const Navber = ({ onSearchClick }) => {
  return (
    <section className='fixed top-3 z-50 w-[70%] h-18 flex justify-between items-center bg-white/30 backdrop-blur-lg border-black border-2 rounded-full px-10'>
      <div className="logo font-serif text-2xl font-extrabold">
        <h1>.exp</h1>
      </div>
      <div className="navber flex gap-4">

        <Link className="group home py-3 px-10 rounded-full overflow-hidden border-1 border-black text-center cursor-pointer relative before:bg-[#0dff00] before:absolute before:-translate-y-[-100%] left-0 before:left-[-4rem] before:top-[-3rem]  before:w-[20rem] before:h-[20rem] before:transition-transform before:duration-300 before:rounded-full before:z-[1] hover:before:-translate-y-0 before:content-['']"
          to={"/home"}
        >
          <p className='z-[2] relative  group-hover:font-bold'>Home</p>
        </Link>
        <Link className="group explore py-3 px-10 rounded-full overflow-hidden border-1 border-black text-center cursor-pointer relative before:bg-[#0dff00] before:absolute before:-translate-y-[-100%] left-0 before:left-[-4rem] before:top-[-3rem]  before:w-[20rem] before:h-[20rem] before:transition-transform before:duration-300 before:rounded-full before:z-[1] hover:before:-translate-y-0 before:content-['']"
          to={"/explore"}
        >
          <p className='z-[2] relative  group-hover:font-bold'>Explore</p>
        </Link>

        <Link className="group aboutus py-3 px-10 rounded-full overflow-hidden border-1 border-black text-center cursor-pointer relative before:bg-[#0dff00] before:absolute before:-translate-y-[-100%] left-0 before:left-[-4rem] before:top-[-3rem]  before:w-[20rem] before:h-[20rem] before:transition-transform before:duration-300 before:rounded-full before:z-[1] hover:before:-translate-y-0 before:content-['']"
          to={"/"}
        >
          <p className='z-[2] relative  group-hover:font-bold'>About Us</p>
        </Link>

      </div>

      <div className="searchProfile flex gap-6 items-center justify-center">
        <button
          className='p-4 rounded-full hover:bg-[#cbcaca]'
          onClick={onSearchClick}
          aria-label="Open search"
          type="button"
        >
          <Search />
        </button>
        <Link to={"/profile"}>
          <CircleUserRound />
        </Link>
      </div>
    </section>
  )
}

export default Navber