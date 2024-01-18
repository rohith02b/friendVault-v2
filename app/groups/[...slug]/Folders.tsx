import React from 'react';

const Folders = () => {
  return (
    <div className='mt-8'>
      <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Folders
        </h3>
        <div className='flex gap-6'>
          {/* <CreateGroup fetchGroups={fetchGroups} />
          <JoinGroup fetchGroups={fetchGroups} groups={groups} /> */}
        </div>
      </div>
    </div>
  );
};

export default Folders;
