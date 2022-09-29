import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Home from "./pages/Home";

function App() {

  return (
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
