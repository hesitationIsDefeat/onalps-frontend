export type ApiResponse<R> = {
    success: boolean;
    response?: R;
    error?: ApiError;
}

export type ApiError = {
    code: number;
    details?: Record<string, unknown>;
}