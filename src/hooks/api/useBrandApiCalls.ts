import type { Update } from "vite/types/hmrPayload.js";
import type { GetProductImagePathRequest, PostAiInfuRequest, PostPostImagesRequest, PostPostRequest, UpdateAiInfuPromptRequest } from "../../types/RequestTypes";
import type { GetBrandAiInfuBlueprintsResponse, GetBrandAiInfusResponse, GetProductImagePathResponse, PostAiInfuResponse, PostPostImagesResponse, PostPostResponse, UpdateAiInfuPromptResponse, ValidateBrandResponse } from "../../types/ResponseTypes";
import type { ApiResponse } from "../../types/ResponseWrapperTypes";
import useApiResponseHandling from "../useApiResponseHandling";
import useAxios from "../useAxios";

export default function useBrandApiCalls() {
  const { axiosInstance } = useAxios();
    const { getSuccessApiResponse, getErrorApiResponse } = useApiResponseHandling();

    async function fetchValidateBrand(marketplaceId: string, brandId: string): Promise<ApiResponse<ValidateBrandResponse>> {
        try {
            const response = await axiosInstance.get<ValidateBrandResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_VALIDATE_BRAND_ENDPOINT}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchPostAiInfu(marketplaceId: string, brandId: string, body: PostAiInfuRequest): Promise<ApiResponse<PostAiInfuResponse>> {
        try {
            const response = await axiosInstance.post<PostAiInfuResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_POST_AI_INFU_ENDPOINT}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchUpdateAiInfuPrompt(marketplaceId: string, brandId: string, body: UpdateAiInfuPromptRequest): Promise<ApiResponse<UpdateAiInfuPromptResponse>> {
        try {
            const response = await axiosInstance.post<UpdateAiInfuPromptResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_UPDATE_AI_INFU_PROMPT_ENDPOINT}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetBrandAiInfus(marketplaceId: string, brandId: string): Promise<ApiResponse<GetBrandAiInfusResponse>> {
        try {
            const response = await axiosInstance.get<GetBrandAiInfusResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_BRAND_AI_INFUS_ENDPOINT}`,
                {
                    headers: {
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetBrandAiInfuBlueprints(marketplaceId: string, brandId: string): Promise<ApiResponse<GetBrandAiInfuBlueprintsResponse>> {
        try {
            const response = await axiosInstance.get<GetBrandAiInfuBlueprintsResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_BRAND_AI_INFU_BLUEPRINTS_ENDPOINT}`,
                {
                    headers: {
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchGetProductImagePath(marketplaceId: string, brandId: string, body: GetProductImagePathRequest): Promise<ApiResponse<GetProductImagePathResponse>> {
        try {
            const response = await axiosInstance.get<GetProductImagePathResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_GET_PRODUCT_IMAGE_PATH_ENDPOINT}`,
                {
                    params: body,
                    headers: {
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchPostPostImages(marketplaceId: string, brandId: string, body: PostPostImagesRequest): Promise<ApiResponse<PostPostImagesResponse>> {
        try {
            const response = await axiosInstance.post<PostPostImagesResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_POST_POST_IMAGES_ENDPOINT}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    async function fetchPostPost(marketplaceId: string, brandId: string, body: PostPostRequest): Promise<ApiResponse<PostPostResponse>> {
        try {
            const response = await axiosInstance.post<PostPostResponse>(`${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER}${import.meta.env.VITE_API_MARKETPLACE_CONTROLLER_POST_POST_ENDPOINT}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Marketplace-Id': marketplaceId,
                        'X-Brand-Id': brandId,
                        'X-Marketplace-Secret': import.meta.env.VITE_API_MARKETPLACE_SECRET_KEY
                    }
                });
            return getSuccessApiResponse(response.data);
        } catch (e) {
            return getErrorApiResponse(e);
        }
    }

    return {
        fetchValidateBrand,
        fetchPostAiInfu,
        fetchGetBrandAiInfus,
        fetchGetBrandAiInfuBlueprints,
        fetchGetProductImagePath,
        fetchPostPostImages,
        fetchPostPost,
        fetchUpdateAiInfuPrompt
    };
}
