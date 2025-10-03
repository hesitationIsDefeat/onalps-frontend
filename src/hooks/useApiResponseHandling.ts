import { AxiosError } from "axios";
import type { ApiResponse } from "../types/ResponseWrapperTypes";



function useApiResponseHandling() {
    function getSuccessApiResponse<R>(responseData?: R): ApiResponse<R> {
        return responseData ? { success: true, response: responseData } : { success: true }
    }

    function getBasicApiResponse(response: Response) {
        return response.ok ? { success: true } : { success: false, error: { code: response.status } }
    }

    function getErrorApiResponse<R>(e: unknown
    ): ApiResponse<R> {
        if (e instanceof AxiosError && e.response) {
            const status = e.response.status;
            const error = e.response.data.data ? { code: status, details: e.response.data.data } : { code: status }
            return { success: false, error };
        }
        return { success: false }
    }

    return { getSuccessApiResponse, getBasicApiResponse, getErrorApiResponse }
}

export default useApiResponseHandling