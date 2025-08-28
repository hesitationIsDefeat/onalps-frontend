import React, { useState, type ChangeEvent } from "react";

const CreateAiInfuPage: React.FC = () => {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleSend = () => {
    // Here you would call your API to create an image
    // For demo purposes, we just show a placeholder
    setImage("/assets/onalps_ai_infu_normal.jpeg");
  };

  const handleConfirm = () => {
    alert("Image confirmed!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Main container (no border/background now) */}
      <div className="w-[40rem] flex flex-col gap-8">
        {/* Upper Part */}
        <div className="flex justify-between gap-6">
          {/* Inputs on left */}
          <div className="flex flex-col gap-4 w-[25rem]">
            {/* Name input */}
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="border border-black p-2 rounded w-full h-[2.5rem]"
            />

            {/* Prompt textarea */}
            <textarea
              placeholder="Enter prompt"
              value={prompt}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setPrompt(e.target.value)
              }
              className="border border-black p-2 rounded w-full h-[8rem] resize-none"
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            className="w-[8rem] h-[3rem] bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 self-start"
          >
            Send
          </button>
        </div>

        {/* Lower Part */}
        <div className="flex justify-between items-center gap-6 flex-1">
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
