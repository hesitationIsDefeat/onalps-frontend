import { useEffect, useState } from "react";
import type { Post } from "../../types/ResponseTypes";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import useUserApiCalls from "../../hooks/api/useUserPageApiCalls";
import { useParams } from "react-router-dom";
import FeedPage from "../abstract/FeedPage";

const BrandFeed: React.FC = () => {
    const [isInit, setIsInit] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);

    const { fetchGetBrandPosts } = useUserApiCalls();

    const {marketplaceId, brandId, index} =  useParams<{marketplaceId: string, brandId: string, index: string}>();
    const [postIndex, setPostIndex] = useState<number>(index ? parseInt(index, 10) : 0);

    async function init() {
        if (!marketplaceId || !brandId) return;
        const response = await fetchGetBrandPosts({marketplaceId, brandId});
        if (!response.response) return;
        setPosts(response.response);
        setIsInit(true);
    }

    useEffect(() => {
        init();
    }, []);

    if (!isInit || !marketplaceId) {
        return <LoadingIndicator />;
    }

  return (
    <FeedPage posts={posts} marketplaceId={marketplaceId} postIndex={postIndex} />
  );
}

export default BrandFeed;