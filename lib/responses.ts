export interface ApiResponse<T = any> {
  data: T | null;
  meta: {
    timestamp: string;
    requestId?: string;
    page?: number;
    limit?: number;
    total?: number;
  };
  links: {
    self?: string;
    next?: string | null;
    prev?: string | null;
  };
  error: {
    code: string;
    message: string;
    details?: string[];
  } | null;
}

export function createSuccessResponse<T>(
  data: T,
  meta: Partial<ApiResponse<T>['meta']> = {},
  links: Partial<ApiResponse<T>['links']> = {}
): ApiResponse<T> {
  return {
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
    links,
    error: null,
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  details?: string[],
  meta: Partial<ApiResponse['meta']> = {}
): ApiResponse {
  return {
    data: null,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
    links: {},
    error: {
      code,
      message,
      details,
    },
  };
}
