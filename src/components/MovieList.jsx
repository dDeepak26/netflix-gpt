import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="px-4">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      </div>
      {selectedMovie && (
        <MovieDetailModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieList;
