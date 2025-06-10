import type { Dog } from "../interfaces/dog";

export function MatchResultText({
  text,
  loading,
  matchedDog,
  className = "",
}: {
  text: string;
  loading: boolean;
  matchedDog: Dog | null;
  className?: string;
}) {
  return (
    <div className={className}>
      {text}
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
