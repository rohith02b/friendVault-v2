import * as React from 'react';
import MainLayout from '@/components/layouts/LandingLayout';
import LandingAnimation from '@/components/common/LandingAnimation';

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
        <LandingAnimation />
      </div>
    </MainLayout>
  );
};

export default Index;
