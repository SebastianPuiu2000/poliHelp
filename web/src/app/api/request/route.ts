import { NextRequest, NextResponse } from 'next/server';

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
