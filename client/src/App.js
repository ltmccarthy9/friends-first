import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";


function App() {

  return (
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
