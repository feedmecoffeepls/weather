import getForecast from "@/server/actions/weather/getForecast";
import { QueryClient } from "@tanstack/react-query";
import Forecast from "./Forecast.client";

const WeatherForecast = async () => {
  const lat = "1.2899175";
  const lon = "103.8519072";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => getForecast(lat, lon),
  });

  return <Forecast />;
};

export default WeatherForecast;
