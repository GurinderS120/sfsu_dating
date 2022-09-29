import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const closeMenu = () => {
    if (displayMenu) {
      setDisplayMenu(false);
    }
  };

  return (
    <nav
      className={`${
        displayMenu ? "h-screen" : "h-auto"
      } bg-slate-200 lg:h-auto sticky top-0 z-10`}
    >
      {/* container */}
      <div className="lg:flex p-4 lg:justify-between lg:text-lg">
        <div className="flex justify-between lg:block">
          {/* Logo */}
          <h3>
            <Link
              onClick={closeMenu}
              className="no-underline font-bold tracking-wide"
              to="/"
            >
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
            displayMenu ? "block" : "hidden"
          } lg:flex flex-col mt-8 lg:mt-0 lg:flex-row lg:w-64 lg:justify-between ease-in-out duration-300`}
        >
          <li>
            <Link
              onClick={closeMenu}
              className="sm-nav-links lg:lg-nav-links ease-in-out duration-300"
              to="/policy"
            >
              Policy
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              className="sm-nav-links lg:lg-nav-links ease-in-out duration-300"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              className="sm-nav-links lg:lg-nav-links ease-in-out duration-300"
              to="/support"
            >
              Support
            </Link>
          </li>
        </ul>

        <ul
          className={`${
            displayMenu ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row mt-11 lg:mt-0 ease-in-out duration-300`}
        >
          <li>
            <Link onClick={closeMenu} className="btn" to="/signin">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
