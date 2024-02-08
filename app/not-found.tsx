import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import Heading3 from '@/components/ui/heading3';
import Link from 'next/link';
import React from 'react';
import LandingLayout from '@/components/layouts/LandingLayout';

export default async function NotFound() {
  let user = false;

  if (user) {
    return (
      <DashboardLayout>
        <div className='flex flex-col items-center justify-center h-[80vh] gap-6'>
          <Heading3 content='Erorr 404. Not found' />
          <div className='flex gap-6 items-center'>
            Go back{' '}
            <Link href='/'>
              <Button>Home</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <LandingLayout>
      <div className='flex flex-col items-center justify-center h-[80vh] gap-6'>
        <Heading3 content='Erorr 404. Not found' />
        <div className='flex gap-6 items-center'>
          Go back{' '}
          <Link href='/'>
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}
