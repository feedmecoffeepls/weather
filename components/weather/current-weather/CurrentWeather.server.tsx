import getCurrentWeather from "@/server/actions/weather/getCurrentWeather";
import { QueryClient } from "@tanstack/react-query";
import Weather from "./Weather.client";

import { DEFAULT_LAT, DEFAULT_LON } from "@/constants/defaults";

const CurrentWeather = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["weather", DEFAULT_LAT, DEFAULT_LON],
    queryFn: () => getCurrentWeather(DEFAULT_LAT, DEFAULT_LON),
  });

  return <Weather />;
};

export default CurrentWeather;
