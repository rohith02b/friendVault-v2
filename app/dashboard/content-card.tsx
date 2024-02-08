import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { Groups } from '@/types/Groups';

const ContentCard = async () => {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();

  let totalNumberOfFiles = 0;
  let user: any;

  const countFiles = async () => {
    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      ids.map(async (element) => {
        let result = await prisma.content.findMany({
          where: {
            group_id: element,
          },
        });

        totalNumberOfFiles += result?.length || 0;
      })
    );
  };

  const groups = await prisma.groups.findMany({
    where: {
      members: {
        has: user?.id || '',
      },
    },
    select: {
      id: true,
    },
  });

  let ids: string[] = [];

  groups.forEach((element: Groups) => {
    ids.push(element.id);
  });

  // Wait for countFiles to complete before proceeding
  await countFiles();

  return (
    <div className=' grid md:grid-cols-3 grid-cols-1 gap-12 my-12'>
      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent>{ids?.length}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent>{totalNumberOfFiles}</CardContent>
      </Card>
    </div>
  );
};

export default ContentCard;
