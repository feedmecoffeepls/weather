"use client";
import Icon from "@/components/ui/Icon";
import getCurrentWeather from "@/server/actions/weather/getCurrentWeather";
import useLatLon from "@/hooks/weather/useLatLon";
import { useQuery } from "@tanstack/react-query";

const Weather = () => {
  const { lat, lon } = useLatLon();
  const { data } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getCurrentWeather(lat, lon),
  });

  if (!data) return <p>Weather not found</p>;

  const { weather: allWeather, main: atmosphere, wind } = data;
  const weather = allWeather[0];

  return (
    <div className="w-full px-8 py-4 shadow rounded-lg bg-slate-50">
      <div>
        <p className="font-bold">
          {new Date(data?.dt * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap pt-4">
        <div className="flex w-full justify-center lg:justify-start my-4">
          <div>
            <Icon iconId={weather?.icon} alt={weather?.description} />
          </div>
          <div className="ml-12 text-center lg:text-left">
            <p className="text-2xl font-medium">
              {(atmosphere?.temp / 10).toFixed(2)} °C
            </p>
            <p className="text-slate-600">{weather?.description}</p>
          </div>
        </div>
        <div className="flex w-full justify-between text-center mt-4 mb-2">
          <div>
            <p className="text-sm text-slate-600">Humidity</p>
            <p className="font-medium">{atmosphere?.humidity} %</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Winds</p>
            <p className="font-medium">{wind?.speed} m/s</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Visibility</p>
            <p className="font-medium">{data?.visibility} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weather;
