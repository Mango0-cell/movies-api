export interface PaginationMeta {
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    status: number;
    message: string;
    code: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
