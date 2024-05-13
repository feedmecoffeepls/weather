"use client";
import ForecastItem from "@/components/ui/ForecastItem";
import getForecast from "@/server/actions/weather/getForecast";
import { useQuery } from "@tanstack/react-query";

const Weather = () => {
  const lat = "1.2899175";
  const lon = "103.8519072";
  const { data } = useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => getForecast(lat, lon),
  });

  if (!data) return <p>Forecast not found</p>;
  console.log(data);

  const { list } = data;

  return (
    <div>
      {Object.entries(list).map(([date, items]) => (
        <div key={"date-" + date} className="pt-8">
          <p>
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
  );
};
export default Weather;
