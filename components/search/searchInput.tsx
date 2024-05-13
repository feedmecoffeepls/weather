"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import getLocations from "@/server/actions/geo/getLocations";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [searchParam, setSearchParam] = useState("Singapore");
  const router = useRouter();
  const onSubmit = async () => {
    const data = await getLocations(searchParam);
    const timestampedData = data.map((location) => ({
      ...location,
      created_at: new Date().toISOString(),
    }));
    const rawHistory = secureLocalStorage.getItem("searchHistory");
    const existingHistory = [
      ...timestampedData,
      ...(typeof rawHistory === "string" ? JSON.parse(rawHistory) : []),
    ];
    secureLocalStorage.setItem(
      "searchHistory",
      JSON.stringify(existingHistory)
    );
    const url = `/?location=${encodeURIComponent(
      searchParam
    )}&name=${encodeURIComponent(data[0]?.name)}&lat=${data[0]?.lat}&lon=${
      data[0]?.lon
    }`;
    router.push(url);
  };
  return (
    <div className="flex">
      <Input
        onChange={(e) => setSearchParam(e.target.value)}
        className="mr-4"
      />
      <Button onClick={onSubmit}>{">"}</Button>
    </div>
  );
};

export default SearchInput;
