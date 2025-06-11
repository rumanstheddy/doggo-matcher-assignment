import { DogTableContainer } from "../components/DogTableContainer";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import FavoritesSideBar from "../components/FavoritesSideBar";
import MatchButton from "../components/MatchButton";
import { logout } from "../api/authApi";
import DogLoaderLoader from "../components/DogLoaderLoader";

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
        <DogLoaderLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="absolute top-16 right-24 btn btn-error text-white z-50 flex items-center gap-2"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
          />
        </svg>
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
