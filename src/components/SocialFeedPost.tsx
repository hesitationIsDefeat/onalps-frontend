import { useState } from "react";
import type { Post } from "../types/ResponseTypes";
import { CircleIndicator } from "./CircleIndicator";

interface SocialFeedPostProps {
  post: Post;
  marketplaceId?: string;
}

export const SocialFeedPost: React.FC<SocialFeedPostProps> = ({ post, marketplaceId }) => {
  const [hovered, setHovered] = useState(false); // desktop hover
  const [swiped, setSwiped] = useState(false);   // mobile swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  // handle finger down
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // handle finger release
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // swipe left → show product image
      setImageIndex(1);
      setSwiped(true);
    } else if (diff < -50) {
      // swipe right → show original image
      setImageIndex(0);
      setSwiped(false);
    }
    setTouchStartX(null);
  };

  function handleHoverEnter() {
    setImageIndex(1);
    setHovered(true);
  }

  function handleHoverLeave() {
    setImageIndex(0);
    setHovered(false);
  }

  return (
    <div
      key={post.id}
      className="bg-white border border-gray-300 shadow-lg rounded-none sm:rounded-2xl flex flex-col justify-between snap-center 
                 w-full sm:max-w-[22.5rem] sm:mx-auto my-6"
    >
      {/* Top: Name + Text */}
      <div className="p-4 flex justify-start">
        <span className="font-semibold text-lg text-gray-800">
          <a
            href={`/user/brand_page/marketplace/${marketplaceId}/brand/${post.brandId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.brandName}
          </a>
        </span>
      </div>

      {/* Middle: Image with hover + swipe */}
      <div
        className="relative w-full aspect-[9/16] max-h-[85vh] overflow-hidden"
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
    className={`flex w-[200%] h-full transition-transform duration-700 ${
      hovered || swiped ? "-translate-x-1/2" : "translate-x-0"
    }`}
  >
    <img
      src={post.postImageUrl}
      className="w-1/2 h-full object-cover"
    />
    <img
      src={post.productImageUrl}
      className="w-1/2 h-full object-contain bg-white"
    />
    
  </div>
  <CircleIndicator activeIndex={imageIndex} totalImages={2} />
      </div>

      {/* Bottom: Button */}
      <div className="flex justify-end p-4">
        <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow">
          Buy
        </button>
      </div>
    </div>
  );
};

