"use client";
import {
  DEFAULT_LAT,
  DEFAULT_LOCATION,
  DEFAULT_LON,
  DEFAULT_NAME,
} from "@/constants/defaults";
import useLatLon from "@/hooks/weather/useLatLon";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TopMenu = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || DEFAULT_LOCATION;
  const name = searchParams.get("name") || DEFAULT_NAME;

  const { lat, lon } = useLatLon();
  const slug = `?location=${encodeURIComponent(
    location
  )}&name=${encodeURIComponent(name)}&lat=${lat}&lon=${lon}`;

  const isDefault = lat === DEFAULT_LAT && lon === DEFAULT_LON;

  return (
    <div className="bg-slate-50 shadow py-1">
      <div className="container mx-auto flex justify-between p-4">
        <div>
          <Link href={isDefault ? "/" : "/" + slug}>
            <MapPin className="inline-block" />
            <p className="font-bold inline-block ml-4">
              {name}, {location}
            </p>
          </Link>
        </div>
        <Link href={isDefault ? "/search" : "/search" + slug}>
          <Search />
        </Link>
      </div>
    </div>
  );
};

export default TopMenu;
