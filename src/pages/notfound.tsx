import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}
