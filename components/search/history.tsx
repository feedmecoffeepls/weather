"use client";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Button } from "../ui/button";
import Link from "next/link";

interface Location {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  created_at: string;
}

const History = () => {
  const [history, setHistory] = useState<Location[]>([]);
  useEffect(() => {
    const rawHistory = secureLocalStorage.getItem("searchHistory");
    const parsedHistory =
      typeof rawHistory === "string" ? JSON.parse(rawHistory) : [];
    setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
    console.log(parsedHistory);
  }, []);

  const handleDelete = (item: Location) => {
    const currentHistoryRaw = secureLocalStorage.getItem("searchHistory");
    const currentHistory =
      typeof currentHistoryRaw === "string"
        ? JSON.parse(currentHistoryRaw)
        : [];
    if (Array.isArray(currentHistory)) {
      const updatedHistory = currentHistory.filter(
        (h) => h.created_at !== item.created_at
      );
      secureLocalStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
      setHistory(updatedHistory);
    }
  };

  return (
    <div>
      {history.map((item, key) => (
        <div key={"history-" + key} className="flex">
          <p>{item.name}</p>
          <Link href="/">
            <Button variant="outline" size="icon">
              S
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(item)}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};

export default History;
