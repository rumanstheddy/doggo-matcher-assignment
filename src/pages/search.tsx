import { DogTable } from "../components/DogTable";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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
      <h1 className="text-3xl font-bold mb-4 text-center mt-10">
        Doggo Matcher 🐶
      </h1>
      <DogTable />
    </div>
  );
}

// I want to implement a search bar where users can select amongst different dog breeds and filter the results based on the selected breeds. I will worry about the filtering later
