import getForecast from "@/server/actions/weather/getForecast";
import { QueryClient } from "@tanstack/react-query";
import Forecast from "./Forecast.client";
import { DEFAULT_LAT, DEFAULT_LON } from "@/constants/defaults";

const WeatherForecast = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["forecast", DEFAULT_LAT, DEFAULT_LON],
    queryFn: () => getForecast(DEFAULT_LAT, DEFAULT_LON),
  });

  return <Forecast />;
};

export default WeatherForecast;
