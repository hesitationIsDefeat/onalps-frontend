import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { AiInfu, AiInfuBlueprint, AiInfuDetailed, GetAiInfusResponse, GetAllAiInfusResponse, GetBrandsResponse, GetMarketplacesResponse } from "../types/ResponseTypes";
import useAdminPageApiCalls from "../hooks/api/useAdminPageApiCalls";
import { LoadingIndicator } from "../components/LoadingIndicator";
import useFirebase from "../hooks/useFirebase";
import { AiInfuState } from "../enums/AiInfuState";

const AdminPage: React.FC = () => {
  const [marketplaceId, setMarketplaceId] = useState<string>("");
  const [brandId, setBrandId] = useState<string>("");
  const [aiInfuId, setAiInfuId] = useState<string>("");
  const [aiInfu, setAiInfu] = useState<AiInfuBlueprint | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [marketplaces, setMarketplaces] = useState<GetMarketplacesResponse | null>(null);
  const [brands, setBrands] = useState<GetBrandsResponse | null>(null);
  const [aiInfus, setAiInfus] = useState<GetAllAiInfusResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { fetchGetMarketplaces, fetchGetBrands, fetchGetAiInfus, fetchGetAiInfuImagePath, fetchUpdateAiInfuImage } = useAdminPageApiCalls()
  const { handleContentUpload } = useFirebase()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  async function init() {
    const response = await fetchGetMarketplaces();
    if (response.response) {
      setMarketplaces(response.response);
    }
  }

  async function getBrands(marketplaceId: string) {
    if (marketplaceId) {
      const response = await fetchGetBrands({ marketplaceId });
      if (response.response) {
        setBrands(response.response);
      }
    }
  }

  async function getAiInfus(marketplaceId: string, brandId: string) {
    if (marketplaceId && brandId) {
      const response = await fetchGetAiInfus({ marketplaceId, brandId });
      if (response.response) {
        setAiInfus(response.response);
      }
    }
  }

  function handleMarketplaceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setMarketplaceId(e.target.value);
    setBrandId("");
    setAiInfuId("");
    setBrands(null);
    setAiInfus(null);
    getBrands(e.target.value);
  }

  function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!marketplaceId) return;
    setBrandId(e.target.value);
    setAiInfuId("");
    setAiInfus(null);
    getAiInfus(marketplaceId, e.target.value);
  }

  function handleAiInfuChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!marketplaceId || !brandId || !aiInfus) return;
    setAiInfuId(e.target.value);
    const selectedAiInfu = aiInfus.find(aiInfu => aiInfu.id === e.target.value);
    setAiInfu(selectedAiInfu || null);
    if (selectedAiInfu) {
      if (selectedAiInfu.imageUrl != "") {
        setImage(selectedAiInfu.imageUrl);
      } else {
        setImage(null);
      }
    }
  }

  async function handleAiInfuImageUpload() {
    if (!marketplaceId || !brandId || !aiInfuId || !aiInfu) return;
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const imageExt = file.type.split("/").pop();
    if (!imageExt) return;
    const pathResponse = await fetchGetAiInfuImagePath({ marketplaceId, brandId, aiInfuId, imageExt });
    if (!pathResponse.response) return;
    const firebasePath = await handleContentUpload(file, pathResponse.response.path);
    if (!firebasePath) return;
    const updateImageResponse = await fetchUpdateAiInfuImage({ marketplaceId, brandId, aiInfuId, imageUrl: firebasePath });
    if (updateImageResponse.response && updateImageResponse.response.isSuccess) {
      alert("Image uploaded successfully!");
    }
  }

  const renderState = (state: AiInfuState) => {
    console.log("Rendering state:", state);
    if (state === AiInfuState.PENDING) {
      return (
        <div className="px-3 py-1 border border-solid border-black text-black rounded-full text-sm font-medium">
          Pending
        </div>
      );
    }
    if (state === AiInfuState.UPDATED) {
      return (
        <div className="px-3 py-1 border border-solid border-purple-500 text-purple-500 rounded-full text-sm font-medium">
          Updated
        </div>
      );
    }
    return (
      <div className="px-3 py-1 border border-solid border-green-500 text-green-500 rounded-full text-sm font-medium">
        Finished
      </div>
    );
  };

  useEffect(() => {
    init();
  }, []);

  if (marketplaces == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Add Ai Infu Image</h1>

        {/* Dropdowns Row */}
        <div className="flex gap-4 mb-6">
          {/* First Dropdown */}
          <select
            value={marketplaceId}
            onChange={handleMarketplaceChange}
            className="p-2 border rounded w-40"
          >
            <option value="">Marketplace</option>
            {marketplaces.map(marketplace => (
              <option key={marketplace.id} value={marketplace.id}>
                {marketplace.name}
              </option>
            ))}
          </select>

          {/* Second Dropdown */}
          {marketplaceId && (brands == null ? <LoadingIndicator /> : (
            <select
              value={brandId}
              onChange={handleBrandChange}
              className="p-2 border rounded w-40"
            >
              <option value="">Brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}

            </select>
          ))}

          {/* Third Dropdown */}
          {marketplaceId && brandId && (brands == null || aiInfus == null ? <LoadingIndicator /> : (
            <select
              value={aiInfuId}
              onChange={handleAiInfuChange}
              className="p-2 border rounded w-40"
            >
              <option value="">Ai Infu</option>
              {aiInfus.map(aiInfu => (
                <option key={aiInfu.id} value={aiInfu.id}>
                  {aiInfu.name}
                </option>
              ))}
            </select>
          ))}
        </div>

        {aiInfuId && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              {aiInfu &&
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-[20rem] h-[15rem] flex items-center justify-center border border-gray-400 rounded-md bg-white">
                  <span className="text-gray-700 font-medium">{aiInfu.prompt}</span>
                </div>
                {renderState(aiInfu.state)}
              </div>
                
              }
              {/* Upload container */}
              <div>
                <label
                  htmlFor="imageUpload"
                  className="w-[18rem] h-[32rem] border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer bg-white"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">Upload Image</span>
                  )}
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </div>
            </div>


            {image && (
              <button
                onClick={handleAiInfuImageUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Change Image
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
