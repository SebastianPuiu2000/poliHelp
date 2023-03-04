'use client';

import { useState } from 'react';
import { User, useUser } from '../UserContext';
import Map, { Point } from '../../components/Map';
import MapMarker from '../../components/MapMarker';
import googleMapReact from 'google-map-react';

function deliveryButtons(user: User, selected: Point | null, reload: Function) {
  const noSelection = selected === null;

  const handleCreate = async () => {
    if (noSelection) return;

    const response = await fetch('/api/dropoff', {
      method: 'POST',
      body: JSON.stringify({
        token: user.token,
        ...selected
      })
    });

    console.log(await response.json());

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

async function fetchDropoffPoints({ lat, lng }: Point) {
  const response = await fetch(`/api/dropoff?lat=${lat}&lng=${lng}`);
  return await response.json();
}

export default function Dropoffs() {
  const user = useUser();
  const [markers, setMarkers] = useState<Marker[]>([]);

  const [selected, setSelected] = useState<Point | null>(null);
  const [center, setCenter] = useState<Point | null>(null);

  const onCenter = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setCenter({ lat, lng });
    const data = await fetchDropoffPoints({ lat, lng });
    if (data.success) {
      setMarkers(data.dropoffs.map(({ dropoff, requests }: any) => ({
        id: dropoff._id,
        point: { lat: dropoff.lat, lng: dropoff.lng },
        requests
      })));
    }
  };

  const handleClick = (ev: googleMapReact.ClickEventValue) => {
    if (!user || user.role !== 'delivery') return;

    setSelected({
      lat: ev.lat,
      lng: ev.lng
    });
  };

  const reload = async () => {
    setSelected(null);
    if (center) {
      const data = await fetchDropoffPoints(center);
      if (data.success) {
        setMarkers(data.dropoffs.map(({ dropoff, requests }: any) => ({
          id: dropoff._id,
          point: { lat: dropoff.lat, lng: dropoff.lng },
          requests
        })));
      }
    }
  };

  const selectedMarker = selected !== null
    ? <MapMarker
      key={'selected'}
      lat={selected.lat}
      lng={selected.lng}
      color={'green-500'}
      onClick={() => setSelected(null)}
    /> : <div></div>;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {user ? deliveryButtons(user, selected, reload) : ''}
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} onCenter={onCenter} onClick={handleClick}>
          {
            markers.map(marker =>
              <MapMarker
                key={marker.id}
                lat={marker.point.lat}
                lng={marker.point.lng}
                color='blue-500'
              >
                <span className='text-slate-900 text-lg'>
                  Dropoff
                </span>
              </MapMarker>
            )
          }
          { selectedMarker }
        </Map>
      </div>
    </div>
  );
}
