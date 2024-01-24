import { renderSkeletons } from '@/components/common/skeletonCard';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Heading3 from '@/components/ui/heading3';
import React from 'react';

const loading = () => {
  return (
    <DashboardLayout>
      <div className='mt-6'>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-12 my-12'>
          {renderSkeletons()}
        </div>
      </div>
      <div className='mt-5'>
        <Heading3 content='Groups' />
      </div>
      <div className='mt-6'>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
          {renderSkeletons()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default loading;
