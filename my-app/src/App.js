import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ResetPassword from './components/Auth/ResetPassword';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
