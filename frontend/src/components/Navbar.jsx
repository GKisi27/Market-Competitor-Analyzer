import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoMca from "../assets/logoMca.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass, faHome } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const [searchtext, setSearchtext] = useState("");
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchtext("");
  };

  return (
    <div className="bg-[var(--bg-navbar)] h-22.5 flex justify-between items-center w-full px-15 shadow-sm">

      {/* Logo */}
      <div className="w-18 h-10">
        <img
          onClick={() => navigate("/dashboard")}
          className="h-full w-full cursor-pointer"
          src={logoMca}
          alt="MCA Logo"
        />
      </div>

      {/* Search */}
      {/* <form
        onSubmit={searchHandler}
        className="bg-[var(--bg-input)] w-87.5 h-10 px-3 rounded-lg flex justify-between items-center"
      >
        <input
          className="w-4/5 outline-none bg-transparent placeholder-gray-500 text-sm"
          placeholder="Search"
          onChange={(e) => setSearchtext(e.target.value)}
          value={searchtext}
          type="text"
        />
        <button type="submit">
          <FontAwesomeIcon className="text-lg text-gray-500 active:scale-110" icon={faMagnifyingGlass} />
        </button>
      </form> */}

      {/* Icons */}
      <div className="flex items-center gap-3">


        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer
            bg-[var(--bg-input)]
            hover:bg-[var(--bg-primary)] hover:text-blue-400 transition-all duration-200"
          title="Home"
        >
          <FontAwesomeIcon icon={faHome} />
        </button>

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer
            bg-[var(--bg-input)]
            transition-all duration-200"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer
            bg-[var(--bg-input)]
            hover:bg-[var(--bg-primary)] hover:text-blue-400 transition-all duration-200"
          title="Profile"
        >
          <FontAwesomeIcon className="text-xl" icon={faUser} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;