import { DogTableContainer } from "../components/DogTableContainer";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import FavoritesButton from "../components/FavoritesButton";

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
      {/* <div className="flex flex-row items-center justify-center w-full"> */}
      <DogTableContainer />
      {/* <div className="flex flex-row items-center justify-center w-full sticky bottom-8 right-16 z-50 mt-4"> */}
      <FavoritesButton
        onClick={() => {
          /* TODO: open sidebar */
        }}
      />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
