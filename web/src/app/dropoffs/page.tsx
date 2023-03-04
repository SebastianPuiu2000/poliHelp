'use client';

import Map from '../../components/Map';
import { useUser } from '../UserContext';

export default function Dropoffs() {
  const user = useUser();

  const markers = [
    {
      point: { lat: 49.09, lng: 29.31 },
      color: 'blue-500',
      text: 'dropoff'
    }
  ];

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-3/4">
        <Map center={'onDevice'} markers={markers} />
      </div>
      {
        user?.type === 'delivery' ??
          <button>create dropoff</button>
      }
    </div>
  );
}
