import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = await req.json();

  console.log(payload);

  const response = await fetch('http://backend:3000/shelter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  const response = await fetch(`http://backend:3000/shelter`, {
    cache: 'no-cache'
  });

  const data = await response.json();

  console.log(data.availableShelters.length);

  return NextResponse.json(data);
};

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const payload = await req.json();

  console.log(payload);

  const params = new URL(req.url).searchParams;

  const shelterId = params.get('id');

  const response = await fetch(`http://backend:3000/shelter?id=${shelterId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload),
    cache: 'no-cache'
  });

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
};
