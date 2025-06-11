import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { useEffect } from "react";
import { Login } from "./pages/login";
import { Search } from "./pages/search";
import { NotFound } from "./pages/notfound";
import "./index.css";
import { useAuthStatus } from "./hooks/useAuthStatus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MatchPage from "./pages/match";
import DogLoaderLoader from "./components/DogLoaderLoader";

const queryClient = new QueryClient();

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
      <DogLoaderLoader />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthGate />} />
          <Route path="/search" element={<Search />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
