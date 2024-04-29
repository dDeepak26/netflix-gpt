import React, { useState } from "react";

const SignIn = () => {
  const [isSignInForm, setSignInForm] = useState(true);

  const toogleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-12 bg-black bg-opacity-80 rounded-lg shadow-md text-white sm:mt-4">
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form>
          {isSignInForm && (
            <div className="mb-6">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="Full Name"
              />
            </div>
          )}
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-black bg-opacity-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <div className="mt-6">
            <p onClick={toogleSignInForm}>
              {isSignInForm ? "New to Netflix? " : "Already registered? "}
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
