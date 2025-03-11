import { useActivityPreloadRef } from "@stackflow/plugin-preload";
import { ActivityComponentType } from "@stackflow/react";
import React from "react";

import AppBarLeft from "../components/AppBarLeft";
import AppBarRight from "../components/AppBarRight";
import FeedCard from "../components/FeedCard";
import { readPageProps } from "../lib/readPageProps";
import { MainPageProps } from "../pages";
import AppLayout from "./AppLayout";

const Gift: ActivityComponentType = () => {
    // ✅ Next.js 방식에서는 preloadRef로부터 props를 가져올 때 readPageProps 활용
    const preloadRef = useActivityPreloadRef<{ key: string }>();
    const pageProps = readPageProps<MainPageProps>(preloadRef);


    return (
        <AppLayout>
            {pageProps?.articles?.map((article) => (
                <FeedCard
                    key={article.articleId}
                    articleId={article.articleId}
                    daysAgo={article.daysAgo}
                    price={article.price}
                    region={article.region}
                    title={article.title}
                />
            )) || <div>Loading...</div>}
        </AppLayout>
    );

};

export default Gift;
