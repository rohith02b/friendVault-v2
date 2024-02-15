'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import uniqId from 'generate-unique-id';
import { getServerSession } from 'next-auth';

export async function createGroup(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  'use server';
  let name: any = formData.get('name');
  let code: any = formData.get('code');

  code = code?.toString();
  name = name?.toString();
  const codeExists = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (codeExists) {
    return { message: 'Code already exists.' };
  }

  const id = uniqId();
  const session = await getServerSession();

  await prisma.groups.create({
    data: {
      id,
      owner: session?.user?.email || '',
      code: code,
      name: name,
      members: [session?.user?.email || ''],
    },
  });

  revalidatePath('/dashboard');
  return { message: 'Successfully created Group' };
}
