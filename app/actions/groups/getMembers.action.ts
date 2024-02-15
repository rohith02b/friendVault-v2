'use server';

import prisma from '@/lib/prisma';

export async function getMembers(groupId: string) {
  try {
    const response = await prisma.groups.findUnique({
      where: {
        id: groupId,
      },
      select: {
        id: false,
        owner: false,
        code: false,
        name: false,
        members: true,
      },
    });

    const membersInTheGroup = response?.members;
    if (response) {
      const membersArr: any = [];
      membersInTheGroup?.map(async (member: any) => {
        let each = await prisma.users.findUnique({
          where: {
            email: member || '',
          },
        });
        membersArr.push({
          name: each?.name,
          image: each?.image,
        });
      });

      return membersArr;
    }
  } catch (error) {
    return []; // Return an empty array in case of error
  }
}
