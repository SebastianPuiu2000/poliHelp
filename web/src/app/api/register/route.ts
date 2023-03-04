import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = await req.json();

  console.log(payload);

  const response = await fetch('http://backend:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}
