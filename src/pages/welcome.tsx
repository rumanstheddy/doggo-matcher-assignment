import { useEffect } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

export default function Welcome() {
  const isAuthenticated = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/search", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 gap-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🎲 Doggo Matcher 🐶
      </h1>
      <h2 className="text-xl mb-8 text-center max-w-xl">
        Ready to find your perfect fur companion?
      </h2>
      <p className="text-lg mb-8 text-center max-w-xl">
        Browse, filter, and select dogs based on your preferences. Save your
        favorites and see who you match with!
      </p>
      <button
        className="btn btn-primary px-8 py-3 text-lg"
        onClick={() => navigate("/login")}
      >
        Login to Get Started
      </button>
    </div>
  );
}
