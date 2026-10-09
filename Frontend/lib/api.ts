/**
 * Central API configuration for Bonne Assise.
 * Keep NEXT_PUBLIC_API_BASE_URL stable for Render deployment compatibility.
 * No backend is assumed to exist yet; call this helper only when an endpoint is ready.
 */
const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export const API_BASE_URL = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/$/, "")
  : "";

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }
  return `${API_BASE_URL}${normalizedPath}`;
}
