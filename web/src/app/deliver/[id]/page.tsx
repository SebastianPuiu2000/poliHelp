'use client';

import Map, { Point } from "../../../components/Map";
import { useCallback, useEffect, useState } from "react";
import MapMarker from "@/components/MapMarker";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

export default function Page({ params }) {
  const user = useUser();
  const id = params.id;

  const router = useRouter();

  const [center, setCenter] = useState<Point | null>(null);
  const [destination, setDestination] = useState<Point | null>(null);

  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    fetch(`/api/request?id=${id}`).then(async (response) => {
      const data = await response.json();
      if (data.success) {
        console.log(data);
        setDestination({ lat: data.request.lat, lng: data.request.lng });
      } else {
        router.back();
      }
    });
  }, [id, router]);

  const onCenter = useCallback(async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setCenter({ lat, lng });
  }, []);

  const handleClick = async () => {
    setButtonActive(false);
    const response = await fetch('/api/completeRequest', {
      method: 'POST',
      body: JSON.stringify({
        token: user?.token,
        requestId: id
      })
    });

    const data = await response.json();
    console.log(data);

    router.back();
  };

  const positionMarker = center !== null
    ? <MapMarker
      key={'position'}
      lat={center.lat}
      lng={center.lng}
      color={'green-500'}
    >
      <span className='flex justify-center text-slate-900 text-lg text-center w-full'>
        Position
      </span>
    </MapMarker> : '';

  const destinationMarker = destination !== null
    ? <MapMarker
      key={'destination'}
      lat={destination.lat}
      lng={destination.lng}
      color={'red-500'}
    >
      <span className='flex justify-center text-slate-900 text-lg text-center w-full'>
        Destination
      </span>
    </MapMarker> : '';

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <button
        className={`bg-violet-900 rounded py-2 px-6 my-4 ${!buttonActive ? 'opacity-30' : ''}`}
        disabled={!buttonActive}
        onClick={handleClick}
      >
        Finish delivery
      </button>
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} onCenter={onCenter}>
          {positionMarker}
          {destinationMarker}
        </Map>
      </div>
    </div>
  );
}
