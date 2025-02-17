import React from "react";
import {
  FaBook,
  FaHome,
  FaSearch,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        {/* Firm Name */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span>Sherpa</span>
            <span className="text-red-600">Dai</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>

        <Link to="/profile"></Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <button
              className="flex items-center text-slate-500 hover:text-sky-600"
              li
            >
              <FaHome size={24} />
              <span className="ml-2 hidden sm:inline">Home</span>
            </button>
          </Link>

          {/* Profile Icon */}
          <Link to="/profile">
            <button
              className="flex items-center text-slate-500 hover:text-sky-600"
              li
            >
              <FaUserCircle size={24} />
              <span className="ml-2 hidden sm:inline">Profile</span>
            </button>
          </Link>

          {/* Sign-In Icon */}
          <Link to="/sign-in">
            <button className="flex items-center text-slate-500 hover:text-sky-600">
              <FaSignInAlt size={24} />
              <span className="ml-2 hidden sm:inline">Sign In</span>
            </button>
          </Link>

          {/* About icon */}
          <Link to="/about">
            <button className="flex items-center text-slate-500 hover:text-sky-600">
              <FaBook size={24} />
              <span className="ml-2 hidden sm:inline">About</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
