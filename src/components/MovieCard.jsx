import React from "react";
import { TMDB_IMAGE_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-3">
      <img src={TMDB_IMAGE_URL + posterPath} alt="Movie Card Image" />
    </div>
  );
};

export default MovieCard;
