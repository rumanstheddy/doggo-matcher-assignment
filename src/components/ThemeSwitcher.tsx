import React from "react";

const themes = ["light", "dark"];

export default function ThemeSwitcher() {
  function setTheme(theme: string) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  React.useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  return (
    <div className="flex gap-2 mb-4">
      {themes.map((theme) => (
        <button
          key={theme}
          className="btn btn-sm btn-outline"
          onClick={() => setTheme(theme)}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
}
