import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/authApi";

export function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login({ name, email });
      // Store name and email in localStorage only if login is successful
      if (response.ok) {
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        navigate("/search", { replace: true });
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        className="w-full max-w-xs p-8 bg-base-100 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Doggo Matcher 🐶
        </h1>
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <div className="text-error text-center">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
