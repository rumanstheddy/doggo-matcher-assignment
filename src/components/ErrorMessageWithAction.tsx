interface ErrorMessageWithActionProps {
  message: string;
  onBack: () => void;
}

export function ErrorMessageWithAction({ message, onBack }: ErrorMessageWithActionProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="text-error">{message}</div>
      <button className="btn btn-primary" onClick={onBack}>
        Back to Login
      </button>
    </div>
  );
}
