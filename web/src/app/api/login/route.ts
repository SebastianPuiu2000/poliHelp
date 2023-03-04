import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = req.body;

  console.log(payload);

  const response = await fetch('http://backend:3000/user/auth', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}
