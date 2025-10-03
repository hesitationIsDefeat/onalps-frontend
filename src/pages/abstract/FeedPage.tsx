import { useEffect, useRef, useState } from "react";
import type { Post } from "../../types/ResponseTypes";
import { SocialFeedPost } from "../../components/SocialFeedPost";

interface FeedPageProps {
    posts: Post[];
    marketplaceId: string;
    postIndex?: number;
}

const FeedPage: React.FC<FeedPageProps> = ({ posts, marketplaceId, postIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(postIndex || 0);

    const containerRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (postRefs.current[currentIndex]) {
      postRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth", // use "auto" if you want instant snap instead
        block: "start",
      });
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-gray-100"
    >
      {posts.map((post, idx) => (
        <div
          key={idx}
          ref={(el) => { postRefs.current[idx] = el }}
        >
          <SocialFeedPost post={post} marketplaceId={marketplaceId} />
        </div>
      ))}
    </div>
  );
}

export default FeedPage;