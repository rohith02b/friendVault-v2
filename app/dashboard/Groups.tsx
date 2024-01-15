'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import prisma from '@/lib/dbConnect';
import CreateGroup from '@/components/dashboard/CreateGroup';
import JoinGroup from '@/components/dashboard/JoinGroup';

export default async function Groups() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const groups = await prisma.groups.findMany({
    // where: {
    //   members: {
    //     has: user?.id,
    //   },
    // },
  });

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Groups
        </h3>
        <div className='flex gap-6'>
          <CreateGroup />
          <JoinGroup />
        </div>
      </div>
      {groups.length ? (
        <>
          {groups?.map((each: any) => {
            return <div className='mt-5' key={each.id}></div>;
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
