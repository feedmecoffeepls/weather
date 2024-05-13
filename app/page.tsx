import CurrentWeather from "@/components/weather/current-weather/CurrentWeather.server";
import WeatherForecast from "@/components/weather/forecast/WeatherForecast.server";

export default function Home() {
  return (
    <main className="p-4">
      <CurrentWeather />
      <WeatherForecast />
    </main>
  );
}
