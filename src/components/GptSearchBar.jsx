import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const searchMoviesTMDB = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const prompt =
      "Act as a movie Recommendation system and suggest some movies foe the query : " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Don, Sholay, Golmaal, Koi Mil Gaya";

    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const result = await model.generateContent([prompt]);
      console.log(result.response.text());
      const gptMoviesArray = result.response.text().split(",");
      console.log(gptMoviesArray);

      const promiseArray = gptMoviesArray.map((movie) =>
        searchMoviesTMDB(movie)
      );

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({
          moviesName: gptMoviesArray,
          moviesResult: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <>
      <div className="h-28 sm:h-32 md:h-40"></div>
      <div className="flex justify-center sticky top-[70px] md:top-20 z-30 px-2 sm:p-0">
        <form
          className="grid grid-cols-12 w-full sm:w-[70%] md:w-[50%] p-2 md:p-3 rounded-lg shadow-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            className="col-span-9 px-4 py-2 md:px-6 md:py-3 rounded-l-lg text-center text-gray-900 outline-none focus:ring-2 focus:ring-red-600"
            type="text"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="col-span-3 rounded-r-lg bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
