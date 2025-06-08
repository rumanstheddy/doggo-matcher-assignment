import { DogTableContainer } from "../components/DogTableContainer";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import FavoritesSideBar from "../components/FavoritesSideBar";
import MatchButton from "../components/MatchButton";
import { logout } from "../api/authApi";

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
      <button
        className="absolute top-16 right-24 btn btn-error text-white z-50"
        onClick={async () => {
          try {
            await logout();
            navigate("/login", { replace: true });
          } catch (e) {
            console.error("Logout failed:", e);
            alert("Logout failed. Please try again.");
          }
        }}
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-center mb-10 mt-16">
        🎲 Doggo Matcher 🐶
      </h1>
      <p className="text-center text-md text-white mb-8 max-w-xl">
        Search through adorable dogs, add your favorites, and click the Match 🐾
        button to discover your perfect doggo companion!
      </p>
      <DogTableContainer />
      <FavoritesSideBar />
      <div className="fixed right-48 bottom-6 z-50">
        <MatchButton onClick={() => navigate("/match")} />
      </div>
    </div>
  );
}
