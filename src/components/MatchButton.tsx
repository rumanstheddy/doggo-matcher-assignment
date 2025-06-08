import { useFavorites } from "../hooks/useFavorites";

interface MatchButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function MatchButton({ onClick, disabled }: MatchButtonProps) {
  const { favouriteIds } = useFavorites();
  return (
    <button
      className="btn btn-primary rounded-3xl shadow-lg hover:scale-105 transition-transform text-xl px-2 h-16 flex items-center justify-center gap-2 min-w-[8rem]"
      onClick={onClick}
      aria-label="Find your match"
      type="button"
      disabled={disabled || favouriteIds.length < 2}
      style={{ fontWeight: 700 }}
    >
      <span>Match</span>
      <span className="text-2xl">🐾</span>
    </button>
  );
}

export default MatchButton;
