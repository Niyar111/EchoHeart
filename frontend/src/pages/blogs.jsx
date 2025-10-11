import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import posts from '../utils/posts';
import { ArrowLeft } from 'lucide-react';

const Blogs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the post with the matching ID
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Post not found</h2>
        <button
          onClick={() => navigate('/explore')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/explore')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Explore
      </button>

      {/* Post content */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
        <div className="relative h-[30rem] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex  flex-col items-start gap-1 font-semibold text-md text-gray-600">
              <span className="flex items-center gap-1">
                <span className="font-medium">Posted by:</span> {post.owner}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Date:</span> {post.dateOfPost}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Location:</span> {post.location}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Category:</span> {post.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {post.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Blogs;