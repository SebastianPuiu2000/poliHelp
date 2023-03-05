'use client';

import { useCallback, useEffect, useState } from 'react';
import { User, useUser } from '../UserContext';
import Map, { Point } from '../../components/Map';
import MapMarker from '../../components/MapMarker';
import googleMapReact from 'google-map-react';

function ProviderButton(user: User | null, selected: Point | null, reload: Function) {
  const [value, setValue] = useState('0');

  if (!user || user.role !== 'provideShelter') return;

  const valid = selected !== null && parseInt(value) > 0;

  const handleCreate = async () => {
    if (!valid) return;

    const response = await fetch('/api/shelter', {
      method: 'POST',
      body: JSON.stringify({
        token: user.token,
        quantity: parseInt(value),
        ...selected
      })
    });

    await response.json();

    reload();
  }

  return (
    <div className='flex flex-row gap-6 justify-center items-center'>
      <input
        className="w-8 rounded text-center"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={`bg-violet-900 rounded py-2 px-6 my-4 ${!valid ? 'opacity-30' : ''}`}
        disabled={!valid}
        onClick={handleCreate}
      >
        Create shelter
      </button>
    </div>
  )
}

async function fetchShelterPoints(setMarkers: any) {
  const response = await fetch(`/api/shelter`);
  const data = await response.json();
  if (data.success) {
    setMarkers(data.availableShelters.map((shelter) => {
      return {
        id: shelter._id,
        point: { lat: shelter.lat, lng: shelter.lng },
        quantity: shelter.quantity
      }
    }));
  }
}

async function takeShelter(user: User, shelterId: string, reload: Function) {
  const response = await fetch(`/api/shelter?id=${shelterId}`, {
    method: 'PUT',
    body: JSON.stringify({ token: user.token })
  });
  const data = await response.json();
  console.log(data);
  reload();
}

export default function Dropoffs() {
  const user = useUser();

  const [markers, setMarkers] = useState<any>([]);
  const [selected, setSelected] = useState<Point | null>(null);

  useEffect(() => {
    fetchShelterPoints(setMarkers);
  }, []);

  const handleClick = useCallback((ev: googleMapReact.ClickEventValue) => {
    if (!user || user.role !== 'provideShelter') return;

    setSelected({
      lat: ev.lat,
      lng: ev.lng
    });
  }, [user]);

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
      {ProviderButton(user, selected, reload)}
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} onClick={handleClick}>
          {
            markers.map(marker =>
              <MapMarker
                key={marker.id}
                lat={marker.point.lat}
                lng={marker.point.lng}
                color='blue-500'
              >
                <span className='flex justify-center text-slate-900 text-lg text-center w-full'>
                  Shelter for <b className='pl-1.5'> {marker.quantity} </b>
                </span>
                {
                  user && user.role === 'needShelter'
                    ? <div className='border-t text-lg text-slate-800 w-full flex justify-center items-center h-12 text-center'>
                      <button className='font-bold' onClick={() => takeShelter(user, marker.id, reload)}>
                        Take shelter here
                      </button>
                    </div>
                    : ''
                }
              </MapMarker>
            )
          }
          {selectedMarker}
        </Map>
      </div>
    </div>
  );
}
