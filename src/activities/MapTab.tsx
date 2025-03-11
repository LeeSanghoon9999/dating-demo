import { useActivityPreloadRef } from "@stackflow/plugin-preload";
import { ActivityComponentType, useActivityParams } from "@stackflow/react";
import React, { useEffect,useState } from "react";

import FeedCard from "../components/FeedCard";
import MapLoading from "../components/MapLoading";
import { readPageProps } from "../lib/readPageProps";
import { MainPageProps } from "../pages";
import AppLayout from "./AppLayout";
import * as css from "./MapTab.css";

// 기본 서울 좌표
const defaultCenter = {
    lat: 37.5665,
    lng: 126.9780,
};

const MapTab: ActivityComponentType = () => {
    // Main에서 준비한 페이지 프롭스를 재사용 (공통 키 "Main" 사용)
    const preloadRef = useActivityPreloadRef<{ key: string }>();
    const pageProps = readPageProps<MainPageProps>(preloadRef);

    // URL 파라미터로 전달된 lat, lng는 문자열이므로 숫자로 파싱
    const { lat, lng } = useActivityParams<{ lat?: string; lng?: string }>();

    // 초기 위치: sessionStorage에서 읽어오거나, URL 파라미터가 있으면 사용
    const getInitialLocation = (): { lat: number; lng: number } | null => {
        if (typeof window !== "undefined") {
            const stored = sessionStorage.getItem("userLocation");
            if (stored) {
                return JSON.parse(stored);
            }
        }
        if (lat !== undefined && lng !== undefined) {
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
        }
        return null;
    };

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(
        getInitialLocation()
    );

    // 만약 컴포넌트 마운트 후에 sessionStorage가 변경되었을 경우 업데이트
    useEffect(() => {
        const stored = sessionStorage.getItem("userLocation");
        if (stored) {
            setUserLocation(JSON.parse(stored));
        }
    }, []);

    const handleFindMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(loc);
                    sessionStorage.setItem("userLocation", JSON.stringify(loc));
                },
                (error) => {
                    console.error("현재 위치를 가져오는데 실패했습니다.", error);
                }
            );
        } else {
            console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
    };

    const mapCenterValue = userLocation || defaultCenter;

    return (
        <AppLayout>
            {/* 전역 Provider로 로드된 Google Maps 활용 */}
            <MapLoading center={mapCenterValue} userLocation={userLocation} />

            <button
                type="button"
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

export default MapTab;
