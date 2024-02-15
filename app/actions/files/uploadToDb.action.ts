'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function UpdateContent(data: any) {
  try {
    await prisma.content.create({
      data: data,
    });
    revalidatePath(`/dashboard/${data.groupId}/${data.path}`);
    return { message: 'Updated' };
  } catch (error) {
    return { message: error };
  }
}
