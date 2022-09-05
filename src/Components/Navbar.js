import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <nav className="bg-slate-200 h-screen">
      {/* container */}
      <div className="lg:flex p-3 lg:justify-between lg:text-lg">
        <div className="flex justify-between lg:block">
          {/* Logo */}
          <h3>
            <Link className="no-underline font-bold tracking-wide" to="/">
              SFSU-Dating
            </Link>
          </h3>
          {/* Toggler btn */}
          <button
            className="lg:hidden"
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Menu */}
        <ul
          className={`${
            displayMenu ? "translate-x-0" : "translate-x-[104%]"
          } lg:flex flex-col mt-8 lg:mt-0 lg:flex-row lg:w-64 lg:justify-between ease-in-out duration-300`}
        >
          <li>
            <Link className="sm-nav-links lg:lg-nav-links" to="/policy">
              Policy
            </Link>
          </li>
          <li>
            <Link className="sm-nav-links lg:lg-nav-links" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="sm-nav-links lg:lg-nav-links" to="/support">
              Support
            </Link>
          </li>
        </ul>

        <ul
          className={`${
            displayMenu ? "translate-x-0" : "translate-x-[104%]"
          } lg:flex flex-col lg:flex-row mt-11 lg:mt-0 ease-in-out duration-300`}
        >
          <li>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block lg:inline"
              to="/signin"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
