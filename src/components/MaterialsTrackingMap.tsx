import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Package } from 'lucide-react';

const MaterialsTrackingMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Hardcoded delivery route coordinates (warehouse to delivery location)
  const warehouseLocation: [number, number] = [-73.935242, 40.730610]; // Example NYC location
  const deliveryLocation: [number, number] = [-73.955242, 40.750610]; // Example destination

  useEffect(() => {
    if (!mapContainer.current || !apiKey || isMapInitialized) return;

    try {
      mapboxgl.accessToken = apiKey;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [(warehouseLocation[0] + deliveryLocation[0]) / 2, 
                (warehouseLocation[1] + deliveryLocation[1]) / 2],
        zoom: 11,
        pitch: 45,
      });

      // Add markers for warehouse and delivery location
      new mapboxgl.Marker({ color: "#36454F" })
        .setLngLat(warehouseLocation)
        .setPopup(new mapboxgl.Popup().setHTML("<h3>Warehouse</h3><p>Materials Origin</p>"))
        .addTo(map.current);

      new mapboxgl.Marker({ color: "#36454F" })
        .setLngLat(deliveryLocation)
        .setPopup(new mapboxgl.Popup().setHTML("<h3>Delivery Location</h3><p>Your Address</p>"))
        .addTo(map.current);

      // Draw a line between the two points
      map.current.on('load', () => {
        if (!map.current) return;
        
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [warehouseLocation, deliveryLocation]
            }
          }
        });

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#36454F',
            'line-width': 3,
            'line-dasharray': [2, 2]
          }
        });
      });

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [apiKey, isMapInitialized]);

  return (
    <Card className="p-4 space-y-4">
      {!apiKey ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Materials Tracking</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Please enter your Mapbox public token to view the materials tracking map.
            You can find this at mapbox.com in your account dashboard.
          </p>
          <Input
            type="text"
            placeholder="Enter Mapbox public token"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Materials Tracking</h3>
          </div>
          <div ref={mapContainer} className="h-[300px] w-full rounded-lg overflow-hidden" />
        </div>
      )}
    </Card>
  );
};

export default MaterialsTrackingMap;