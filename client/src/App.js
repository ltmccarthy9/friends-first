import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import Profile from "./pages/Profile";


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <QueryClientProvider client={queryClient}>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </div>
        </QueryClientProvider>
      </Router>
      </QueryClientProvider>
  );
}

export default App;
