import React from "react";

interface CloseIconButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const CloseIconButton: React.FC<CloseIconButtonProps> = ({
  onClick,
  className = "",
  ariaLabel = "Close",
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={className}
  >
    <span aria-hidden="true">&times;</span>
  </button>
);

export default CloseIconButton;
