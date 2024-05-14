"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import getLocations from "@/server/actions/geo/getLocations";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SearchInput = () => {
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    setError(false);
    setLoading(true);

    const response = await getLocations(searchParam.toLowerCase());

    let data, error;
    if ("data" in response && response.data.length > 0) {
      data = response.data;
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
    } else {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="mb-12">
      <div className="flex">
        <Input
          onChange={(e) => setSearchParam(e.target.value)}
          className="mr-4"
        />
        <Button
          onClick={onSubmit}
          disabled={searchParam === "" || loading ? true : false}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {"Search"}
        </Button>
      </div>
      {error && <p className="my-2">Invalid country or city</p>}
    </div>
  );
};

export default SearchInput;
