import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <h1 className="text-xl font-bold">SpeakPro</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
        <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
