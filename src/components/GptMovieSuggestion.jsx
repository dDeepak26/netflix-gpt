import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { moviesName, moviesResult } = useSelector((store) => store.gpt);
  if (!moviesName) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-70">
      <div>
        {moviesName.map((moviesName, index) => (
          <MovieList
            key={moviesName}
            title={moviesName}
            movies={moviesResult[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
