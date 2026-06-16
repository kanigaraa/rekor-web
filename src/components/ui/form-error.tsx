type FormErrorProps = {
  message?: string | string[];
  className?: string;
};

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message || message.length === 0) {
    return null;
  }

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div
      className={`rounded-md border border-danger-soft bg-danger-soft px-3 py-2 text-sm text-danger ${className}`}
      role="alert"
    >
      {messages.length === 1 ? (
        messages[0]
      ) : (
        <ul className="list-disc space-y-1 pl-4">
          {messages.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
