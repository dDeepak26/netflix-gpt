import React from "react";
import { TMDB_IMAGE_URL } from "../utils/constant";

const MovieCard = ({ movie, onClick }) => {
  if (!movie.poster_path) return null;

  return (
    <div
      className="flex flex-col items-center p-2 m-1 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="w-28 md:w-36 lg:w-44">
        <img
          src={TMDB_IMAGE_URL + movie.poster_path}
          alt="Movie Card Image"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <p className="mt-1 text-white text-center text-xs md:text-sm lg:text-base">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
