export interface ApiClientOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://data.javin.io/api";

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  
  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
