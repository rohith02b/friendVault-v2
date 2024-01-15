'use server';

import prisma from '@/lib/dbConnect';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function PUT(request: Request) {
  const { code } = await request.json();
  const group = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (group) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    await prisma.groups.update({
      where: {
        code: code,
      },
      data: {
        members: {
          push: user?.id,
        },
      },
    });
  } else {
    await prisma.$disconnect();
    return new Response('Group does not exist', { status: 404 });
  }

  await prisma.$disconnect();
  return new Response('Joined successfully');
}
