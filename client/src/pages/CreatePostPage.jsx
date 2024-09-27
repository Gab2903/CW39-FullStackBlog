import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    cover: "",
    genre: "",
    director: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Movie added successfully!");
          navigate("/"); // Redirect to the homepage or movie list
        } else {
          alert("Error adding movie.");
        }
      })
      .catch((error) => console.error("Error adding movie:", error));
  };

  return (
    <div className="p-8 bg-gray-900 text-[#d5c3aa] rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Add a New Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Cover Image URL</label>
          <input
            type="url"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
