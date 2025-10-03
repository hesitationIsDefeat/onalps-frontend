import React, { useEffect, useState } from "react";
import type { Brand } from "../../types/ResponseTypes";
import useMarketplaceApiCalls from "../../hooks/api/useMarketplaceApiCalls";
import { useParams } from "react-router-dom";

const CreateBrandPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const { fetchGetBrands, fetchPostBrand } = useMarketplaceApiCalls();

  const { marketplaceId } = useParams<{ marketplaceId: string }>();

  async function getBrands() {
    if (!marketplaceId) return;
    const response = await fetchGetBrands({ marketplaceId });
    if (!response.response) return;
    setBrands(response.response);
  }

    async function handleCreateBrand() {
    if (!marketplaceId || !input) return;
    const response = await fetchPostBrand({ marketplaceId, brandName: input });
    if (!response.response || response.response.isSuccess === false) return;
    setInput("");
    getBrands();
    }

    function init() {
        getBrands();
    }

    useEffect(() => {
        init();
    }, []);

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    {/* Container */}
    <div className="w-[40rem] h-[30rem]  rounded-2xl p-4 flex flex-col items-center">
      
      {/* Input Section (with its own background + border) */}
      <div className="flex gap-2 p-3 shadow-lg bg-white border border-gray-300 rounded-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-[25rem] h-[3rem] border rounded-xl px-3 text-base"
          placeholder="Enter brand name"
        />
        <button
          onClick={handleCreateBrand}
          className="w-[8rem] h-[3rem] bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {/* List Section */}
      <div className="flex flex-col gap-3 overflow-y-auto mt-4">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="w-[30rem] p-3 bg-gray-200 border border-gray-400 rounded-lg text-base"
          >
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default CreateBrandPage;
