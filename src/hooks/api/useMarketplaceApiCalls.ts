import type { GetBrandsRequest, PostBrandRequest } from "../../types/RequestTypes";
import type { GetBrandsResponse, PostBrandResponse } from "../../types/ResponseTypes";
import type { ApiResponse } from "../../types/ResponseWrapperTypes";
import useApiResponseHandling from "../useApiResponseHandling";
import useAxios from "../useAxios";

export default function useMarketplaceApiCalls() {
    const { axiosInstance } = useAxios();
    const { getSuccessApiResponse, getErrorApiResponse } = useApiResponseHandling();
    async function fetchGetBrands(body: GetBrandsRequest): Promise<ApiResponse<GetBrandsResponse>> {
        try {
            const response = await axiosInstance.get<GetBrandsResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_BRANDS_ENDPOINT}`, { params: body });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchPostBrand(body: PostBrandRequest): Promise<ApiResponse<PostBrandResponse>> {
        try {
            const response = await axiosInstance.post<PostBrandResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_POST_BRAND_ENDPOINT}`, body);
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    return {
        fetchGetBrands,
        fetchPostBrand
    };
}