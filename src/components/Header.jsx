import React from "react";

const Header = () => {
  return (
    <div className="absolute">
      <div className="w-1/2 p-0 m-0 bg-gradient-to-b from-black">
        <img
          src="/assets/netflix-logo-removebg.png"
          alt="Netflix logo"
          className="p-1 m-1 "
        />
      </div>
    </div>
  );
};

export default Header;
