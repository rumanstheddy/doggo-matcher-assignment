import { DogTableContainer } from "../components/DogTableContainer";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import FavoritesSideBar from "../components/FavoritesSideBar";
import MatchButton from "../components/MatchButton";

export function Search() {
  const isAuthenticated = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-center my-10">Doggo Matcher 🐶</h1>
      <DogTableContainer />
      <FavoritesSideBar />
      <MatchButton onClick={() => { /* TODO: Add match logic */ }} />
    </div>
  );
}
