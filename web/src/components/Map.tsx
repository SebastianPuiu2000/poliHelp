'use client';

import GoogleMapReact, { BootstrapURLKeys } from 'google-map-react';

interface Point {
  lat: number,
  lon: number
}

interface MapProps {
  center: Point,
  markers: [{
    point: Point,
    color: string,
    text: string
  }]
}

export default function Map({ center, markers }: MapProps) {
  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  const urlKeys: BootstrapURLKeys = { key: 'AIzaSyAzHR9EkdyeOMjR4Xe_ma4mDE57nhxR0A' };

  return (
    <GoogleMapReact
      bootstrapURLKeys={urlKeys}
      defaultCenter={location}
      defaultZoom={17}
      className="w-60 h-60"
    />
  )
}
