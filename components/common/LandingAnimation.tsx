'use client';

import landingAnimation from '@/components/animations/landing.json';
import Lottie from 'lottie-react';
import React from 'react';

const LandingAnimation = () => {
  return (
    <Lottie className='md:w-2/3 mx-auto' animationData={landingAnimation} />
  );
};

export default LandingAnimation;
