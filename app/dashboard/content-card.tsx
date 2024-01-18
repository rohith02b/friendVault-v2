import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/dbConnect';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const ContentCard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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

  groups.forEach((element) => {
    ids.push(element.id);
  });

  let totalNumberOfFiles = 0;

  ids.forEach(async (element: string) => {
    let result = await prisma.content.findMany({
      where: {
        group_id: element,
      },
    });

    totalNumberOfFiles += result?.length;
  });

  await prisma.$disconnect();

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
