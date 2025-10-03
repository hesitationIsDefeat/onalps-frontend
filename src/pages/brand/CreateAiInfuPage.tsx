import React, { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useBrandApiCalls from "../../hooks/api/useBrandApiCalls";
import type { AiInfuBlueprint } from "../../types/ResponseTypes";

const CreateAiInfuPage: React.FC = () => {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [oldPrompt, setOldPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [searchParams] = useSearchParams();
  const aiInfuId = searchParams.get("aiInfuId");

  const {marketplaceId, brandId} = useParams<{marketplaceId: string; brandId: string}>();

  const { fetchValidateBrand, fetchPostAiInfu, fetchUpdateAiInfuPrompt} = useBrandApiCalls();

  async function handleSend () {
    if (!marketplaceId || !brandId) return;
    if (!name || !prompt) return;
    if (aiInfuId) {
      if (prompt === oldPrompt) return;
      const response = await fetchUpdateAiInfuPrompt(marketplaceId, brandId, {aiInfuId, prompt});
      if (response && response.response) {
        alert(`AI Influencer prompt updated for ID: ${aiInfuId}`);
      }
    } else {
      const response = await fetchPostAiInfu(marketplaceId, brandId, { infuName: name, prompt });
      if (response && response.response) {
        alert(`AI Influencer created with ID: ${response.response.infuId}`);
      }
    }
  };

  const handleConfirm = () => {
    alert("Image confirmed!");
  };

    async function init() {
      if (!marketplaceId || !brandId) return;
      const response = await fetchValidateBrand(marketplaceId, brandId);
      if (!response ||!response.response || !response.response.isValid) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
      if (aiInfuId) {
        const storedAiInfu = localStorage.getItem(`selectedAiInfu${aiInfuId}`);
        if (storedAiInfu) {
          const aiInfu: AiInfuBlueprint = JSON.parse(storedAiInfu);
          setName(aiInfu.name);
          setPrompt(aiInfu.prompt);
          setOldPrompt(aiInfu.prompt);
          setImage(aiInfu.imageUrl);
        }
      }
    }

    function handleAiInfuNameChange(e: ChangeEvent<HTMLInputElement>) {
      if (aiInfuId) return;
      setName(e.target.value);
    }

    function handleAiInfuPromptChange(e: ChangeEvent<HTMLTextAreaElement>) {
      setPrompt(e.target.value);
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
    {/* Main container now row-based */}
    <div className="w-[60rem] flex flex-row gap-16">
      
      {/* Upper Part (on the left) */}
      <div className="flex flex-col gap-4 w-[30rem]">
        {/* Name input */}
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          disabled={!!aiInfuId}
          onChange={handleAiInfuNameChange}
          className="border border-black p-2 rounded w-full h-[2.5rem]"
        />

        {/* Larger Prompt textarea */}
        <textarea
          placeholder="Enter prompt"
          value={prompt}
          onChange={handleAiInfuPromptChange}
          className="border border-black p-2 rounded w-full h-[15rem] resize-none text-base"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={prompt === oldPrompt}
           className="w-[8rem] h-[3rem] 
             bg-blue-600 text-white rounded-lg shadow 
             hover:bg-blue-700 
             disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed 
             self-start"
        >
          Send
        </button>
      </div>

      {/* Lower Part (on the right) */}
      <div className="flex flex-col gap-4 items-center">
        {/* Image Box */}
        <div className="w-[18rem] h-[32rem] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50">
          {image ? (
            <img
              src={image}
              alt="Generated"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <span className="text-gray-500">Created image will be here</span>
          )}
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          className="w-[8rem] h-[3rem] bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

};

export default CreateAiInfuPage;
