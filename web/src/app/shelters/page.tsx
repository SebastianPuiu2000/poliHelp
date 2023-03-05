'use client';

import { useEffect, useState } from 'react';
import { User, useUser } from '../UserContext';
import Map, { Point } from '../../components/Map';
import MapMarker from '../../components/MapMarker';

function providerButtons(user: User, selected: Point | null, reload: Function) {
  const noSelection = selected === null;

  const handleCreate = async () => {
    if (noSelection) return;

    const response = await fetch('/api/shelter', {
      method: 'POST',
      body: JSON.stringify({
        token: user.token,
        ...selected
      })
    });

    await response.json();

    reload();
  }

  return (
    <div className='flex flex-row gap-6 justify-center'>
      <button
        disabled={noSelection}
        className={`bg-violet-900 rounded py-2 px-6 my-4 ${noSelection ? 'opacity-30' : ''}`}
        onClick={handleCreate}
      >
        Create dropoff point
      </button>
    </div>
  )
}

async function fetchShelterPoints(setMarkers: any) {
  const response = await fetch(`/api/shelter`);
  const data = await response.json();
  if (data.success) {
    console.log(data);
    setMarkers(data.availableShelters.map(({ dropoff, requests }: any) => {
      return {
        id: dropoff._id,
        point: { lat: dropoff.lat, lng: dropoff.lng },
        supplies: dropoff.supplies,
        requests
      }
    }));
  }
}

export default function Dropoffs() {
  const user = useUser();

  const [markers, setMarkers] = useState<any>([]);
  const [selected, setSelected] = useState<Point | null>(null);

  useEffect(() => {
    fetchShelterPoints(setMarkers);
  }, []);

  const reload = async () => {
    await fetchShelterPoints(setMarkers);
    setSelected(null);
  };

  const selectedMarker = selected !== null
    ? <MapMarker
      key={'selected'}
      lat={selected.lat}
      lng={selected.lng}
      color={'green-500'}
      onClick={() => setSelected(null)}
    /> : '';

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {user ? providerButtons(user, selected, reload) : ''}
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'}>
          {
            markers.map(marker =>
              <MapMarker
                key={marker.id}
                lat={marker.point.lat}
                lng={marker.point.lng}
                color='blue-500'
              >
                <span className='flex justify-center text-slate-900 text-lg text-center w-full'>
                  Shelter for
                </span>
                <span> {2} </span>
              </MapMarker>
            )
          }
          { selectedMarker }
        </Map>
      </div>
    </div>
  );
}
