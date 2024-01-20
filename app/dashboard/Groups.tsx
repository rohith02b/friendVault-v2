'use client';

import React, { useEffect, useState } from 'react';
import CreateGroup from '@/components/dashboard/CreateGroup';
import JoinGroup from '@/components/dashboard/JoinGroup';
import GroupCard from '@/components/common/CustomCard';
import NoGroups from '@/components/dashboard/NoGroups';
import axios from 'axios';
import { renderSkeletons } from '@/components/common/skeletonCard';
import { Groups } from '@/types/Groups';

export default function Groups() {
  const [groups, setGroups] = useState<Groups[]>();
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      const response: any = await axios.get('/api/groups');
      setGroups(response?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Groups
        </h3>
        <div className='flex gap-6'>
          <CreateGroup fetchGroups={fetchGroups} />
          <JoinGroup fetchGroups={fetchGroups} groups={groups} />
        </div>
      </div>
      {loading ? (
        <div className='mx-auto mt-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
            {renderSkeletons()}
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
