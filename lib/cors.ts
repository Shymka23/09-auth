// CORS configuration utility
export const getCorsHeaders = (origin?: string) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
  ];

  const requestOrigin = origin || "http://localhost:3000";
  const isAllowedOrigin = allowedOrigins.includes(requestOrigin);

  return {
    "Access-Control-Allow-Origin": isAllowedOrigin
      ? requestOrigin
      : "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
    "Access-Control-Allow-Credentials": "true",
  };
};
