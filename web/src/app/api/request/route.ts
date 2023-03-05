import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = await req.json();

  console.log(payload);

  const response = await fetch(`http://backend:3000/request`, {
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
  const id = params.get('id');

  const response = await fetch(`http://backend:3000/request?id=${id}`, {
    cache: 'no-cache'
  })

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}
