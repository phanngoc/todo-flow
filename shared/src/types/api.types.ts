// API Response wrappers
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// List response wrapper
export interface ListResponse<T> {
  success: true;
  data: PaginatedResponse<T>;
}
