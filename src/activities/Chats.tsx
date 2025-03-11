import {useActivityPreloadRef} from "@stackflow/plugin-preload";
import {ActivityComponentType} from "@stackflow/react";
import React from "react";

import FeedCard from "../components/FeedCard";
import {readPageProps} from "../lib/readPageProps";
import {MainPageProps} from "../pages";
import AppLayout from "./AppLayout";

const Chats: ActivityComponentType = () => {
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

export default Chats;
