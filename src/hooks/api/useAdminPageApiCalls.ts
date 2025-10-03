import type { GetAiInfuImagePathRequest, GetAiInfusRequest, GetBrandsRequest, UpdateAiInfuImageRequest } from "../../types/RequestTypes";
import type { GetAiInfuImagePathResponse, GetAiInfusResponse, GetAllAiInfusResponse, GetBrandsResponse, GetMarketplacesResponse, UpdateAiInfuImageResponse } from "../../types/ResponseTypes";
import type { ApiResponse } from "../../types/ResponseWrapperTypes";
import useApiResponseHandling from "../useApiResponseHandling";
import useAxios from "../useAxios";

export default function useAdminPageApiCalls() {
    const { axiosInstance } = useAxios();
    const { getSuccessApiResponse, getErrorApiResponse } = useApiResponseHandling();

    async function fetchGetMarketplaces(): Promise<ApiResponse<GetMarketplacesResponse>> {
        try {
            const response = await axiosInstance.get<GetMarketplacesResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_MARKETPLACES_ENDPOINT}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Username': "admin-username",
                        'x-Admin-Password': "admin-password",
                    }
                }
            );
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetBrands(body: GetBrandsRequest): Promise<ApiResponse<GetBrandsResponse>> {
        try {
            const response = await axiosInstance.get<GetBrandsResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_BRANDS_ENDPOINT}`,
                { params: body,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Username': "admin-username",
                        'x-Admin-Password': "admin-password",
                    }
                 });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetAiInfus(body: GetAiInfusRequest): Promise<ApiResponse<GetAllAiInfusResponse>> {
        try {
            const response = await axiosInstance.get<GetAllAiInfusResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_AI_INFUS_ENDPOINT}`, { params: body, headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Username': "admin-username",
                        'x-Admin-Password': "admin-password",
                    } });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetAiInfuImagePath(body: GetAiInfuImagePathRequest): Promise<ApiResponse<GetAiInfuImagePathResponse>> {
        try {
            const response = await axiosInstance.get<GetAiInfuImagePathResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_AI_INFU_IMAGE_PATH_ENDPOINT}`,
                { params: body,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Username': "admin-username",
                        'x-Admin-Password': "admin-password",
                    }
                 });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchUpdateAiInfuImage(body: UpdateAiInfuImageRequest): Promise<ApiResponse<UpdateAiInfuImageResponse>> {
        try {
            const response = await axiosInstance.post<UpdateAiInfuImageResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_UPDATE_AI_INFU_IMAGE_ENDPOINT}`, body, 
                {headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Username': "admin-username",
                        'x-Admin-Password': "admin-password",
                    }}
            );
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    return { fetchGetMarketplaces, fetchGetBrands, fetchGetAiInfus, fetchGetAiInfuImagePath, fetchUpdateAiInfuImage }
}