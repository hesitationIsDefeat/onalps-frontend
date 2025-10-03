import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBrandApiCalls from "../../hooks/api/useBrandApiCalls";

const ChoosePage: React.FC = () => {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  const {marketplaceId, brandId} = useParams<{marketplaceId: string; brandId: string}>();

  const {fetchValidateBrand} = useBrandApiCalls();

  const cards = [
    {
      id: 1,
      image: "/assets/onalps_ai_infu_normal.jpeg", 
      text: "Create Ai Influencer",
      link: `/brand/create/ai/marketplace/${marketplaceId}/brand/${brandId}`,
    },
    {
      id: 2,
      image: "/assets/onalps_ai_infu_product.jpeg", 
      text: "Create Post",
      link: `/brand/create/post/marketplace/${marketplaceId}/brand/${brandId}`,
    },
  ];

  async function init() {
    if (!marketplaceId || !brandId) return;
    const response = await fetchValidateBrand(marketplaceId, brandId );
    if (!response ||!response.response || !response.response.isValid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    console.log(response.response);
  }

  useEffect(() => {
    init();
  }, []);

  if (!marketplaceId || !brandId) {
    return <div>Invalid parameters</div>;
  }

  if (!isValid) {
    return <div>Invalid brand</div>;
  }

  if (isValid == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => (window.location.href = card.link)}
            className="w-[18rem] h-[32rem] bg-white rounded-xl shadow-md flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-400"
          >
          <img  
            src={card.image}
            alt={card.text}
            className="w-full h-[80%] flex-1 object-cover rounded-t-xl"
          />

          <div className="flex items-end justify-center p-2">
            <p className="text-center font-medium line-clamp-3">{card.text}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoosePage;
