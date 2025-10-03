import type { GetBrandNameRequest, GetBrandPostsRequest, GetMarketplacePostsRequest } from "../../types/RequestTypes";
import type { GetBrandNameResponse, GetBrandPostsResponse, GetMarketplacePostsResponse } from "../../types/ResponseTypes";
import type { ApiResponse } from "../../types/ResponseWrapperTypes";
import useApiResponseHandling from "../useApiResponseHandling";
import useAxios from "../useAxios";

export default function useUserApiCalls() {
    const { axiosInstance } = useAxios();
    const { getSuccessApiResponse, getErrorApiResponse } = useApiResponseHandling();

    async function fetchGetMarketplacePosts(body: GetMarketplacePostsRequest): Promise<ApiResponse<GetMarketplacePostsResponse>> {
        try {
            const response = await axiosInstance.get<GetMarketplacePostsResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_MARKETPLACE_POSTS_ENDPOINT}`, { params: body });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetBrandName(body: GetBrandNameRequest): Promise<ApiResponse<GetBrandNameResponse>> {
        try {
            const response = await axiosInstance.get<GetBrandNameResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_BRAND_NAME_ENDPOINT}`, { params: body });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }


    async function fetchGetBrandPosts(body: GetBrandPostsRequest): Promise<ApiResponse<GetBrandPostsResponse>> {
        try {
            const response = await axiosInstance.get<GetBrandPostsResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_BRAND_POSTS_ENDPOINT}`, { params: body });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    return {
        fetchGetMarketplacePosts,
        fetchGetBrandName,
        fetchGetBrandPosts
    };
}