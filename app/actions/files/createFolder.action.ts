'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import uniqId from 'generate-unique-id';

export async function createFolder(groupId: any, path: any, name: any) {
  try {
    const id = uniqId();
    await prisma.content.create({
      data: {
        content_id: id,
        group_id: groupId,
        url: name,
        path: `/${path}`,
        content_name: name,
        content_type: 'folder',
        content_mimetype: 'application/folder',
        uploaded: true,
      },
    });
    revalidatePath(`/dashboard/${groupId}/${path}`);
    return { message: 'Successfully created folder' };
  } catch (error) {
    return { message: 'Error creating folder' };
  }
}
