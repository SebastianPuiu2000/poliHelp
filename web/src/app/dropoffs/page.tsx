'use client';

import Map from '../../components/Map';

export default function Dropoffs() {
  return (
    <div>
      <Map center={{ lat: 1, lon: 1}} markers={[]}/>
    </div>
  );
}
