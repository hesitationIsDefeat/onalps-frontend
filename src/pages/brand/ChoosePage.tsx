import React from "react";

const ChoosePage: React.FC = () => {
  const cards = [
    {
      id: 1,
      image: "/assets/onalps_ai_infu_normal.jpeg", // replace with your image URL
      text: "Create Ai Influencer",
      link: "/brand/create/ai",
    },
    {
      id: 2,
      image: "/assets/onalps_ai_infu_normal.jpeg", // replace with your image URL
      text: "Create Post",
      link: "/brand/create/post",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => (window.location.href = card.link)}
            className="w-48 h-64 bg-white rounded-xl shadow-md flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-400"
          >
            {/* Image on top */}
            <img
              src={card.image}
              alt={card.text}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            {/* Text on bottom */}
            <div className="flex-1 flex items-center justify-center p-2">
              <p className="text-center font-medium">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoosePage;
