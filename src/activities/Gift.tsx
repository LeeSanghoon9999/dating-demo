import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useActivityPreloadRef } from "@stackflow/plugin-preload";
import { ActivityComponentType } from "@stackflow/react";
import React from "react";

import IconBell from "../assets/IconBell";
import IconExpandMore from "../assets/IconExpandMore";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import BottomTab from "../components/BottomTab";
import FeedCard from "../components/FeedCard";
import { readPageProps } from "../lib/readPageProps";
import { MainPageProps } from "../pages";
import * as css from "./Gift.css";

const Gift: ActivityComponentType = () => {
    // ✅ Next.js 방식에서는 preloadRef로부터 props를 가져올 때 readPageProps 활용
    const preloadRef = useActivityPreloadRef<{ key: string }>();
    const pageProps = readPageProps<MainPageProps>(preloadRef);


    // 앱 바 왼쪽 요소
    const appBarLeft = () => (
        <div className={css.appBarLeft}>
            Gift
            <div className={css.appBarLeftIcon}>
                <IconExpandMore />
            </div>
        </div>
    );

    // 앱 바 오른쪽 요소
    const appBarRight = () => (
        <div className={css.appBarRight}>
            <IconSearch />
            <IconSettings />
            <IconBell />
        </div>
    );

    return (
        <AppScreen
            appBar={{
                appendLeft: appBarLeft,
                appendRight: appBarRight,
            }}
        >
            <div className={css.wrapper}>
                <div className={css.scrollable}>
                    {pageProps?.articles?.length ? (
                        pageProps.articles.map((article) => (
                            <FeedCard
                                key={article.articleId}
                                articleId={article.articleId}
                                daysAgo={article.daysAgo}
                                price={article.price}
                                region={article.region}
                                title={article.title}
                            />
                        ))
                    ) : (
                        <p>No Gift found</p>
                    )}
                </div>
                <div className={css.bottom}>
                    <BottomTab />
                </div>
            </div>
        </AppScreen>
    );
};

export default Gift;
