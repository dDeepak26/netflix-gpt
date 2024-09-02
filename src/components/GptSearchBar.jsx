import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <>
      <div className="h-28 sm:h-32 md:h-40"></div>
      <div className="flex justify-center sticky top-[70px] md:top-20 z-30 px-2 sm:p-0">
        <form className="grid grid-cols-12 w-full sm:w-[70%] md:w-[50%] p-2 md:p-3 rounded-lg shadow-lg">
          <input
            className="col-span-9 px-4 py-2 md:px-6 md:py-3 rounded-l-lg text-center text-gray-900 outline-none focus:ring-2 focus:ring-red-600"
            type="text"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button className="col-span-3 rounded-r-lg bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
