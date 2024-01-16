'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import prisma from '@/lib/dbConnect';
import CreateGroup from '@/components/dashboard/CreateGroup';
import JoinGroup from '@/components/dashboard/JoinGroup';
import GroupCard from '@/components/dashboard/GroupCard';

export default async function Groups() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const groups = await prisma.groups.findMany({
    where: {
      members: {
        has: user?.id,
      },
    },
  });

  await prisma.$disconnect();

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Groups
        </h3>
        <div className='flex gap-6'>
          <CreateGroup />
          <JoinGroup groups={groups} />
        </div>
      </div>
      {groups.length ? (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
          {groups?.map((each: any) => {
            return (
              <div className='mt-5' key={each.id}>
                <GroupCard Group={each} />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
