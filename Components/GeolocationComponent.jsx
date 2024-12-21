import { useGeolocated } from "react-geolocated";

const useGeolocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  if (!isGeolocationAvailable) {
    return { error: "Geolocation is not supported by your browser." };
  }

  if (!isGeolocationEnabled) {
    return { error: "Geolocation is disabled. Please enable it in your browser settings." };
  }

  if (!coords) {
    return { loading: true, error: null, latitude: null, longitude: null };
  }

  return {
    loading: false,
    error: null,
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};

export default useGeolocation;
