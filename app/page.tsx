import CurrentWeather from "@/components/weather/currentWeather/CurrentWeather.server";

export default function Home() {
  return (
    <main className="p-4">
      <CurrentWeather />
    </main>
  );
}
