"use client";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Search, Trash } from "lucide-react";
import constructURL from "@/util/search/constructURL";

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
    <div className="max-w-screen-sm mx-auto">
      <p className="font-bold mb-4">Search History</p>
      <div className="bg-slate-50 rounded-lg shadow p-8">
        {!history || (history.length === 0 && "No history to display")}
        {history.map((item, key) => (
          <div
            key={"history-" + key}
            className="flex items-center justify-between pb-2"
          >
            <p className="font-bold">
              {item.name}, {item.country}
            </p>
            <div>
              <Link href={constructURL(item)}>
                <Button variant="outline" size="icon">
                  <Search style={{ height: "20px" }} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(item)}
                className="ml-4"
              >
                <Trash style={{ height: "20px" }} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
