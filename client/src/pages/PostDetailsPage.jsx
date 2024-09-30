import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState({
    title: "",
    year: "",
    cover: "",
    genre: "",
    director: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setUpdatedMovie(data);
      })
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:8000/movies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Movie deleted successfully");
          navigate("/");
        } else {
          alert("Failed to delete the movie");
        }
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        alert("An error occurred while trying to delete the movie");
      });
  };

  const handleUpdate = () => {
    setIsEditing(true);
    setUpdatedMovie({
      title: movie.title,
      year: movie.year,
      cover: movie.cover,
      genre: movie.genre,
      director: movie.director,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((response) => {
        if (response.ok) {
          alert("Movie updated successfully");
          setMovie(updatedMovie);
          setIsEditing(false);
        } else {
          alert("Failed to update the movie");
        }
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
        alert("An error occurred while trying to update the movie");
      });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full my-8 p-8 bg-gray-900 text-[#d5c3aa] rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">{movie.title}</h1>
      {movie.cover && (
        <img
          src={movie.cover}
          alt={movie.title}
          className="max-w-full h-96 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-lg mb-2">Year: {movie.year}</p>
      <p className="text-lg mb-2">Genre: {movie.genre}</p>
      <p className="text-lg mb-2">Director: {movie.director}</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="title"
            value={updatedMovie.title}
            onChange={handleInputChange}
            className="mb-2 w-full p-2"
            placeholder="Title"
          />
          <input
            type="text"
            name="year"
            value={updatedMovie.year}
            onChange={handleInputChange}
            className="mb-2 w-full p-2"
            placeholder="Year"
          />
          <input
            type="text"
            name="cover"
            value={updatedMovie.cover}
            onChange={handleInputChange}
            className="mb-2 w-full p-2"
            placeholder="Cover URL"
          />
          <input
            type="text"
            name="genre"
            value={updatedMovie.genre}
            onChange={handleInputChange}
            className="mb-2 w-full p-2"
            placeholder="Genre"
          />
          <input
            type="text"
            name="director"
            value={updatedMovie.director}
            onChange={handleInputChange}
            className="mb-2 w-full p-2"
            placeholder="Director"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default PostDetailsPage;
