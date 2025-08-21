"use client";

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState<{
    type: string;
    data?: Record<string, unknown>;
    error?: string;
    status?: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const testHealthCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setResult({ type: "health", data, status: response.status });
    } catch (error) {
      setResult({
        type: "health",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
    setLoading(false);
  };

  const testNotesAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setResult({ type: "notes", data, status: response.status });
    } catch (error) {
      setResult({
        type: "notes",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🔧 Vercel Deployment Test</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={testHealthCheck}
          disabled={loading}
          style={{ marginRight: "10px" }}
        >
          Test Health Check
        </button>
        <button onClick={testNotesAPI} disabled={loading}>
          Test Notes API
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <h3>Result ({result.type}):</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
        <p>
          <strong>Environment Info:</strong>
        </p>
        <p>
          URL: {typeof window !== "undefined" ? window.location.href : "SSR"}
        </p>
        <p>
          User Agent:{" "}
          {typeof navigator !== "undefined" ? navigator.userAgent : "N/A"}
        </p>
      </div>
    </div>
  );
}
