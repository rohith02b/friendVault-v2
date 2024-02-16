'use server';
import prisma from '@/lib/prisma';
import { BlobServiceClient } from '@azure/storage-blob';
import { revalidatePath } from 'next/cache';

const deleteBlob = async (id: string) => {
  const blobDetails = await prisma.content.findUnique({
    where: {
      content_id: id,
    },
  });

  if (!blobDetails) {
    return false;
  }

  try {
    const connectionString = process.env.CONNECTION_STRING;
    const containerName = process.env.CONTAINER;
    if (connectionString && containerName) {
      let url = blobDetails.url.split('/');
      let blobName = url[url.length - 1];
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const path = blobDetails?.path === '/' ? '' : blobDetails?.path;
      const blobClient = containerClient.getBlobClient(
        `${blobDetails.group_id}${path}/${blobName}`
      );
      const response = await blobClient.deleteIfExists();
      if (response.succeeded) {
        await prisma.content.delete({
          where: {
            content_id: blobDetails.content_id,
          },
        });
        revalidatePath(`/groups/${blobDetails.group_id}/${blobDetails?.path}`);
        return true;
      } else {
        return false;
      }
    }
  } catch (error: any) {
    return false;
  }
};

export default deleteBlob;
