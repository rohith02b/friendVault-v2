import CustomCard from '@/components/common/CustomCard';
import NoGroups from '@/components/common/NoGroups';
import Heading3 from '@/components/ui/heading3';
import prisma from '@/lib/prisma';
import { Content } from '@/types/Content';
import React from 'react';
import CreateFolder from '@/components/group/createFolder';

const Folders = async ({ groupId, path }: any) => {
  const folders = await prisma.content.findMany({
    where: {
      group_id: groupId,
      path: `/${path}`,
      content_type: 'folder',
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
        <Heading3 content={'Folders'} />

        <div className='flex gap-6'>
          <CreateFolder groupId={groupId} path={path} />
        </div>
      </div>

      <>
        {folders && folders.length ? (
          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
            {folders.map((file: Content) => (
              <div className='mt-5' key={file.content_id}>
                <CustomCard content_type='folder' content={file} />
              </div>
            ))}
          </div>
        ) : (
          <NoGroups />
        )}
      </>
    </div>
  );
};

export default Folders;
