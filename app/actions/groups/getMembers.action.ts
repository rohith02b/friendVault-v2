'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMembers(groupId: string) {
  try {
    const response = await prisma.groups.findFirst({
      where: {
        id: groupId,
      },
      select: {
        owner: true,
        members: true,
      },
    });

    const membersInTheGroup = response?.members;
    if (response && membersInTheGroup) {
      // Using Promise.all() to wait for all member queries to resolve
      const membersArr = await Promise.all(
        membersInTheGroup.map(async (member: string) => {
          const each = await prisma.users.findUnique({
            where: {
              email: member,
            },
            select: {
              name: true,
              image: true,
            },
          });
          return {
            name: each?.name,
            image: each?.image,
          };
        })
      );

      return { members: membersArr, owner: response.owner };
    }
  } catch (error) {
    console.error('Error fetching members:', error);
    return []; // Return an empty array in case of error
  } finally {
  }
}
