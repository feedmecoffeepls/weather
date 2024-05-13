"use client";
import Icon from "@/components/ui/Icon";
import getCurrentWeather from "@/server/actions/weather/getCurrentWeather";
import { useQuery } from "@tanstack/react-query";

const Weather = () => {
  const lat = "1.2899175";
  const lon = "103.8519072";
  const { data } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getCurrentWeather(lat, lon),
  });

  if (!data) return <p>Weather not found</p>;

  const { weather: allWeather, main: atmosphere, wind } = data;
  const weather = allWeather[0];

  return (
    <div>
      <div>
        <p>
          {new Date(data?.dt * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex">
        <div>
          <Icon iconId={weather?.icon} alt={weather?.description} />
        </div>
        <div>
          <p>{weather?.main}</p>
          <p>{(atmosphere?.temp / 10).toFixed(2)} °C</p>
          <p>{weather?.description}</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <p>Humidity</p>
          <p>{atmosphere?.humidity} %</p>
        </div>
        <div>
          <p>Winds</p>
          <p>{wind?.speed} m/s</p>
        </div>
        <div>
          <p>Visibility</p>
          <p>{data?.visibility} km</p>
        </div>
      </div>
    </div>
  );
};
export default Weather;
