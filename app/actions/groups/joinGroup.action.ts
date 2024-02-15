'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

export async function joinGroup(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  'use server';
  let code: any = formData.get('code');
  code = code?.toString();
  const group = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (group) {
    const session = await getServerSession();

    if (group.members.includes(session?.user?.email || '')) {
      return { message: 'You are a member of the group' };
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
    return { message: 'Group does not exist' };
  }

  revalidatePath('/dashboard');
  return { message: 'Successfully joined Group' };
}
