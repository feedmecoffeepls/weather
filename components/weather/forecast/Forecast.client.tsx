"use client";
import ForecastItem from "@/components/ui/ForecastItem";
import getForecast from "@/server/actions/weather/getForecast";
import useLatLon from "@/hooks/weather/useLatLon";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const Weather = () => {
  const { lat, lon } = useLatLon();
  const { data } = useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => getForecast(lat, lon),
  });

  if (!data) return <p>Forecast not found</p>;
  console.log(data);

  const { list } = data;

  return (
    <div className="w-full my-12">
      <p className="font-bold mb-4">5-day Forecast (3 Hours)</p>
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
