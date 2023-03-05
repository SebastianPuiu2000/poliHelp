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
      console.log(response);
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
      color={'mantis-500'}
    >
      <span className='flex justify-center text-mantis-900 text-lg text-center w-full'>
        Position
      </span>
    </MapMarker> : '';

  const destinationMarker = destination !== null
    ? <MapMarker
      key={'destination'}
      lat={destination.lat}
      lng={destination.lng}
      color={'mahogany-500'}
    >
      <span className='flex justify-center text-mantis-900 text-lg text-center w-full'>
        Destination
      </span>
    </MapMarker> : '';

  return (
    <div className="h-full w-full flex flex-col justify-around">
      <div className='w-full flex justify-center'>
        <button
          className={`bg-mantis-700 w-56 rounded py-2 px-6 my-4 ${!buttonActive ? 'opacity-30' : ''}`}
          disabled={!buttonActive}
          onClick={handleClick}
        >
          Finish delivery
        </button>
      </div>
      <div className="w-full h-full">
        <Map center={'onDevice'} onCenter={onCenter}>
          {positionMarker}
          {destinationMarker}
        </Map>
      </div>
    </div>
  );
}
