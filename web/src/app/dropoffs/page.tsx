'use client';

import { useState } from 'react';
import { useUser } from '../UserContext';
import Map, { Marker } from '../../components/Map';
import MapMarker from '../../components/MapMarker';

export default function Dropoffs() {
  const user = useUser();
  const [markers, setMarkers] = useState<Marker[]>([]);

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

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} onCenter={onCenter}>
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
        </Map>
      </div>
      {
        user?.type === 'delivery' ??
          <button>create dropoff</button>
      }
    </div>
  );
}
