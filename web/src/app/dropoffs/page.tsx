'use client';

import { useState } from 'react';
import { User, useUser } from '../UserContext';
import Map, { Marker, Point } from '../../components/Map';
import MapMarker from '../../components/MapMarker';
import googleMapReact from 'google-map-react';

function deliveryButtons(user: User, selected: Point | null) {
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

    const data = await response.json();

    console.log(data);
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

export default function Dropoffs() {
  const user = useUser();
  const [markers, setMarkers] = useState<Marker[]>([]);

  const [selected, setSelected] = useState<Point | null>(null);

  const onCenter = async (position) => {
    setTimeout(() => {
      setMarkers([
        {
          point: { lat: 49.09, lng: 29.31 },
          color: 'blue-500',
          text: 'dropoff'
        }
      ]);
    }, 1000)
  };

  const handleClick = (ev: googleMapReact.ClickEventValue) => {
    setSelected({
      lat: ev.lat,
      lng: ev.lng
    });
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
      {deliveryButtons(user, selected)}
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} onCenter={onCenter} onClick={handleClick}>
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
          { selectedMarker }
        </Map>
      </div>
    </div>
  );
}
