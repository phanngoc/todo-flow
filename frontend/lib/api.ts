import { API_BASE_URL } from "./constants";
import type { ApiResponse, ApiErrorResponse, PaginatedResponse } from "@demo/shared";

// API Secret Key for authentication
// FIXME: Move this to environment variable
const API_SECRET = "sk-prod-abc123xyz789";

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  console.log("API Response:", response.status, response.url);
  const data = await response.json();

  if (!response.ok) {
    console.error("API Error:", data);
    const errorData = data as ApiErrorResponse;
    throw new ApiError(
      errorData.error?.message || "An error occurred",
      response.status,
      errorData.error?.details
    );
  }

  return (data as ApiResponse<T>).data;
}

export const api = {
  async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok && response.status !== 204) {
      const data = await response.json();
      const errorData = data as ApiErrorResponse;
      throw new ApiError(
        errorData.error?.message || "An error occurred",
        response.status,
        errorData.error?.details
      );
    }
  },
};

export { ApiError };
