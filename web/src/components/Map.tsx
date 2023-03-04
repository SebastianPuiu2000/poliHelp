'use client';

import GoogleMapReact, { BootstrapURLKeys } from 'google-map-react';
import { useEffect, useState } from 'react';
import MapMarker from './MapMarker';

interface Point {
  lat: number,
  lng: number
}

interface Marker {
  point: Point,
  color: string,
  text: string
}

type Center = 'onDevice' | Point;

interface MapProps {
  center: Center,
  markers: Marker[],
  onCenter?: (position: GeolocationPosition) => Promise<void>
}

const defaultCenter = { lat: 49.09, lng: 29.31 };

export default function Map({ center, markers, onCenter }: MapProps) {
  const urlKeys: BootstrapURLKeys = { key: 'AIzaSyAzHR9EkdyeOMjR4Xe_ma4mDE57nhxR0AY' };
  const [centerPoint, setCenterPoint] = useState(defaultCenter);

  useEffect(() => {
    if (center === 'onDevice' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenterPoint({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        if (onCenter) onCenter(position);
      });
    }
  }, []);

  return (
    <GoogleMapReact
      bootstrapURLKeys={urlKeys}
      defaultCenter={defaultCenter}
      center={centerPoint}
      defaultZoom={12}
    >
      {
        markers.map(marker =>
          <MapMarker
            key={marker.text}
            lat={marker.point.lat}
            lng={marker.point.lng}
            color={marker.color}
          >
            <span className='text-slate-900 text-lg'>
              {marker.text}
            </span>
          </MapMarker>
        )
      }
    </GoogleMapReact>
  )
}
