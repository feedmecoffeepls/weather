import Icon from "./Icon";

const ForecastItem = ({ item }: ForecastItemProps) => {
  const { weather: allWeather, main } = item;
  const weather = allWeather[0];
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div>
          <p className="font-bold">
            {new Date(item?.dt * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="ml-4 mr-2">
          <Icon iconId={weather?.icon} alt={weather?.description} />
        </div>
        <div>
          <p>
            {main?.temp_min.toFixed(2)} / {main?.temp_max.toFixed(2)} °C
          </p>
        </div>
      </div>
      <div className="hidden sm:block">
        <p className="font-bold">{weather?.description}</p>
      </div>
    </div>
  );
};
export default ForecastItem;

interface ForecastItemProps {
  item: {
    dt: number;
    main: {
      temp?: number;
      feels_like?: number;
      temp_min: number;
      temp_max: number;
      pressure?: number;
      sea_level?: number;
      grnd_level?: number;
      humidity?: number;
      temp_kf?: number;
    };
    weather: {
      id?: number;
      main?: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all?: number;
    };
    wind: {
      speed?: number;
      deg?: number;
      gust?: number;
    };
    visibility?: number;
    pop?: number;
    rain?: {
      "3h"?: number;
    };
    sys: {
      pod?: string;
    };
    dt_txt?: string;
  };
}
