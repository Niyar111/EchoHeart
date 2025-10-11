import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    console.log("Post created:", { title, description, image });
    // send formData to backend API
  };

  return (
    <div className="w-full  max-w-5xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-xl transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-pulse">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="relative group">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all group-hover:border-blue-400"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="relative group">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all group-hover:border-blue-400 resize-none"
            placeholder="Write something..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="relative group">
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border-2 border-gray-300 rounded-xl cursor-pointer transition-all group-hover:border-blue-400"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-4 overflow-hidden rounded-xl border-2 border-gray-300 hover:scale-105 transform transition duration-300">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-80 object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;