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
