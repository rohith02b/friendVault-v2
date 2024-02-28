'use server';

import prisma from '@/lib/prisma';
import { BlobServiceClient } from '@azure/storage-blob';
import { revalidatePath } from 'next/cache';

export async function deleteGroup(groupId: string) {
  try {
    const connectionString = process.env.CONNECTION_STRING;
    const response = await prisma.groups.findFirst({
      where: {
        id: groupId,
      },
    });

    // group exists
    if (response && connectionString) {
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient(response.id);

      // delete container
      await containerClient.delete().catch((error) => {
        console.log(error);
        // If container does not exist
        return false;
      });

      // Successfull Delete of container then proceed to delete in DB
      await prisma.groups.delete({
        where: {
          id: groupId,
        },
      });

      revalidatePath('/dashboard');
      return true;
    }
    // Group does not exist
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
