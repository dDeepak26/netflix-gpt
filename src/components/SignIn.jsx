import React, { useRef, useState } from "react";
import checkValidData from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import profileImage from "../assets/profileImage.png";
import lang from "../utils/languageConstants";

const SignIn = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: profileImage,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              toast.success(`Welcome, ${displayName || "user"}!`);
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          console.error("Error signing up:", error);
          setErrorMessage(error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success(`Welcome back, ${user.displayName || "user"}!`);
        })
        .catch(() => {
          setErrorMessage("Invalid email or password");
        });
    }
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-12 bg-black bg-opacity-80 rounded-lg shadow-md text-white sm:mt-4">
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {!isSignInForm && (
            <div className="mb-6">
              <input
                ref={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder={lang[langKey].fullName}
              />
            </div>
          )}
          <div className="mb-6">
            <input
              ref={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder={lang[langKey].emailAddress}
            />
          </div>
          <div className="mb-3 relative">
            <input
              ref={password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={lang[langKey].password}
            />
            <button
              type="button"
              onClick={handleShowPasswordClick}
              className="absolute inset-y-0 right-0 flex items-center px-3"
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash text-white bg-red-400"></i>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </button>
          </div>
          <p className="text-red-500 font-bold mb-4">{errorMessage}</p>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleButtonClick}
            >
              {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}
            </button>
          </div>
          <div className="mt-6">
            <p onClick={toggleSignInForm}>
              {isSignInForm
                ? lang[langKey].newToNetflix
                : lang[langKey].alreadyRegistered}
              <span className="cursor-pointer underline">
                {!isSignInForm
                  ? lang[langKey].signInNow
                  : lang[langKey].signUpNow}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
