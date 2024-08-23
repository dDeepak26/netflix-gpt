import React, { useRef, useState } from "react";
import checkValidData from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import profileImage from "../assets/profileImage.png";

const SignIn = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Update Profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: profileImage,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              toast.success(`Welcome, ${displayName || "user"}!`);
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success(`Welcome back, ${user.displayName || "user"}!`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    }
  };

  const toogleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-12 bg-black bg-opacity-80 rounded-lg shadow-md text-white sm:mt-4">
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form onSubmit={(e) => e.preventDefault}>
          {!isSignInForm && (
            <div className="mb-6">
              <input
                ref={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="Full Name"
              />
            </div>
          )}
          <div className="mb-6">
            <input
              ref={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-3">
            <input
              ref={password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            <p className="text-red-500 font-bold">{errorMessage}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <div className="mt-6">
            <p onClick={toogleSignInForm}>
              {isSignInForm ? "New to Netflix? " : "Already registered "}
              <span className="cursor-pointer underline user-se">
                {!isSignInForm ? "Sign In" : "Sign Up"} Now
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
