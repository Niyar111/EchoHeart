import React from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import posts from '../utils/posts'

const Explore = () => {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <section className='w-full h-screen flex flex-col items-center justify-center'>
      <div className="search w-[90%] h-[3.5rem] flex items-center justify-between border-1 border-[#999595] rounded-full gap-4 bg-white">
        <div className='flex items-center w-full gap-1'>
          <div className='py-2 px-4 text-black rounded-l-full'>
            <Search />
          </div>
          <input type="text" placeholder="Find your interest...." className='outline-none border-none' />
        </div>
      </div>
      <div className="mt-[2rem] items w-[95%] h-[82%] rounded-2xl overflow-hidden border-1 border-[#999595] grid grid-cols-6 grid-rows-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="posts group relative col-span-2 row-span-3 flex items-center justify-center p-4 transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <img
              className='group-hover:scale-110 transition-transform duration-300 ease-in-out flex justify-end object-cover w-full h-full'
              src={post.image}
              alt={post.title}
            />
            <div className="details absolute hover:flex items-end justify-center z-3 w-full h-full  hidden group-hover:block bg-gradient-to-t from-white to-transparent p-4 text-black">
              <h2 className='text-3xl font-bold text-[#aa0000] flex'>{post.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Explore