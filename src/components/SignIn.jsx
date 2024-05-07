import React, { useRef, useState } from "react";
import checkValidData from "../utils/validate";

const SignIn = () => {
  const [isSignInForm, setSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      name.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
  };

  const toogleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-12 bg-black bg-opacity-80 rounded-lg shadow-md text-white sm:mt-4">
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign Up" : "Sign In"}
        </h1>
        <form onSubmit={(e) => e.preventDefault}>
          {isSignInForm && (
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
              {isSignInForm ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="mt-6">
            <p onClick={toogleSignInForm}>
              {isSignInForm ? "Already registered " : "New to Netflix? "}
              <span className="cursor-pointer underline user-se">
                {!isSignInForm ? "Sign Up" : "Sign In"} Now
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
