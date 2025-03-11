
import { useJsApiLoader } from "@react-google-maps/api";
import React, { createContext, ReactNode,useContext } from "react";

interface GoogleMapsContextValue {
    isLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextValue>({ isLoaded: false });

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
    // 한 번만 로드
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GoogleMapsContext.Provider value={{ isLoaded }}>
            {children}
        </GoogleMapsContext.Provider>
    );
}

export function useGoogleMaps() {
    return useContext(GoogleMapsContext);
}
