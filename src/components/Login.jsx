import React from "react";
import Header from "./Header";
import SignIn from "./SignIn";

const Login = () => {
  return (
    <div className="flex flex-col h-screen bg-cover bg-center bg-[url('/assets/background-image.jpg')]">
      <Header />
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
