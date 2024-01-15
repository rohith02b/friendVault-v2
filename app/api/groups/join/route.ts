'use server';

export async function PUT(request: Request) {
  const { code } = await request.json();
  return new Response('Joined successfully');
}
