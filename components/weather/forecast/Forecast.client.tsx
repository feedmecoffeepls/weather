"use client";
import ForecastItem from "@/components/ui/ForecastItem";
import getForecast from "@/server/actions/weather/getForecast";
import useLatLon from "@/hooks/weather/useLatLon";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const Weather = () => {
  const { lat, lon } = useLatLon();
  const { data } = useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => getForecast(lat, lon),
  });

  if (!data) return <LoaderCircle className="animate-spin" />;
  if (!data || "error" in data)
    return (
      <div className="w-full px-8 py-12 shadow rounded-lg bg-slate-50 text-center mt-20">
        <p className="mb-4">Could not fetch forecast</p>
        <Link href="/search">
          <Button>Try again</Button>
        </Link>
      </div>
    );

  const { list } = data;

  return (
    <div className="w-full my-12">
      <div className="mb-4">
        <p className="font-bold ">5-day Forecast (3 Hours)</p>
        <p>
          Time is in browser time (
          {Intl.DateTimeFormat().resolvedOptions().timeZone})
        </p>
      </div>
      <div className="px-8 shadow rounded-lg bg-slate-50">
        {Object.entries(list).map(([date, items]) => (
          <div key={"date-" + date} className="pt-6">
            <p className="text-slate-600 mb-1">
              {new Date(date).toLocaleDateString() ===
              new Date().toLocaleDateString()
                ? "Today"
                : new Date(date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })}
            </p>
            {items.map((item: any, key: number) => (
              <ForecastItem
                item={item}
                key={`forecast-${date}-${key}-${item?.dt}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Weather;
