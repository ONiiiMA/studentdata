import React, { useState } from "react";

function Header({ BgColor, setBgColor }) {
  const toggleBgColor = () => {
    setBgColor(BgColor === "bg-black-500" ? "bg-blue-100" : "bg-black-500");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">My App</h1>
      <nav>
        <ul className="flex gap-4 text-gray-600">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <button
            className="hover:text-blue-600 cursor-pointer"
            onClick={toggleBgColor}
          >
            Change Color
          </button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
