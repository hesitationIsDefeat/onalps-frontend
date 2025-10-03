import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import useBrandApiCalls from "../../hooks/api/useBrandApiCalls";
import type { AiInfu } from "../../types/ResponseTypes";
import useFirebase from "../../hooks/useFirebase";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { LoadingType } from "../../enums/Loading";

const CreatePostPage: React.FC = () => {
  const [middleImage, setMiddleImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedInfuIndex, setSelectedInfuIndex] = useState<number | null>(null);
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [aiInfus, setAiInfus] = useState<AiInfu[]>([]);
  const [selectedAiInfu, setSelectedAiInfu] = useState<AiInfu | null>(null);
  const [postImages, setPostImages] = useState<string[]>([]);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [selectedPostImage, setSelectedPostImage] = useState<string | null>(null);
  const [selectedPostImageIndex, setSelectedPostImageIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const {marketplaceId, brandId} = useParams<{marketplaceId: string; brandId: string}>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { fetchValidateBrand, fetchGetBrandAiInfus, fetchGetProductImagePath, fetchPostPostImages, fetchPostPost } = useBrandApiCalls();
  const {handleContentUpload} = useFirebase()

  const handleMiddleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[e.target.files.length -1]) {
      const file = e.target.files[e.target.files.length -1];
      setMiddleImage(URL.createObjectURL(file));
      setProductImageUrl(null);
    }
  };

  async function getBrandAiInfus() {
    if (!marketplaceId || !brandId) return;
    const response = await fetchGetBrandAiInfus(marketplaceId, brandId);
    if (response && response.response) {
      setAiInfus(response.response);
    }
  }

  function handleAiInfuSelection(index: number) {
    setSelectedInfuIndex(index);
    setSelectedAiInfu(aiInfus[index]);
  }

  async function handleCreate() {
    setIsCreating(true);
    if (!marketplaceId || !brandId || !selectedAiInfu || !middleImage || !prompt) {
      setIsCreating(false);
      return;
    }
    setSelectedPostImage(null);
    setSelectedPostImageIndex(null);
    // Upload product image if not already uploaded
    var productImage = productImageUrl;
    if (!productImage) {
      const files = fileInputRef.current?.files;
      if (!files || files.length === 0) return;
      const productImageFile = files[files.length -1];
      if (!productImageFile) {
      setIsCreating(false);
      return;
    }
      const imageExt = productImageFile.type.split("/").pop();
      if (!imageExt) {
      setIsCreating(false);
      return;
    }
      const pathResponse = await fetchGetProductImagePath(marketplaceId, brandId, { imageExt });
      if (!pathResponse.response) {
      setIsCreating(false);
      return;
    }
      const firebasePath = await handleContentUpload(productImageFile, pathResponse.response.path);
      if (!firebasePath) {
      setIsCreating(false);
      return;
    }
      productImage = firebasePath;
      setProductImageUrl(firebasePath);
    }
    const postImagesResponse = await fetchPostPostImages(marketplaceId, brandId, { aiInfuId: selectedAiInfu.id, productImageUrl: productImage, prompt });
    if (!postImagesResponse.response) {
      setIsCreating(false);
      return;
    }
    setPostImages(postImagesResponse.response.urls);
    setIsCreating(false);
  }

  function handlePostSelection(index: number) {
    setSelectedPostImageIndex(index);
    setSelectedPostImage(postImages[index]);
  }

  function createNewAiInfuClicked() {
    window.location.href = `/brand/create/ai/marketplace/${marketplaceId}/brand/${brandId}`;
  }

  async function handleSave() {
    if (!marketplaceId || !brandId || !selectedAiInfu || !productImageUrl || !selectedPostImage) return;
    const response = await fetchPostPost(marketplaceId, brandId, { aiInfuId: selectedAiInfu.id, postImageUrl: selectedPostImage, productImageUrl, prompt });
    if (response.response && response.response.isSuccess) {
      alert("Post saved successfully!");
    }
  }

  async function init() {
    if (!marketplaceId || !brandId) return;
    const response = await fetchValidateBrand(marketplaceId, brandId );
    if (!response ||!response.response || !response.response.isValid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    getBrandAiInfus();
  }

  useEffect(() => {
    init();
  }, []);

  if (!marketplaceId || !brandId || isValid === false) {
    return <div>Invalid parameters</div>;
  }

  if (isValid == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-8 w-[70rem]">
        {/* Left Column */}
        <div className="flex flex-col gap-4 flex-1 shadow-md bg-gray-50 p-4 rounded">
          {/* Top Section */}
          <div className="flex items-center gap-8 border p-4 rounded bg-white">
            <div className="flex gap-4">
              {aiInfus.map((aiInfu, index) => (
                <img
                  key={index}
                  src={aiInfu.imageUrl}
                  alt={`AI Infu ${index + 1}`}
                  onClick={() => handleAiInfuSelection(index)}
                  className={`w-[9rem] h-[16rem] object-cover rounded cursor-pointer transition-transform duration-200 ${
                    selectedInfuIndex === index
                      ? "scale-105 border-4 border-blue-600"
                      : "hover:scale-105 border border-transparent"
                  }`}
                />
              ))}
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={createNewAiInfuClicked}
            >
              Create New Ai Infuluencer
            </button>
          </div>

          {/* Middle Section */}
          <div className="flex items-center justify-between border p-4 rounded bg-white">
            {/* Prompt input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter prompt..."
              className="w-[20rem] h-[8rem] border border-black p-2 rounded resize-none"
            />

            {/* Image input */}
            <label
              htmlFor="middleImage"
              className="w-[12rem] h-[12rem] border-2 border-dashed border-gray-400 flex items-center justify-center rounded cursor-pointer"
            >
              {middleImage ? (
                <img
                  src={middleImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-500">Upload</span>
              )}
            </label>
            <input
              id="middleImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleMiddleImageChange}
              ref={fileInputRef}
            />

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-row items-center gap-4 border p-4 rounded">
          {isCreating ? <LoadingIndicator type={LoadingType.DYNAMIC_SPINNER} size={100}/> : <>
          {postImages.map((image, index) => (
            <div className="w-[18rem] h-[32rem] border-2 border-gray-400 flex items-center justify-center rounded transition-transform duration-200 cursor-pointer">
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className={`w-full h-full object-cover rounded ${
                    selectedPostImageIndex === index
                      ? "scale-105 border-4 border-blue-600"
                      : "hover:scale-105 border border-transparent"
                  }`}
              onClick={() => handlePostSelection(index)}
            />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
           </>}
        </div>
       
      </div>
    </div>
  );
};

export default CreatePostPage;
