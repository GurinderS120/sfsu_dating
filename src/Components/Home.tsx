import Navbar from "./Navbar";
import HomeImg from "../Images/pexels-pixabay-33109.jpg";
import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <>
      {/* Background image */}
      <div className="h-screen bg-slate-500">
        <img
          className="h-full w-full object-cover mix-blend-overlay"
          src={HomeImg}
          alt="Background-img"
        />
      </div>
      {/* Welcome text */}
      <div className="absolute top-1/2 z-3 text-center w-[100%] text-lg sm:text-xl lg:text-2xl text-white font-bold">
        <h3 className="mb-5">Begin your SFSU dating journey today</h3>
        <Link
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded text-center lg:inline ease-in-out duration-300"
          to="/signup"
        >
          Get Started
        </Link>
      </div>
    </>
  );
};

export default Home;
