import React from 'react'
import { Plus, Eye } from 'lucide-react'
import VillageImage from '../assets/homePageImageForVillage.jpg'
import TouristGuide from '../assets/touristGuide.jpg'
import Circle from '../utils/circle'
import Jaapi from '../assets/Gapi.png'
import Search from '../components/search'
const Home = () => {


  return (
    <div className='relative min-h-full  w-full overflow-hidden ' >


      <div>

      </div>

      {/* circled */}
      <div className="landing-page overflow-hidden relative  pt-[11rem] h-screen w-full flex items-center flex-col gap-12">
        <div
          className="circle moving  border-8 border-[#000000] bg-[#000] rounded-full absolute z-2 bottom-0 left-[80%] h-[30rem] w-[30rem]"
          style={{
            filter: 'blur(8px)',
            boxShadow: '0 0 40px 20px #22c55e88',
          }}
        ></div>


        {/* first phase */}
        <div
          className="showcase w-[80%] h-[18rem] bg-green-300 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden text-white " 
          style={{
            backgroundImage: `url(${VillageImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00000088] to-[#ffffff30] rounded-2xl hover:bg-black transition-colors duration-700 ease-in-out"></div>
          <h1 className="relative text-white text-5xl font-bold z-10">Welcome, Paramjit Saikia</h1>
          <p className='relative text-xl font-extralight z-10'>Preserving culture, connecting communities, and empowering locals through stories, crafts, and real-time alerts.</p>
        </div>

        {/* second phase */}

        <div className="features flex justify-evenly w-full">
          <div className="create-new w-[8rem] h-[8rem] border-1 rounded-2xl flex items-center justify-center">
            <Plus />
          </div>
          <div className="legacy library w-[8rem] h-[8rem] border-1 rounded-2xl flex items-center justify-center">
            <h1>
              Lagacy Library
            </h1>
          </div>
          <div className="touristGuide w-[8rem] h-[8rem] border-1 rounded-2xl flex items-center justify-center">
            <h1>
              Tourist Guide
            </h1>
          </div>
          <div className="asos w-[8rem] h-[8rem] border-1 rounded-2xl flex items-center justify-center">
            <h1>
              aSOS
            </h1>
          </div>
          <div className="z-3 ssos w-[8rem] h-[8rem] border-1 rounded-2xl flex items-center justify-center">
            <h1>
              sSOS
            </h1>
          </div>
        </div>
      </div>

      {/* creating an post */}
      <div className="create-post w-full flex items-center justify-center py-16">

        <div className="relative post w-[70%] h-fit border-4 border-orange-600 rounded-2xl py-8 px-8 items-center flex flex-col">
            <div className="image w-[50%] px-8 h-full">
            <img className='w-full h-full' src={Jaapi} alt="Jaapi" srcset="" />
          </div>
          <div className="desc w-[90%]">
            <p className="text-2xl text-gray-700">
              <span className='text-3xl font-extrabold text-red-500'>Jaapi</span> is a traditional conical hat from Assam, woven from bamboo and tokou paat (palm leaves). It is often decorated with colorful designs and is a symbol of Assamese culture and hospitality. Jaapi is used by farmers for protection from the sun and rain, and is also presented as a mark of honor during cultural events. The craft of making Jaapi is passed down through generations, reflecting the rich heritage and artistry of Assam. Its unique shape and vibrant patterns make it an iconic representation of Assamese identity.
            </p>
          </div>
        
          <button className='absolute animate-bounce left-[95%] top-[90%] p-4 rounded-full bg-[#000] text-white hover:bg-red-600 active:scale-90 transition-all duration-150 ease-in-out cursor-pointer'>
            <Plus size={64} />
          </button>
        </div>

      </div>


      {/* legacy library section */}
      <div className="legacy-library w-full flex flex-col items-center justify-center py-20">

        <div className="items grid-cols-2 grid gap-8 py-16 w-[90%] items-center">
          <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
            <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
            <h2 className='group-hover:text-black tittle text-amber-600 border-2 border-amber-600 p-3 rounded-sm shadow-amber-950 shadow-lg font-bold text-3xl text-center'> জাপি (Jaapi)</h2>
          </div>

          <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
            <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
            <h2 className='group-hover:text-black tittle text-amber-600 border-2 border-amber-600 p-3 rounded-sm shadow-amber-950 shadow-lg font-bold text-3xl text-center'> জাপি (Jaapi)</h2>
          </div>

          <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
            <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
            <h2 className='group-hover:text-black tittle text-amber-600 border-2 border-amber-600 p-3 rounded-sm shadow-amber-950 shadow-lg font-bold text-3xl text-center'> জাপি (Jaapi)</h2>
          </div>

          <div className="group item items-center justify-center flex flex-col gap-4 w-full cursor-pointer">
            <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50%] drop-shadow-xl drop-shadow-orange-700' src={Jaapi} alt="" srcset="" />
            <h2 className='group-hover:text-black tittle text-amber-600 border-2 border-amber-600 p-3 rounded-sm shadow-amber-950 shadow-lg font-bold text-3xl text-center'> জাপি (Jaapi)</h2>
          </div>



        </div>
        <div className="heading border-5 border-amber-500 w-fit h-fit rounded-sm px-8 py-2 ">
          <h1 className='text-2xl font-bold'>Legacy Library</h1>
        </div>
      </div>



      {/* touristGuide */}
      <div className="touristguide w-full flex items-center justify-center py-16">
        <div className="relative post w-[95%] h-fit border-2 bg-white border-black rounded-2xl py-3 px-8 items-center flex ">
          <div className="image w-[50%] px-2 h-full">
            <img className='w-full h-full rounded-2xl' src={TouristGuide} alt="Tourist Guide" />
          </div>
          <div className="desc w-[50%] flex flex-col gap-4 px-4">
            <h2 className='text-6xl font-extrabold'>Find Your Tourist Guide</h2>
            <p className="text-2xl text-gray-700">
              A tourist guide helps you explore new places with ease, offering local insights and ensuring a memorable experience. They connect you with the culture and make your journey smoother.
            </p>
            <button className='flex w-fit items-center gap-2 bg-black text-white px-4 py-2 rounded-full mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
              <Eye />
              <p>see available guides</p>
            </button>
          </div>
        </div>
      </div>

      {/* asos */}
      <div className="asos w-full flex items-center justify-around py-16">
        <div className=" post w-[90%] h-[36rem]  rounded-2xl py-3 px-8 items-center flex ">
          <div className="desc w-[50%] h-full border-6 rounded-2xl bg-black border-red-600 flex flex-col gap-4 px-2 items-center justify-center" >
            <div className='text-6xl text-red-500 font-extrabold'>area<span className='text-white'>SOS</span></div>

            <p className="text-2xl text-white text-center">
              Through our platform, you can instantly alert everyone about any emergency in your area, ensuring quick response and community safety.
            </p>
            <div className="emergencies flex items-center gap-8">
              <div className='flex w-fit items-center gap-2 bg-black text-white px-6 py-2 rounded-full border-2 border-white mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
                <p>Flood</p>
              </div>
              <div className='flex w-fit items-center gap-2 bg-black text-white px-6 py-2 rounded-full border-2 border-white mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
                <p>Earthquake</p>
              </div>
              <div className='flex w-fit items-center gap-2 bg-black text-white px-6 py-2 rounded-full border-2 border-white mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
                <p>Landslide</p>
              </div>
            </div>
          </div>
        </div>

      </div>


      <div className="asos w-full flex items-center justify-center py-16">
        <div className=" post w-[95%] h-[30rem] border-6 bg-[#5b7742] border-black rounded-2xl py-3 px-8 items-center flex ">
          <div className="desc w-full flex flex-col gap-4 px-4 items-center" >
            <div className='text-6xl text-black font-extrabold'>security<span className='text-white'>SOS</span></div>

            <p className="text-2xl text-white text-center">
              Through our platform, you can instantly alert everyone about any emergency in your area, ensuring quick response and community safety.
            </p>
            <div className="emergencies flex items-center gap-8">
              <div className='flex w-fit items-center gap-2 bg-black text-white px-6 py-2 rounded-full border-2 border-white mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
                <p>Flood</p>
              </div>
              <div className='flex w-fit items-center gap-2 bg-black text-white px-6 py-2 rounded-full border-2 border-white mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
                <p>Earthquake</p>
              </div>
              <div className='flex w-fit items-center gap-2 bg-black text-white px-6 py-2 rounded-full border-2 border-white mt-4 hover:bg-green-800 cursor-pointer transition-colors duration-300'>
                <p>Landslide</p>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Home