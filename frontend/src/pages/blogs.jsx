// src/routes/BlogPost.jsx
import { useParams } from 'react-router-dom';

function BlogPost() {
  // Destructures the value of the :postSlug parameter from the URL
  const { postSlug } = useParams();

  // 💡 Example: If the URL is /blog/hello-world-123, then postSlug will be "hello-world-123"

  // Now you can use 'postSlug' to fetch the correct blog post data
  // e.g., fetchPostData(`/api/posts/${postSlug}`);

  return (
    <div>
      <h1>Blog Post: {postSlug}</h1>
      <p>This is the content for the post with the slug: {postSlug}</p>
    </div>
  );
}

export default BlogPost;