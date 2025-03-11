import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

type Location = { lat: number; lng: number };

interface MapLoadingProps {
    center: Location;
    userLocation?: Location | null;
}

function MapLoading({ center, userLocation }: MapLoadingProps) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    if (!isLoaded) {
        return <div>지도 로딩 중...</div>;
    }

    // 위도 1도는 대략 111km
    const latDelta = 3 / 111; // 약 0.027도
    // 경도 델타는 위도에 따라 달라짐 (cos 함수를 사용)
    const lngDelta = 3 / (111 * Math.cos(center.lat * (Math.PI / 180)));

    const bounds = {
        north: center.lat + latDelta,
        south: center.lat - latDelta,
        east: center.lng + lngDelta,
        west: center.lng - lngDelta,
    };

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={center}
            zoom={14} // 대략 3km 반경에 맞는 줌 레벨
            options={{
                restriction: {
                    latLngBounds: bounds,
                    strictBounds: false,
                },
            }}
        >
            {/* 중심 마커 */}
            <Marker position={center} />
            {/* 사용자가 찾은 위치가 있다면 추가 마커 */}
            {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
    );
}

export default MapLoading;
