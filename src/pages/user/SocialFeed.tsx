import { useEffect, useState } from "react";
import type { Post } from "../../types/ResponseTypes";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import useUserApiCalls from "../../hooks/api/useUserPageApiCalls";
import { useParams } from "react-router-dom";
import FeedPage from "../abstract/FeedPage";

const SocialFeed: React.FC = () => {
    const [isInit, setIsInit] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);

    const { fetchGetMarketplacePosts } = useUserApiCalls();

    const {marketplaceId} = useParams<{marketplaceId: string}>();

    async function init() {
        if (!marketplaceId) return;
        const response = await fetchGetMarketplacePosts({marketplaceId});
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
    <FeedPage posts={posts} marketplaceId={marketplaceId} />
  );
}

export default SocialFeed;
