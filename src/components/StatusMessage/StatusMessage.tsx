interface StatusMessageProps {
  status: "idle" | "locating" | "loading" | "error";
  error?: string;
}

export default function StatusMessage({ status, error }: StatusMessageProps) {
  if (status === "idle") {
    return (
      <div className="text-center py-12 px-5 text-[var(--ink-soft)] text-base leading-normal">
        <p>Tell me where you are and I'll tell you what to wear.</p>
      </div>
    );
  }

  if (status === "locating" || status === "loading") {
    return (
      <div className="text-center py-12 px-5 text-[var(--ink-soft)] text-base leading-normal">
        <p className="pulse">
          {status === "locating" ? "Finding you…" : "Reading the sky…"}
        </p>
      </div>
    );
  }

  if (status === "error" && error) {
    return (
      <div className="text-center py-12 px-5 text-[#a8453a] text-base leading-normal">
        <p>{error}</p>
      </div>
    );
  }

  return null;
}
