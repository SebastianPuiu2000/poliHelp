import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = await req.json();

  console.log(payload);

  const response = await fetch('http://backend:3000/dropoff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const params = new URL(req.url).searchParams;

  const lat = params.get('lat');
  const lng = params.get('lng');

  console.log(lat, ' ', lng);

  const response = await fetch(`http://backend:3000/dropoff?lat=${lat}&lng=${lng}`, {
    cache: 'no-cache'
  })

  const data = await response.json();

  console.log(data.dropoffs.length);

  return NextResponse.json(data);
}
