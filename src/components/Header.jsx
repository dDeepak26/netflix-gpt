import React from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
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

    // UnSubcribe when component will unmounts
    return () => unsubcribe();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center">
        <img
          src="/assets/netflix-logo-removebg.png"
          alt="Netflix logo"
          className="h-10"
        />
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User icon"
              className="h-8 w-8 border-2 border-white"
            />
          ) : (
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"></div>
          )}
          <button
            onClick={handleSignOut}
            className="text-white font-bold hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
