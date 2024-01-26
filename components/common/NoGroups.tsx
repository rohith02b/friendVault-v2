'use client';

import React from 'react';
import { IconZoomExclamation } from '@tabler/icons-react';
import Heading3 from '../ui/heading3';
import { Fade } from 'react-awesome-reveal';

const NoGroups = () => {
  return (
    <Fade cascade duration={1000} className='mt-12 ' triggerOnce>
      <IconZoomExclamation
        width={100}
        height={100}
        className='mx-auto '
        stroke={1}
      />
      <div className='flex justify-center'>
        <Heading3 content='No data found' />
      </div>
    </Fade>
  );
};

export default NoGroups;
