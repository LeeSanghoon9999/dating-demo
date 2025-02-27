import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useActivityPreloadRef } from "@stackflow/plugin-preload";
import { ActivityComponentType } from "@stackflow/react";
import React, { useState } from "react";

import IconBell from "../assets/IconBell";
import IconExpandMore from "../assets/IconExpandMore";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import BottomTab from "../components/BottomTab";
import MapCard from "../components/FeedCard";
// ✅ Next.js에서 프리로드된 PageProps를 읽어오는 함수
import { readPageProps } from "../lib/readPageProps";
// CSS 모듈
import * as css from "./MapTab.css";

// 기본 서울 중심 좌표
const defaultCenter = {
    lat: 37.5665,
    lng: 126.9780,
};

// ✅ Gatsby에서의 GraphQL 결과를 대체할 수 있는 PageProps 타입 예시
type MarkdownNode = {
    frontmatter?: {
        id?: string;
        daysAgo?: number;
        price?: number;
        regionName?: string;
        title?: string;
    };
};

export type MapTabPageProps = {
    allMarkdownRemark?: {
        nodes?: MarkdownNode[];
    };
};

const MapTab: ActivityComponentType = () => {
    // Next.js 스타일로 프리로드된 props를 가져옴
    const preloadRef = useActivityPreloadRef<{ key: string }>();
    // Gatsby의 readPreloadData 대신 Next.js의 readPageProps 사용
    const pageProps = readPageProps<MapTabPageProps>(preloadRef);

    // 사용자의 현재 위치 상태 (없으면 null)
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    // GPS를 통해 현재 위치를 찾는 함수
    const handleFindMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("현재 위치를 가져오는데 실패했습니다.", error);
                    // 필요하면 사용자에게 알림 처리 가능
                }
            );
        } else {
            console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
    };

    // 지도 중심은 userLocation이 있으면 해당 값, 없으면 기본 center 사용
    const mapCenter = userLocation || defaultCenter;

    const appBarLeft = () => (
        <div className={css.appBarLeft}>
            Map
            <div className={css.appBarLeftIcon}>
                <IconExpandMore />
            </div>
        </div>
    );

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
                {/* 구글맵 영역 */}
                <LoadScript googleMapsApiKey="AIzaSyD5m_Luc1EQB604BRDoNwTosiu6HTTePgE">
                    <GoogleMap
                        mapContainerClassName={css.mapContainer}
                        center={mapCenter}
                        zoom={12}
                    >
                        {/* 기본 마커 (서울)와 userLocation이 있으면 추가 마커 표시 */}
                        <Marker position={defaultCenter} />
                        {userLocation && <Marker position={userLocation} />}
                    </GoogleMap>
                </LoadScript>

                {/* 내 위치 찾기 버튼 */}
                {/* eslint-disable-next-line react/button-has-type */}
                <button
                    onClick={handleFindMyLocation}
                    style={{
                        margin: "1rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    내 위치 찾기
                </button>

                {/* 스크롤 가능한 피드 목록 영역 */}
                <div className={css.scrollable}>
                    {pageProps.allMarkdownRemark?.nodes?.length ? (
                        pageProps.allMarkdownRemark.nodes.map((node) => (
                            <MapCard
                                key={String(node.frontmatter?.id ?? "default-id")}
                                articleId={String(node.frontmatter?.id ?? "default-id")}
                                daysAgo={node.frontmatter?.daysAgo ?? 0}
                                price={node.frontmatter?.price ?? 0}
                                region={node.frontmatter?.regionName ?? "Unknown"}
                                title={node.frontmatter?.title ?? "No Title"}
                            />
                        ))
                    ) : (
                        <p>No Map available</p>
                    )}
                </div>

                {/* 하단 탭 네비게이션 */}
                <div className={css.bottom}>
                    <BottomTab />
                </div>
            </div>
        </AppScreen>
    );
};

export default MapTab;
