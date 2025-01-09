import { Sun } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const WeatherWidget = () => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-semibold">30°F</p>
              <p className="text-sm text-muted-foreground">Sunny</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">New York</p>
            <p className="text-sm text-muted-foreground">
              Humidity: 45%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;