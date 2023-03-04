'use client';

import GoogleMapReact, { BootstrapURLKeys } from 'google-map-react';
import { useEffect, useState } from 'react';

export interface Point {
  lat: number,
  lng: number
}

export type Center = 'onDevice' | Point;

interface MapProps {
  center: Center,
  children: any,
  onClick?: (ev: GoogleMapReact.ClickEventValue) => void,
  onCenter?: (position: GeolocationPosition) => Promise<void>
}

const defaultCenter = { lat: 49.09, lng: 29.31 };

export default function Map({ center, onCenter, children, onClick }: MapProps) {
  const urlKeys: BootstrapURLKeys = { key: 'AIzaSyAMAQc9IjmkELwZXJJ0JvDaNRQiSvCk9k4' };
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
      onClick={onClick ? onClick : () => null}
    >
      {children}
    </GoogleMapReact>
  )
}
