import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="flex items-center justify-between w-screen p-2 bg-gradient-to-b from-black">
      <div className="w-full flex justify-start items-center p-2">
        <img
          src="/assets/netflix-logo-removebg.png"
          alt="Netflix logo"
          className="h-10"
        />
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User icon"
              className="h-8 w-8 rounded-full border-2 border-black"
            />
          ) : (
            <div className="h-8 w-8 rounded-full border-2 border-black bg-gray-300"></div>
          )}
          <button onClick={handleSignOut} className="text-white font-bold">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
