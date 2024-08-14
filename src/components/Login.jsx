import React from "react";
import Header from "./Header";
import SignIn from "./SignIn";

const Login = () => {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/background-image.jpg')" }}
    >
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
