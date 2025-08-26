export const checkSessionEdge = async (
  cookieHeader: string | null
): Promise<Response> => {
  const base =
    process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-api.goit.study";
  return fetch(`${base}/api/auth/session`, {
    headers: { Cookie: cookieHeader ?? "" },
  });
};
