import type { AiInfuState } from "../enums/AiInfuState";

export type Marketplace = {
    name: string;
    id: string;
}

export type GetMarketplacesResponse = Marketplace[];

export type Brand = {
    name: string;
    id: string;
}

export type GetBrandsResponse = Brand[];

export type AiInfu = {
    name: string;
    id: string;
    imageUrl: string;
    isActive: boolean;
}

export type AiInfuDetailed = {
    name: string;
    id: string;
    imageUrl: string;
    prompt: string;
    isActive: boolean;
}

export type AiInfuBlueprint = {
    name: string;
    id: string;
    imageUrl: string;
    prompt: string;
    isActive: boolean;
    state: AiInfuState;
}

export type GetAiInfusResponse = AiInfu[];

export type GetAllAiInfusResponse = AiInfuBlueprint[];

export type GetAiInfuImagePathResponse = {
    path: string;
}

export type UpdateAiInfuImageResponse = {
    isSuccess: boolean;
}

export type UpdateAiInfuPromptResponse = {
    isSuccess: boolean;
}

export type FinishAiInfuResponse = {
    isSuccess: boolean;
}

export type ValidateBrandResponse = {
    isValid: boolean;
}

export type PostAiInfuResponse = {
    infuId: string;
}

export type GetBrandAiInfusResponse = AiInfu[];

export type GetBrandAiInfuBlueprintsResponse = AiInfuBlueprint[];

export type GetProductImagePathResponse = {
    path: string;
}

export type PostPostImagesResponse = {
    urls: string[];
}

export type PostPostResponse = {
    isSuccess: boolean;
}

export type PostBrandResponse = {
    isSuccess: boolean;
    brandId: string;
}

export type Post = {
    id: string;
    brandId: string;
    brandName: string;
    aiInfuId: string;
    aiInfuName: string;
    aiInfuImageUrl: string;
    postImageUrl: string;
    productImageUrl: string;
    createdAt: string;
}

export type GetMarketplacePostsResponse = Post[];

export type GetBrandPostsResponse = Post[];

export type GetBrandNameResponse = {
    name: string;
};

