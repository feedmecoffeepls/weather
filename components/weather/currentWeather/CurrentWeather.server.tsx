import getCurrentWeather from "@/server/actions/weather/getCurrentWeather";
import { QueryClient } from "@tanstack/react-query";
import Weather from "./Weather.client";

const CurrentWeather = async () => {
  const lat = "1.2899175";
  const lon = "103.8519072";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getCurrentWeather(lat, lon),
  });

  return <Weather />;
};

export default CurrentWeather;
