'use client';

import Map, { Point } from "../../../components/Map";
import { useEffect, useState } from "react";
import MapMarker from "@/components/MapMarker";

export default function Page({ params }) {
  const id = params.id;

  const [center, setCenter] = useState<Point | null>(null);

  useEffect(() => {

  }, []);

  const onCenter = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setCenter({ lat, lng });
  }

  const positionMarker = center !== null
    ? <MapMarker
      key={'selected'}
      lat={center.lat}
      lng={center.lng}
      color={'green-500'}
    /> : '';

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} onCenter={onCenter}>
          { positionMarker }
        </Map>
      </div>
    </div>
  );
}
