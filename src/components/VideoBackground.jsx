import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  // Fetch trailer video from TMDB API & update store
  useMovieTrailer({ movieId });
  return (
    <div className="w-full">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&muted=1`}
        //  title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;