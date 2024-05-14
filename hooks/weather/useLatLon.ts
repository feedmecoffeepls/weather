"use client";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LAT, DEFAULT_LON } from "@/constants/defaults";

const useLatLon = () => {
  const searchParams = useSearchParams();
  let lat = DEFAULT_LAT 
  let lon = DEFAULT_LON
  if (searchParams) {
    lat = searchParams.get("lat") || DEFAULT_LAT;
    lon = searchParams.get("lon") || DEFAULT_LON ;
  }
  return { lat, lon };
}

export default useLatLon