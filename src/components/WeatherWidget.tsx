import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Cloudy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

const LOCATION = "New York"; // This could be made dynamic based on user's location

const fetchWeather = async (apiKey: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${apiKey}&units=imperial`
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
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("weatherApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyDialog(true);
    }
  }, []);

  const handleSaveApiKey = (newApiKey: string) => {
    localStorage.setItem("weatherApiKey", newApiKey);
    setApiKey(newApiKey);
    setShowApiKeyDialog(false);
  };

  const { data: weather, isLoading, error } = useQuery({
    queryKey: ['weather', apiKey],
    queryFn: () => fetchWeather(apiKey),
    enabled: !!apiKey,
    refetchInterval: 1800000, // Refetch every 30 minutes
  });

  if (!apiKey) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setShowApiKeyDialog(true)}
        className="w-full"
      >
        Set Weather API Key
      </Button>
    );
  }

  if (isLoading) return <div className="animate-pulse">Loading weather...</div>;
  if (error) return (
    <div className="text-sm text-red-500">
      Error loading weather data. 
      <Button 
        variant="link" 
        className="p-0 h-auto text-sm"
        onClick={() => setShowApiKeyDialog(true)}
      >
        Check API key
      </Button>
    </div>
  );

  return (
    <>
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

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OpenWeather API Key</DialogTitle>
            <DialogDescription>
              Please enter your OpenWeather API key. You can get one for free at{" "}
              <a 
                href="https://openweathermap.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openweathermap.org
              </a>
            </DialogDescription>
          </DialogHeader>
          <Input
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-2"
          />
          <Button 
            onClick={() => handleSaveApiKey(apiKey)}
            className="mt-4"
            disabled={!apiKey}
          >
            Save API Key
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WeatherWidget;