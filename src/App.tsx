import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./pages/login";
import { Search } from "./pages/search";
import { NotFound } from "./pages/notfound";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MatchPage from "./pages/match";
import Welcome from "./pages/welcome";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
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
