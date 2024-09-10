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
    const unsubcribe = onAuthStateChanged(auth, (user) => {
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

    return () => unsubcribe();
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
          {/* Replace with any menu icon or an SVG */}
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
              className="py-2 px-4 mx-3 text-white font-bold bg-purple-800 rounded-lg"
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
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="text-white text-sm md:text-base font-bold hover:underline"
            >
              {lang[langKey].signOut}
            </button>
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
          {/* Same content as main content but optimized for mobile */}
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
                  src={user.photoURL || "../assets/profileImage.png"}
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
                className="text-white font-bold w-full hover:underline"
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
