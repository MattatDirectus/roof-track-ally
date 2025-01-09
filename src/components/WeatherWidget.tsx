import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Cloudy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "./ui/card";

const WEATHER_API_KEY = "YOUR_API_KEY"; // Note: In production, this should be in an environment variable
const LOCATION = "New York"; // This could be made dynamic based on user's location

const fetchWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${WEATHER_API_KEY}&units=imperial`
  );
  if (!response.ok) throw new Error('Weather data fetch failed');
  return response.json();
};

const getWeatherIcon = (weatherCode: string) => {
  switch (weatherCode) {
    case "01d":
    case "01n":
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return <Cloud className="w-8 h-8 text-gray-500" />;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    case "13d":
    case "13n":
      return <CloudSnow className="w-8 h-8 text-blue-300" />;
    case "11d":
    case "11n":
      return <CloudLightning className="w-8 h-8 text-yellow-600" />;
    default:
      return <Cloudy className="w-8 h-8 text-gray-500" />;
  }
};

const WeatherWidget = () => {
  const { data: weather, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
    refetchInterval: 1800000, // Refetch every 30 minutes
  });

  if (isLoading) return <div className="animate-pulse">Loading weather...</div>;
  if (error) return null;

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {weather && getWeatherIcon(weather.weather[0].icon)}
            <div>
              <p className="text-2xl font-semibold">
                {Math.round(weather?.main?.temp)}°F
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {weather?.weather[0]?.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{LOCATION}</p>
            <p className="text-sm text-muted-foreground">
              Humidity: {weather?.main?.humidity}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;