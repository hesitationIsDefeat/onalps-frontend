import { useEffect, useState } from "react";
import type { AiInfuBlueprint } from "../../types/ResponseTypes";
import { AiInfuState } from "../../enums/AiInfuState";
import { useParams } from "react-router-dom";
import useBrandApiCalls from "../../hooks/api/useBrandApiCalls";

const AiInfuBlueprintList: React.FC = () => {
  const { marketplaceId, brandId } = useParams<{ marketplaceId: string; brandId: string }>();
  const [aiInfuBlueprints, setAiInfuBlueprints] = useState<AiInfuBlueprint[]>([]);

  const { fetchGetBrandAiInfuBlueprints } = useBrandApiCalls();

  function init() {
    if (!marketplaceId || !brandId) return;
    fetchGetBrandAiInfuBlueprints(marketplaceId, brandId)
      .then((response) => {
        if (response && response.response) {
          setAiInfuBlueprints(response.response);
        }
      });
  }

  function handleAiInfuClick(aiInfu: AiInfuBlueprint) {
    localStorage.setItem(`selectedAiInfu${aiInfu.id}`, JSON.stringify(aiInfu));
    const url = `/brand/create/ai/marketplace/${marketplaceId}/brand/${brandId}?aiInfuId=${aiInfu.id}`;
    window.open(url, "_blank");
  }

  const renderState = (state: AiInfuState) => {
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">AI Influencers</h1>

      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {aiInfuBlueprints.map((bp) => (
          <div
            key={bp.id}
            onClick={() => handleAiInfuClick(bp)}
            className="flex items-center gap-4 border border-gray-300 rounded-full p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Image Box */}
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border border-gray-300">
              <img
                src={bp.imageUrl == "" ? "/assets/user.png" : bp.imageUrl}
                alt={bp.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name Box */}
            <div className="flex-1 text-lg font-semibold text-gray-800">
              {bp.name}
            </div>

            {/* State Box */}
            {renderState(bp.state)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiInfuBlueprintList;