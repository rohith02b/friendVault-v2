'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import uniqId from 'generate-unique-id';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function createGroup(setopen: string, formData: FormData) {
  'use server';
  let name: any = formData.get('name');
  let code: any = formData.get('code');

  code = code?.toString();
  name = name?.toString();
  // Need to check if a group with the code already exists
  const codeExists = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (codeExists) {
    await prisma.$disconnect();
    return { message: 'Code already exists.' };
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

  revalidatePath('/dashboard');
  return { message: 'Successfully created Group' };
}
