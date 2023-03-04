'use client';

import GoogleMapReact, { BootstrapURLKeys } from 'google-map-react';
import { useEffect, useState } from 'react';

export interface Point {
  lat: number,
  lng: number
}

export interface Marker {
  point: Point,
  color: string,
  text: string
}

export type Center = 'onDevice' | Point;

interface MapProps {
  center: Center,
  children: any,
  onCenter?: (position: GeolocationPosition) => Promise<void>
}

const defaultCenter = { lat: 49.09, lng: 29.31 };

export default function Map({ center, onCenter, children }: MapProps) {
  const urlKeys: BootstrapURLKeys = { key: '' };
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
      {children}
    </GoogleMapReact>
  )
}
