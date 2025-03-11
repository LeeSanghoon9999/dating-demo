// providers/LocationProvider.tsx
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type UserLocation = {
    lat: number;
    lng: number;
};

type LocationContextType = {
    location: UserLocation | null;  // 위치 정보 (null이면 아직 로딩 전)
    loaded: boolean;                // 위치 로딩 완료 여부
};

const LocationContext = createContext<LocationContextType>({
    location: null,
    loaded: false,
});

export function LocationProvider({ children }: { children: ReactNode }) {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // 앱 시작 시 위치를 한 번만 요청
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                    setLoaded(true);
                },
                (err) => {
                    console.error("위치 정보를 가져오지 못했습니다.", err);
                    setLoaded(true);
                }
            );
        } else {
            console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
            setLoaded(true);
        }
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <LocationContext.Provider value={{ location, loaded }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocationContext() {
    return useContext(LocationContext);
}
