import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        icon={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        stacked
        limit={3}
        toastStyle={{ border: "1px solid #dadadaaa" }}
        // transition:Bounce
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="browse" element={<Browse />} />
      </Routes>
    </div>
  );
};

export default Body;
