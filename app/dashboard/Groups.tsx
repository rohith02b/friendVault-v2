import CreateGroup from '@/components/dashboard/CreateGroup';
import JoinGroup from '@/components/dashboard/JoinGroup';
import GroupCard from '@/components/common/CustomCard';
import NoGroups from '@/components/dashboard/NoGroups';
import { Groups } from '@/types/Groups';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/lib/prisma';

export default async function Groups() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const groups: Groups[] = await prisma.groups.findMany({
    where: {
      members: {
        has: user?.id || '',
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

      {groups && groups.length ? (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
          {groups.map((group: Groups) => (
            <div className='mt-5' key={group.id}>
              <GroupCard content_type='group' content={group} />
            </div>
          ))}
        </div>
      ) : (
        <NoGroups />
      )}
    </div>
  );
}
