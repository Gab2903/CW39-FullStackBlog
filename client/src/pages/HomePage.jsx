import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleCardClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="p-4">
      <h1 className="flex p-4 justify-center text-[#d5c3aa] font-bold">
        Movie Blog by GIS
      </h1>
      <Link to="/create-post">
        <button className="bg-gray-800 hover:bg-blue-600 text-[#d5c3aa] px-4 py-2 rounded-lg mb-4">
          Add a Movie
        </button>
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 text-[#d5c3aa] rounded-lg shadow-lg p-4 flex flex-col items-center text-center cursor-pointer hover:bg-slate-700"
            onClick={() => handleCardClick(movie)}
          >
            {movie.cover && (
              <img
                src={movie.cover}
                alt={movie.title}
                className="max-w-full h-72 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
