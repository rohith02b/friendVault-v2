'use server';

import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import uniqId from 'generate-unique-id';

export async function POST(request: Request) {
  const { name, code } = await request.json();

  // Need to check if a group with the code already exists
  const codeExists = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (codeExists) {
    await prisma.$disconnect();
    return new Response('Code alrerady exists', { status: 409 });
  }

  const id = uniqId();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  await prisma.groups.create({
    data: {
      id,
      owner: user?.id || '',
      code: code,
      name: name,
      members: [user?.id || ''],
    },
  });
  await prisma.$disconnect();
  return new Response('Created successfully');
}
