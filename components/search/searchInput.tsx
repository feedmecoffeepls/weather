"use client";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

import getLocations from "@/server/actions/geo/getLocations";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import constructURL from "@/util/search/constructURL";

const SearchInput = () => {
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    setError(false);
    setLoading(true);

    const response = await getLocations(searchParam.toLowerCase());

    let data;
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
      const url = constructURL(data[0]);
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
          placeholder="Search country or city here..."
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
