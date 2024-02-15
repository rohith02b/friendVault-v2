'use server';

import prisma from '@/lib/prisma';
import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';

export async function downloadBlob(id: string) {
  const data = await prisma.content.findUnique({
    where: {
      content_id: id,
    },
  });
  try {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
      throw 'Could not generate SAS token';
    }
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const container = process.env.CONTAINER;
    if (!container) {
      throw 'Could not generate SAS token';
    }

    let url: any = data?.url.split('/');
    let fileName: any = url[url.length - 1];
    let decodedFileName = decodeURIComponent(fileName);

    const containerClient = blobServiceClient.getContainerClient(container);
    const startTime = new Date();
    const expiryTime = new Date(startTime.getTime() + 10 * 60 * 1000); // 10 minutes in milliseconds

    const sasOptions: any = {
      startsOn: startTime,
      expiresOn: expiryTime,
      permissions: BlobSASPermissions.parse('r'),
    };

    const filePath = `${data?.group_id}${
      data?.path === '/' ? '' : data?.path
    }/${decodedFileName}`;
    const blobClient = containerClient.getBlobClient(filePath);
    const sasToken = await blobClient.generateSasUrl(sasOptions);
    return { message: sasToken };
  } catch (error) {
    return { message: error }; // Fix the property name here
  }
}
