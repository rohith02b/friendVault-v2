import React, { useEffect } from 'react';
import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  IconCloudDownload,
  IconHome,
  IconSettings,
  IconStar,
} from '@tabler/icons-react';
import { MobileSidebar } from './mobileSidebar';

const pages = [
  {
    name: 'Home',
    icon: IconHome,
  },
  {
    name: 'Starred',
    icon: IconStar,
  },
  {
    name: 'Settings',
    icon: IconSettings,
  },
];

export default function Sidebar() {
  const { user } = useKindeBrowserClient();
  return (
    <>
      {/* Desktop sidebar */}
      <div className='hidden lg:flex flex-col h-screen fixed pl-6'>
        <div className='mt-12 mx-auto'>
          <IconCloudDownload width={150} height={150} stroke={1} />
        </div>
        <div className='mt-12 '>
          {pages.map((each: any, idx: number) => {
            const Icon = each.icon;
            return (
              <Link href='#' key={idx}>
                <Button
                  variant='ghost'
                  className='w-[10vw] flex justify-around mt-6'
                >
                  <Icon width={24} height={24} stroke={1} />
                  {each.name}
                </Button>
              </Link>
            );
          })}
        </div>

        <Link href='/api/auth/logout' className=' absolute bottom-12'>
          <Button variant='ghost' className='w-[10vw] '>
            <Image
              src={user?.picture || ''}
              alt={user?.given_name || 'profile picture'}
              width={24}
              height={24}
              className='rounded-full mr-5'
            />
            Logout
          </Button>
        </Link>
      </div>

      {/* mobile sidebar */}
      <div className='flex justify-between items-center lg:hidden mt-4'>
        <MobileSidebar pages={pages} />
        <div>FRIENDVAULT</div>
      </div>
    </>
  );
}
