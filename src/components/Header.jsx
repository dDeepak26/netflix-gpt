import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORT_LANGUAGES } from "../utils/constant";
import lang from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.error("Sign Out Successfully");
      })
      .catch((error) => {
        toast.error("An error occurred while signing out");
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="z-40 fixed top-0 h-16 md:h-20 flex items-center justify-between w-full p-4 bg-gradient-to-b from-black from-40% to-transparent">
      {/* Netflix logo - Always visible */}
      <div className="flex items-center">
        <img
          src="/assets/netflix-logo-removebg.png"
          alt="Netflix logo"
          className="h-8 md:h-10"
        />
      </div>

      {/* Mobile Menu Icon - Only visible on mobile */}
      <div className="block md:hidden">
        <button onClick={handleDropdownToggle} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Main Content - Hidden on mobile */}
      <div className={`hidden md:flex items-center space-x-4`}>
        {user && (
          <div className="relative flex items-center space-x-2 md:space-x-4">
            <button
              className="py-2 px-4 mx-3 text-white font-bold bg-purple-800 rounded-lg w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:bg-purple-700 whitespace-nowrap"
              onClick={handleGptSearchClick}
            >
              {showGptSearch
                ? lang[langKey].homePage
                : lang[langKey].gptSearchButton}
            </button>

            <img
              src={user.photoURL || "../assets/profileImage.png"}
              alt="User icon"
              className="h-6 w-6 md:h-8 md:w-8 border-2 border-white cursor-pointer"
              onClick={handleDropdownToggle}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-6 w-6 text-white transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-60 bg-gray-800 border border-gray-700 rounded shadow-lg text-white">
                <div className="p-4">
                  <table className="w-full table-fixed">
                    <tbody>
                      <tr>
                        <td className="py-1 px-2 font-bold text-gray-400 whitespace-nowrap w-1/3">
                          {lang[langKey].name}
                        </td>
                        <td className="py-1 px-2 whitespace-normal overflow-hidden">
                          {user.displayName}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 px-2 font-bold text-gray-400 whitespace-nowrap w-1/3">
                          {lang[langKey].email}
                        </td>
                        <td className="py-1 px-2 whitespace-normal break-all">
                          {user.email}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="pt-4">
                          <button
                            onClick={handleSignOut}
                            className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          >
                            {lang[langKey].signOut}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* <button
              onClick={handleSignOut}
              className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              {lang[langKey].signOut}
            </button> */}
          </div>
        )}

        <select
          onChange={handleLanguageChange}
          className="bg-transparent text-white border border-white rounded px-2 py-1"
        >
          {SUPPORT_LANGUAGES.map((lang) => (
            <option
              key={lang.identifier}
              className="bg-black text-white border border-white rounded px-2 py-1"
              value={lang.identifier}
            >
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Dropdown Menu - Visible only when toggled on mobile */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-gray-900 text-white p-4 md:hidden">
          {user && (
            <div className="flex flex-col space-y-4">
              <button
                className="py-2 px-4 text-white font-bold bg-purple-800 rounded-lg w-full"
                onClick={handleGptSearchClick}
              >
                {showGptSearch
                  ? lang[langKey].homePage
                  : lang[langKey].gptSearchButton}
              </button>

              <div className="flex items-center space-x-2">
                <img
                  src={
                    user.photoURL ||
                    "data:image/png;base64,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"
                  }
                  alt="User icon"
                  className="h-8 w-8 border-2 border-white"
                />
                <div className="flex-1">
                  <div>{user.displayName}</div>
                  <div className="text-gray-400 text-sm">{user.email}</div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                {lang[langKey].signOut}
              </button>
            </div>
          )}

          <select
            onChange={handleLanguageChange}
            className="bg-transparent text-white border border-white rounded px-2 py-1 mt-4 w-full"
          >
            {SUPPORT_LANGUAGES.map((lang) => (
              <option
                key={lang.identifier}
                className="bg-black text-white border border-white rounded px-2 py-1"
                value={lang.identifier}
              >
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Header;
