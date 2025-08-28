import React, { useState, type ChangeEvent } from "react";

const CreatePostPage: React.FC = () => {
  const [middleImage, setMiddleImage] = useState<string | null>(null);
  const [bottomImage, setBottomImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const aiInfus: string[] = [
    "/assets/onalps_ai_infu_normal.jpeg",
    "/assets/onalps_ai_infu_normal.jpeg",
  ];

  const handleMiddleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMiddleImage(URL.createObjectURL(file));
    }
  };

  const handleCreate = () => {
    if (middleImage) {
      setBottomImage("/assets/onalps_ai_infu_normal.jpeg");
    }
  };

  const handleSave = () => {
    alert("Save clicked! Add your save logic here.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-8 w-[70rem]">
        {/* Left Column */}
        <div className="flex flex-col gap-4 flex-1 shadow-md bg-gray-50 p-4 rounded">
          {/* Top Section */}
          <div className="flex items-center justify-between border p-4 rounded bg-white">
            <div className="flex gap-4">
              {aiInfus.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`AI Infu ${index + 1}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-[9rem] h-[16rem] object-cover rounded cursor-pointer transition-transform duration-200 ${
                    selectedIndex === index
                      ? "scale-105 border-4 border-blue-600"
                      : "hover:scale-105 border border-transparent"
                  }`}
                />
              ))}
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => window.location.href = "/brand/create/ai"}
            >
              Create New
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
        <div className="flex flex-col items-center gap-4 border p-4 rounded">
          <div className="w-[18rem] h-[32rem] border-2 border-dashed border-gray-400 flex items-center justify-center rounded">
            {bottomImage ? (
              <img
                src={bottomImage}
                alt="Created"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-500 text-center px-2">
                Created image will be here
              </span>
            )}
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
