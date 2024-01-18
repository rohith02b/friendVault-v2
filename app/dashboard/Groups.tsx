'use client';

import React, { useEffect, useState } from 'react';
import CreateGroup from '@/components/dashboard/CreateGroup';
import JoinGroup from '@/components/dashboard/JoinGroup';
import GroupCard from '@/components/dashboard/GroupCard';
import NoGroups from '@/components/dashboard/NoGroups';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups');
      setGroups(response?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const renderSkeletons = () => {
    return [1, 2, 3].map((each) => (
      <div key={each}>
        <Skeleton className='h-32' />
      </div>
    ));
  };

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
          {groups.length ? (
            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
              {groups.map((group: any) => (
                <div className='mt-5' key={group.id}>
                  <GroupCard Group={group} />
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
