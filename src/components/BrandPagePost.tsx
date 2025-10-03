import { useState } from "react";
import type { Post } from "../types/ResponseTypes";

interface BrandPagePostProps {
  post: Post;
  onClick: () => void;
}

export const BrandPagePost: React.FC<BrandPagePostProps> = ({ post, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[9/16] overflow-hidden border border-solid border-gray-300 box-border 
             sm:border-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Original Image */}
      <img
        src={post.postImageUrl}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ${
          hovered ? "-translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Product Image */}
      <img
        src={post.productImageUrl}
        className={`absolute top-0 left-full w-full h-full object-cover transition-transform duration-700 ${
          hovered ? "-translate-x-full" : "translate-x-0"
        }`}
      />
    </div>
  );
};
