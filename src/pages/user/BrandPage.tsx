import type { Post } from "../../types/ResponseTypes";
import { BrandPagePost } from "../../components/BrandPagePost";
import { useEffect, useState } from "react";
import useUserApiCalls from "../../hooks/api/useUserPageApiCalls";
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../../components/LoadingIndicator";

export const BrandPage: React.FC = () => {
    const [isInit, setIsInit] = useState<boolean>(false);
    const [brandName, setBrandName] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>([]);

    const { fetchGetBrandName, fetchGetBrandPosts } = useUserApiCalls();

    const {marketplaceId, brandId} = useParams<{marketplaceId: string, brandId: string}>();

    async function init() {
        if (!marketplaceId || !brandId) return;
        const brandNameResponse = await fetchGetBrandName({marketplaceId, brandId});
        if (!brandNameResponse.response) return;
        setBrandName(brandNameResponse.response.name);
        const response = await fetchGetBrandPosts({marketplaceId, brandId});
        if (!response.response) return;
        setPosts(response.response);
        setIsInit(true);
    }

    function handlePostClick(postIndex: number) {
        const url = `/user/brand_feed/marketplace/${marketplaceId}/brand/${brandId}/index/${postIndex}`;
        window.open(url, "_blank");
    }

    useEffect(() => {
        init();
    }, []);

    if (!isInit) {
        return <LoadingIndicator />;
    }

  return (
    <div className="flex flex-col items-center w-full min-h-screen relative">
  {/* Brand Name */}
  <div className="flex items-center justify-start my-[3rem] border border-solid border-gray-400 rounded-full px-4 py-2 w-fit">
  {/* Circular Image */}
  <img
    src={"/assets/shop_icon.png"} // replace with your brand image
    alt={brandName}
    className="w-[5rem] h-[5rem] rounded-full object-cover"
  />

  {/* Brand Name */}
  <h1 className="text-2xl font-bold ml-4">{brandName}</h1>
</div>
  {/* Grid Container */}
  <div className="w-full max-w-[54rem] border border-gray-400 rounded-none sm:rounded-t-2xl overflow-hidden">
    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 cursor-pointer">
      {posts.map((post, idx) => (
        <BrandPagePost key={idx} post={post} onClick={() => handlePostClick(idx)} />
      ))}
    </div>
  </div>
</div>
  );
};
