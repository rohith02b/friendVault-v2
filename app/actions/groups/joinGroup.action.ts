'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

export async function joinGroup(data: any) {
  'use server';
  let code: string = data.code;
  const group = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (group) {
    const session = await getServerSession();

    if (group.members.includes(session?.user?.email || '')) {
      return { message: 'You are a member of the group', status: 404 };
    }

    await prisma.groups.update({
      where: {
        code: code,
      },
      data: {
        members: {
          push: session?.user?.email || '',
        },
      },
    });
  } else {
    return { message: 'Group does not exist', status: 404 };
  }

  revalidatePath('/dashboard');
  return { message: 'Successfully joined Group', status: 200 };
}
