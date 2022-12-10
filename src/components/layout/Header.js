import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative z-10 flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to={"/movie"}
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;