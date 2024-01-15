'use client';

import * as React from 'react';
import Lottie from 'lottie-react';
import landingAnimation from '@/components/animations/landing.json';
import MainLayout from '@/components/layouts/LandingLayout';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  return (
    <MainLayout>
      <div className=' text-center'>
        <p className='text-3xl md:text-5xl  mt-24 '>
          Shared Secure Memories with Friend Vault
        </p>
        <p className='mt-6 text-md md:w-2/3 mx-auto '>
          Safely store, share, and cherish memories with friends. Encrypted,
          seamless file storage for your collective experiences and moments.
        </p>

        <Lottie className='md:w-2/3 mx-auto' animationData={landingAnimation} />
      </div>
    </MainLayout>
  );
};

export default Index;
