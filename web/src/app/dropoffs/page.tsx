'use client';

import { useState } from 'react';
import { User, useUser } from '../UserContext';
import Map, { Point } from '../../components/Map';
import MapMarker from '../../components/MapMarker';
import googleMapReact from 'google-map-react';
import SupplyList from '../../components/SupplyList';
import { useRouter } from 'next/navigation';

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

async function fetchDropoffPoints({ lat, lng }: Point, setMarkers: any) {
  const response = await fetch(`/api/dropoff?lat=${lat}&lng=${lng}`);
  const data= await response.json();
  if (data.success) {
    setMarkers(data.dropoffs.map(({ dropoff, requests }: any) => {
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
  const router = useRouter();

  const [markers, setMarkers] = useState<any>([]);

  const [selected, setSelected] = useState<Point | null>(null);
  const [center, setCenter] = useState<Point | null>(null);

  const onCenter = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setCenter({ lat, lng });
    await fetchDropoffPoints({ lat, lng }, setMarkers);
  };

  const handleClick = (ev: googleMapReact.ClickEventValue) => {
    if (!user || user.role !== 'delivery') return;

    setSelected({
      lat: ev.lat,
      lng: ev.lng
    });
  };

  const reload = async () => {
    if (center) {
      await fetchDropoffPoints(center, setMarkers);
    }
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

  let deliverRequests = (marker, router) => {
    /* if (!user || user.role !== 'deliver') return ''; */

    return (
      <div className='border-t border-slate-300 pt-2 mt-2'>
        {
          marker.requests.map(request =>
            <>
              <SupplyList supplies={request.supplies} request key={request._id}/>
              <button
                className='w-full flex flex-row justify-center text-xl text-red-500'
                onClick={() => router.push(`/deliver/${request._id}`)}
              >
                Deliver
              </button>
            </>
          )
        }
      </div>
    );
  };

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
                <span className='flex justify-center text-slate-900 text-lg text-center w-full'>
                  Dropoff
                </span>
                <SupplyList supplies={marker.supplies} />
                { deliverRequests(marker, router) }
              </MapMarker>
            )
          }
          { selectedMarker }
        </Map>
      </div>
    </div>
  );
}
