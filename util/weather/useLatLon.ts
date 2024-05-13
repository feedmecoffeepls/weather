"use client";
import { useSearchParams } from "next/navigation";

const useLatLon = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat") || "1.2899175";
  const lon = searchParams.get("lon") || "103.8519072";
  return { lat, lon };
}

export default useLatLon