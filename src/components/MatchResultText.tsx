import type { Dog } from "../api/dogApi";

export function MatchResultText({
  loading,
  matchedDog,
}: {
  loading: boolean;
  matchedDog: Dog | null;
}) {
  return (
    <div className="mb-6 text-3xl font-semibold flex items-center justify-center min-h-[48px]">
      Your match is...{" "}
      {loading ? (
        <span className="ml-4 w-32 h-8 rounded skeleton"></span>
      ) : matchedDog ? (
        <span className="ml-4 font-bold text-primary animate-fade-in">
          {matchedDog.name} 🎉
        </span>
      ) : null}
    </div>
  );
}
