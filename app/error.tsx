"use client";

import css from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.errorContainer}>
      <h2 className={css.errorTitle}>Something went wrong!</h2>
      <p className={css.errorMessage}>
        {error.message || "An unexpected error occurred"}
      </p>
      <button onClick={reset} className={css.retryButton}>
        Try again
      </button>
    </div>
  );
}
