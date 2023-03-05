'use client';

import { useCallback, useState } from 'react';
import { User, useUser } from '../UserContext';
import Map, { Point } from '../../components/Map';
import MapMarker from '../../components/MapMarker';
import googleMapReact from 'google-map-react';
import SupplyList from '../../components/SupplyList';
import { useRouter } from 'next/navigation';
import SupplyCreate from '../../components/SupplyCreate';
import RequestCreate from '../../components/RequestCreate';

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
    <div className='flex flex-row gap-6 h-16 justify-center items-center'>
      <button
        disabled={noSelection}
        className={`bg-mantis-600 text-mantis-50 rounded py-2 px-6 my-4 ${noSelection ? 'opacity-30' : ''} hover:underline`}
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

function makeDonation(user: User | null, dropoffId: string, reload: Function) {
  if (!user || user.role !== 'donate') return;

  const handleClick = async (supplies) => {
    const response = await fetch('/api/dropoff', {
      method: 'PUT',
      body: JSON.stringify({ id: dropoffId, token: user.token, supplies })
    });
    const data = await response.json();
    console.log(data);
    reload();
  };

  return (
    <div className='w-full flex flex-row gap-6 justify-center border-t border-mantis-300 pt-2 mt-2'>
      <SupplyCreate onClick={handleClick}/>
    </div>
  )
}

function makeRequest(user: User | null, dropoffId: string, center: Point | null, reload: Function) {
  if (!user || user.role !== 'needSupplies') return;

  const handleClick = async (supplies) => {
    const response = await fetch('/api/request', {
      method: 'POST',
      body: JSON.stringify({
        dropoffId: dropoffId,
        token: user.token,
        supplies,
        ...center
      })
    });
    const data = await response.json();
    console.log(data);
    reload();
  };

  return (
    <div className='flex flex-row gap-6 max-w-sm justify-center border-t border-mantis-300 pt-2 mt-2'>
      <RequestCreate onClick={handleClick}/>
    </div>
  )
}

export default function Dropoffs() {
  const user = useUser();
  const router = useRouter();

  const [markers, setMarkers] = useState<any>([]);

  const [selected, setSelected] = useState<Point | null>(null);
  const [center, setCenter] = useState<Point | null>(null);

  const onCenter = useCallback(async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setCenter({ lat, lng });
    await fetchDropoffPoints({ lat, lng }, setMarkers);
  }, [setMarkers]);

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
      color={'mantis-400'}
      onClick={() => setSelected(null)}
    /> : '';

  let deliverRequests = (user, marker, router) => {
    if (marker.requests.length === 0) return;

    const deliverButton = (id) => (user && user.role === 'delivery'
      ? <button
        className='w-full flex flex-row justify-center text-xl text-mahogany-500'
        onClick={() => router.push(`/deliver/${id}`)}
      >
        Deliver
      </button>
      : '');

    return (
      <div className='border-t border-mantis-300 pt-2 mt-2'>
        {
          marker.requests.map(request =>
            <div key={request._id}>
              <SupplyList supplies={request.supplies} request/>
              { deliverButton(request._id) }
            </div>
          )
        }
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-around">
      {
        user && user.role === 'delivery'
          ? deliveryButtons(user, selected, reload)
          : <div className='h-16'></div>
      }
      <div className="w-full h-full">
        <Map center={'onDevice'} onCenter={onCenter} onClick={handleClick}>
          {
            markers.map(marker =>
              <MapMarker
                key={marker.id}
                lat={marker.point.lat}
                lng={marker.point.lng}
                color={'mantis-600'}
              >
                <span className='flex justify-center text-mantis-900 text-lg text-center w-full'>
                  Dropoff
                </span>
                <SupplyList supplies={marker.supplies} request={false}/>
                { deliverRequests(user, marker, router) }
                { makeDonation(user, marker.id, reload) }
                { makeRequest(user, marker.id, center, reload) }
              </MapMarker>
            )
          }
          { selectedMarker }
        </Map>
      </div>
    </div>
  );
}
