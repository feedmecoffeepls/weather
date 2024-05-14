"use client";
import { useSearchParams } from "next/navigation";

const useLatLon = () => {
  const defaultLat = "1.2899175";
  const defaultLon = "103.8519072";
  const searchParams = useSearchParams();
  let lat = defaultLat 
  let lon = defaultLon
  if (searchParams) {
    lat = searchParams.get("lat") || defaultLat;
    lon = searchParams.get("lon") || defaultLon ;
  }
  return { lat, lon };
}

export default useLatLon