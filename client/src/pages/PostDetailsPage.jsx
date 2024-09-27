import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  const handleDelete = () => {
    // Hier zum Delete Funktionalität (Sami)
    alert("Noch nicht implementiert");
  };

  const handleUpdate = () => {
    // Hier zum Update Funktionalität (Sami)
    alert("sry, die Funktionalität muss noch implementiert werden");
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-900 text-[#d5c3aa] rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">{movie.title}</h1>
      {movie.cover && (
        <img
          src={movie.cover}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-lg mb-2">Year: {movie.year}</p>
      <p className="text-lg mb-2">Genre: {movie.genre}</p>
      <p className="text-lg mb-2">Director: {movie.director}</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PostDetailsPage;
