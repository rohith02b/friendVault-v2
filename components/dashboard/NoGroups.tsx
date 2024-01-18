'use client';

import Lottie from 'lottie-react';
import React from 'react';
import animation from '../animations/no-group.json';

const NoGroups = () => {
  return (
    <div className='mt-12 sm:mt-24 lg:mt-0 mb-6 mx-auto'>
      <Lottie animationData={animation} className='md:w-1/2 mx-auto' />
    </div>
  );
};

export default NoGroups;
