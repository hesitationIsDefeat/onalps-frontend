export type GetBrandsRequest = {
    marketplaceId: string;
}

export type GetAiInfusRequest = {
    marketplaceId: string;
    brandId: string;
}

export type GetAiInfuImagePathRequest = {
    marketplaceId: string;
    brandId: string;
    aiInfuId: string;
    imageExt: string;
}



export type UpdateAiInfuImageRequest = {
    marketplaceId: string;
    brandId: string;
    aiInfuId: string;
    imageUrl: string;
}

export type UpdateAiInfuPromptRequest = {
    aiInfuId: string;
    prompt: string;
}

export type FinishAiInfuRequest = {
    aiInfuId: string;
}

export type ValidateBrandRequest = {
    marketplaceId: string;
    brandId: string;
}

export type PostAiInfuRequest = {
    infuName: string;
    prompt: string;
}

export type GetProductImagePathRequest = {
    imageExt: string;
}

export type PostPostImagesRequest = {
    aiInfuId: string;
    productImageUrl: string;
    prompt: string;
}

export type PostPostRequest = {
    aiInfuId: string;
    postImageUrl: string;
    productImageUrl: string;
    prompt: string;
}

export type PostBrandRequest = {
    marketplaceId: string;
    brandName: string;
}

export type GetMarketplacePostsRequest = {
    marketplaceId: string;
}

export type GetBrandPostsRequest = {
    marketplaceId: string;
    brandId: string;
}

export type GetBrandNameRequest = {
    marketplaceId: string;
    brandId: string;
}
