'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import uniqId from 'generate-unique-id';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';

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
  let user: any;

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
    let user: any;

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
