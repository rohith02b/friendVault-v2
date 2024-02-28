'use server';

const { BlobServiceClient } = require('@azure/storage-blob');
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import uniqId from 'generate-unique-id';
import { getServerSession } from 'next-auth';

async function createContainerWithId(containerId: string) {
  const connectionString = process.env.CONNECTION_STRING;

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerName = containerId.toString();
  const containerClient = blobServiceClient.getContainerClient(containerName);

  try {
    await containerClient.create();
    return containerName;
  } catch (error) {
    console.error(`Error creating container "${containerName}":`, error);
    throw error; // Re-throwing the error to be caught by the caller
  }
}

export async function createGroup(
  prevState: {
    message: string;
  },
  formData: FormData
) {
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

  try {
    // Create a container with the generated ID
    const containerName = await createContainerWithId(id);

    // Perform Prisma operation to create group
    await prisma.groups.create({
      data: {
        id,
        owner: session?.user?.email || '',
        code: code,
        name: name,
        members: [session?.user?.email || ''],
      },
    });

    // Optionally, trigger cache revalidation or any other necessary operations
    revalidatePath('/dashboard');

    return { message: 'Successfully created Group', containerName };
  } catch (error) {
    console.error('Error creating group:', error);
    return { message: 'Error creating group', error };
  }
}
