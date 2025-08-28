import React, { useState, type ChangeEvent } from "react";

const AdminPage: React.FC = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSend = () => {
    alert("Send clicked! You can now integrate API logic here.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Add Ai Infu Image</h1>

        {/* Dropdowns Row */}
        <div className="flex gap-4 mb-6">
          {/* First Dropdown */}
          <select
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="p-2 border rounded w-40"
          >
            <option value="">Marketplace</option>
            <option value="A">Trendyol</option>
            <option value="B">N11</option>
          </select>

          {/* Second Dropdown */}
          {first && (
            <select
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="p-2 border rounded w-40"
            >
              <option value="">Brand</option>
              <option value="X">Mavi</option>
              <option value="Y">Kırmızı</option>
            </select>
          )}

          {/* Third Dropdown */}
          {second && (
            <select
              value={third}
              onChange={(e) => setThird(e.target.value)}
              className="p-2 border rounded w-40"
            >
              <option value="">Ai Infu</option>
              <option value="1">Haltercan Omzugeniş</option>
              <option value="2">Roket Atar</option>
            </select>
          )}
        </div>

        {third && (
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="imageUpload"
              className="w-48 h-48 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer bg-white"
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
            />

            {image && (
              <button
                onClick={handleSend}
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
