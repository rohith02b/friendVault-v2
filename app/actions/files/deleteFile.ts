'use server';
import { BlobServiceClient } from '@azure/storage-blob';

// Function to delete a blob
const deleteBlob = async (blobName: string) => {
  try {
    const connectionString = process.env.connection_string;
    const containerName = process.env.container;
    if (connectionString && containerName) {
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(blobName);

      const response = await blobClient.deleteIfExists();
      if (response.succeeded) {
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
