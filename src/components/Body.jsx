import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="browse" element={<Browse />} />
      </Routes>
    </div>
  );
};

export default Body;
