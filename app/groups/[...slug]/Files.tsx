import { Content } from '@/types/Content';
import React from 'react';
import { renderSkeletons } from '@/components/common/skeletonCard';
import ContentCard from '../../../components/common/CustomCard';
import NoGroups from '@/components/dashboard/NoGroups';
import prisma from '@/lib/prisma';
import Heading3 from '@/components/ui/heading3';

const Files = async ({ groupId, path }: any) => {
  const files = await prisma.content.findMany({
    where: {
      group_id: groupId || '',
      path: `/${path}`,
      content_type: 'file',
    },
    select: {
      content_id: true,
      group_id: true,
      url: false,
      path: true,
      content_name: true,
      content_type: true,
      content_mimetype: true,
      uploaded: true,
    },
  });

  return (
    <div className='mt-8'>
      <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between'>
        <Heading3 content={'Files'} />
        <div className='flex gap-6'>
          {/* <CreateGroup fetchGroups={fetchGroups} />
          <JoinGroup fetchGroups={fetchGroups} groups={groups} /> */}
        </div>
      </div>
      <div>
        {files && files.length ? (
          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
            {files.map((file: Content) => (
              <div className='mt-5' key={file.content_id}>
                <ContentCard content_type='file' content={file} />
              </div>
            ))}
          </div>
        ) : (
          <NoGroups />
        )}
      </div>
    </div>
  );
};

export default Files;
