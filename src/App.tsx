import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { useEffect } from "react";
import { Login } from "./pages/login";
import { Search } from "./pages/search";
import "./index.css";
import { useAuthStatus } from "./hooks/useAuthStatus";

function AuthGate() {
  const isAuthenticated = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/search", { replace: true });
    } else if (isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGate />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
