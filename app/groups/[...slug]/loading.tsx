import DashboardLayout from '@/components/layouts/DashboardLayout';
import Heading3 from '@/components/ui/heading3';
import React from 'react';
import { renderSkeletons } from '@/components/common/skeletonCard';

const loading = () => {
  return (
    <DashboardLayout>
      <div className='mt-8'>
        <Heading3 content={'Folders'} />
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
          {renderSkeletons()}
        </div>
      </div>
      <div className='mt-8'>
        <Heading3 content={'Files'} />
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12'>
          {renderSkeletons()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default loading;
