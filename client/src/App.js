import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";




function App() {
  


  return (
    
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages/>} />
        </Routes>
        </div>
      </Router>
      
  );
}

export default App;
