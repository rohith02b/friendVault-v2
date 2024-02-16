'use server';

import prisma from '@/lib/prisma';
import deleteBlob from '../files/deleteFile.action';

export async function deleteGroup(groupId: string) {
  try {
    const response = await prisma.content.findMany({
      where: {
        group_id: groupId,
      },
    });
    response.map(async (each: any) => {
      if (each.content_type === 'file') {
        await deleteBlob(each?.content_id);
      } else {
        await prisma.content.deleteMany({
          where: {
            content_id: each.id,
          },
        });
      }
    });

    await prisma.groups.delete({
      where: {
        id: groupId,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}
