
import React from 'react'
import { Link } from 'react-router-dom';

const Library = () => {
  const posts = [
    { id: 1, title: 'My First Post', slug: 'my-first-post-slug' },
    { id: 2, title: 'Vite React Tips', slug: 'vite-react-tips-2' },
  ];

  return (
    <div className='relative min-h-full  w-full overflow-hidden bg-gradient-to-tr from-[#ffe100] to-[#ffffff71]' >
      <h2>All Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* 🚀 Generates the URL: /blog/my-first-post-slug */}
            <Link to={`/legacy-library/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library