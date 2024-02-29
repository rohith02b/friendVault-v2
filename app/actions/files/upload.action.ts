'use server';

import prisma from '@/lib/prisma';
import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';

export async function getUrl(groupId: string) {
  try {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
      throw 'Could not generate SAS token';
    }
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const container = groupId;
    if (!container) {
      throw 'Could not generate SAS token';
    }
    const containerClient = blobServiceClient.getContainerClient(container);
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 10);

    const sasOptions: any = {
      startsOn: new Date(),
      expiresOn: expiryTime,
      permissions: BlobSASPermissions.parse('w'),
    };

    const sasToken = await containerClient.generateSasUrl(sasOptions);
    return sasToken;
  } catch (error) {
    console.log(error);
    return error;
  }
}
