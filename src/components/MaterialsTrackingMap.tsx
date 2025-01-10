import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Map } from 'lucide-react';
import { Input } from "@/components/ui/input";

const MaterialsTrackingMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  
  // Hardcoded delivery route coordinates (warehouse to delivery location)
  const warehouseLocation: [number, number] = [-73.935242, 40.730610]; // Example NYC location
  const deliveryLocation: [number, number] = [-73.955242, 40.750610]; // Example destination

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [(warehouseLocation[0] + deliveryLocation[0]) / 2, 
              (warehouseLocation[1] + deliveryLocation[1]) / 2],
      zoom: 11,
      pitch: 45,
    });

    const map = mapInstance.current;

    // Add markers for warehouse and delivery location
    new mapboxgl.Marker({ color: "#36454F" })
      .setLngLat(warehouseLocation)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Warehouse</h3><p>Materials Origin</p>"))
      .addTo(map);

    new mapboxgl.Marker({ color: "#36454F" })
      .setLngLat(deliveryLocation)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Delivery Location</h3><p>Your Address</p>"))
      .addTo(map);

    map.on('load', () => {
      if (!mapInstance.current) return;
      
      map.addSource('route', {
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

      map.addLayer({
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

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [mapboxToken]);

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Materials Tracking</h3>
        </div>
        {!mapboxToken && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Please enter your Mapbox public token to view the delivery tracking map.
              You can find this in your Mapbox account dashboard at mapbox.com.
            </p>
            <Input
              type="text"
              placeholder="Enter Mapbox token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full"
            />
          </div>
        )}
        <div ref={mapContainer} className="h-[300px] w-full rounded-lg overflow-hidden" />
      </div>
    </Card>
  );
};

export default MaterialsTrackingMap;