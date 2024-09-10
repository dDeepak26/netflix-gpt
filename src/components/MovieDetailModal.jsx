import React, { useEffect } from "react";
import { TMDB_IMAGE_URL } from "../utils/constant";

const MovieDetailModal = ({ movie, closeModal }) => {
  const originalLanguage = movie.original_language?.toUpperCase() || "N/A";
  const isAdult = movie.adult ? "Yes" : "No";

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-900 text-white p-4 md:p-6 rounded-lg shadow-lg relative w-full max-w-lg md:max-w-3xl mx-4 overflow-y-auto max-h-full">
        {/* Movie Poster and Details */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Movie Poster */}
          <img
            src={TMDB_IMAGE_URL + movie.poster_path}
            alt={movie.title}
            className="mb-4 md:mb-0 md:mr-6 w-full md:w-1/3 rounded-lg shadow-lg"
          />

          {/* Movie Details */}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {movie.title}
            </h2>
            <p className="text-gray-400 italic mb-4">{movie.tagline || ""}</p>

            {/* Movie Stats */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-4 text-sm">
              <p>
                <span className="font-semibold">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="font-semibold">Rating:</span>{" "}
                {movie.vote_average}/10
              </p>
              <p>
                <span className="font-semibold">Language:</span>{" "}
                {originalLanguage}
              </p>
              <p>
                <span className="font-semibold">Popularity:</span>{" "}
                {movie.popularity.toFixed(0)}
              </p>
              <p>
                <span className="font-semibold">Adult Content:</span> {isAdult}
              </p>
              <p>
                <span className="font-semibold">Vote Count:</span>{" "}
                {movie.vote_count}
              </p>
            </div>
          </div>
        </div>

        {/* Movie Overview */}
        <div className="mt-6">
          <h3 className="text-lg md:text-xl font-semibold mb-2">Overview</h3>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {movie.overview}
          </p>
        </div>

        {/* Close Button */}
        <button
          className="w-full bg-red-600 text-white py-2 rounded mt-4 font-bold hover:bg-red-700 transition-colors"
          onClick={closeModal}
          aria-label="Close"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetailModal;
