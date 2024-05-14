"use client";
import { DEFAULT_LOCATION } from "@/constants/defaults";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TopMenu = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || DEFAULT_LOCATION;
  return (
    <div className="bg-slate-50 shadow py-1">
      <div className="container mx-auto flex justify-between p-4">
        <div>
          <MapPin className="inline-block" />
          <p className="font-bold inline-block ml-4">{location}</p>
        </div>
        <Link href="/search">
          <Search />
        </Link>
      </div>
    </div>
  );
};

export default TopMenu;
