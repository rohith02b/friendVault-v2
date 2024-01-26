'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import uniqId from 'generate-unique-id';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';
import { Content } from '@/types/Content';

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
  // Need to check if a group with the code already exists
  const codeExists = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (codeExists) {
    await prisma.$disconnect();
    return { message: 'Code already exists.' };
  }

  const id = uniqId();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  await prisma.groups.create({
    data: {
      id,
      owner: user?.id || '',
      code: code,
      name: name,
      members: [user?.id || ''],
    },
  });

  revalidatePath('/dashboard');
  return { message: 'Successfully created Group' };
}

export async function joinGroup(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  'use server';
  let code: any = formData.get('code');
  code = code?.toString();
  const group = await prisma.groups.findUnique({
    where: {
      code: code,
    },
  });

  if (group) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (group.members.includes(user?.id || '')) {
      return { message: 'You are a member of the group' };
    }

    await prisma.groups.update({
      where: {
        code: code,
      },
      data: {
        members: {
          push: user?.id,
        },
      },
    });
  } else {
    await prisma.$disconnect();
    return { message: 'Group does not exist' };
  }

  revalidatePath('/dashboard');
  return { message: 'Successfully joined Group' };
}

export async function getUrl(
  prevState: { message: string },
  formData: FormData
) {
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
    const containerClient = blobServiceClient.getContainerClient(container);
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getMinutes() + 10);

    const sasOptions: any = {
      startsOn: new Date(),
      expiresOn: expiryTime,
      permissions: BlobSASPermissions.parse('w'),
    };

    const sasToken = await containerClient.generateSasUrl(sasOptions);
    return { message: sasToken };
  } catch (error) {
    return { messagge: error };
  }
}

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
