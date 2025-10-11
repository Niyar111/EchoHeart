import React from 'react'
import { User, MapPin, CalendarDays } from 'lucide-react'
import CoverBG from "../assets/coverBG/8150248.jpg"
import posts from '../utils/posts'
const Profile = () => {
  return (
    <section className='w-[100%] h-full  flex flex-col gap-4'>
      <section className='w-full  h-full  '>
        <div className="coverBG w-full h-[20rem] bg-amber-300  z-2">
          <img src={CoverBG} alt="Cover Background" className="w-full h-full object-cover " />
        </div>
        <div className="profileimage bg-white w-[12rem] h-[12rem] border-1 border-black relative rounded-full  -mt-18 ml-8 flex items-center justify-center">
          <User size={80} />
        </div>
        <div className="user flex justify-between w-full ">

          <div className="details pl-3 flex flex-col justify-between mt-3 gap-2">

            <div className='flex flex-col gap-4 '>

              <div className="usrdetails ">
                <h1 className='fullName text-3xl font-bold ml-8 font-sans'>Paramjit Saikia</h1>
                <p className='userName text-xl font-extralight ml-8'>@paramjit_saikia</p>
              </div>

              <div className="details flex flex-col gap-1">

                <div className="location flex items-center text-[#4f4d4d] hover:text-black gap-2 mt-2  ml-8">
                  <MapPin className='inline mb-1  ' size={30} strokeWidth={2} />
                  <span className='text-lg font-semibold'>Guwahati, Assam</span>
                </div>
                <div className="joinat flex items-center gap-1 ml-8 font-semibold ">
                  <CalendarDays />
                  <span>Joined January 2025</span>
                </div>
              </div>
            </div>
            <div className="postno flex items-center gap-4 ">
              <span className='text-lg font-bold ml-8  hover:bg-[#000] hover:text-white px-8 rounded-3xl py-2 transition-colors duration-200'> 5 Posts </span>
              <p className='istouristGuide text-md bg-black text-white w-fit px-6 rounded-3xl py-2'>Tourist Guide</p>
            </div>
          </div>

          <div className="map mr-8  bg-white flex items-center justify-center p-3 rounded-xl shadow-2xl shadow-[#909090]">


            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244446.9550678029!2d91.53807239352766!3d26.14326307086533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a287f9133ff%3A0x2bbd1332436bde32!2sGuwahati%2C%20Assam!5e1!3m2!1sen!2sin!4v1760031694756!5m2!1sen!2sin"
              style={{ border: 0 }}
              className='rounded-lg  w-[20rem] h-[15rem]'
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <section className='w-full h-full bg-[#e8e8e8] rounded-md py-6 px-10'>
        <h2 className='text-4xl font-semibold text-[#5b5b5b]'>Post</h2>
        {/* Import posts from utilities */}
        {/* Only display posts owned by "Paramjit Saikia" */}
        {/*
          Make sure to have:
          import posts from '../utils/posts';
          at the top of your file!
        */}
        <div className="posts w-full h-full flex flex-wrap gap-4 justify-center items-center mt-6">
          {posts
            .filter(post => post.owner === "Paramjit Saikia")
            .map(post => (
              <div key={post.id} className="post1 group bg-white w-[48%] flex-col h-[25rem] rounded-2xl mt-6 flex gap-4 items-center justify-center">
                <div className="image w-[90%] h-[70%] rounded-xl m-3 bg-[#dbd9d9] overflow-hidden flex items-center justify-center">
                  <img
                    className="group-hover:scale-110 transition-transform duration-300 ease-in-out w-fit h-full"
                    src={post.image}
                    alt={post.title}
                  />
                </div>
                <div className="details h-[30%] overflow-hidden px-7">
                  <h1 className="text-2xl font-bold">{post.title}</h1>
                  <p className="text-sm py-2">{post.description.slice(0, 350)}{post.description.length > 350 && '...'}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </section>
  )
}

export default Profile