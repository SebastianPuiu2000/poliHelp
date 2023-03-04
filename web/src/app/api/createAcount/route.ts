import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = req.body;

  console.log(payload);

  const response = await fetch('http://backend:3000/user', {
    method: 'POST',
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

  const response = await fetch(`http://backend:3000/user?lat=${lat}&lng=${lng}`)

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}

