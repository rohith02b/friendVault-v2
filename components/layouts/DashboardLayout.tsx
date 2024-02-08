import Link from 'next/link';
import ChangeTheme from '../common/changeTheme';
import { Toaster } from '../ui/sonner';
import { Button } from '../ui/button';
import Image from 'next/image';
import { IconUserCircle } from '@tabler/icons-react';
import { getServerSession } from 'next-auth';
import LogoutButton from '../common/LogoutButton';

export default async function DashboardLayout({ children }: any) {
  const session = await getServerSession();
  const user = session?.user;

  console.log(user);

  return (
    <div>
      <div className='flex flex-col'>
        <div className='w-full xl:max-w-[1500px] mx-auto px-6'>
          <div className='my-6 flex flex-row gap-6  gap-0 justify-between'>
            <div className='flex gap-4 items-center'>
              {user?.image ? (
                <Image
                  src={user?.image || ''}
                  width={32}
                  height={32}
                  alt={user?.name || ''}
                  className='rounded-full cursor-pointer'
                />
              ) : (
                <IconUserCircle
                  width={32}
                  height={32}
                  stroke={1}
                  className='rounded-full cursor-pointer'
                />
              )}
              <div>{user?.name}</div>
            </div>
            <LogoutButton />
          </div>
        </div>
        <div className='w-full xl:max-w-[1500px] mx-auto px-6'>
          <div className='min-h-screen '>{children}</div>
          <footer className='mt-12'>
            <div className='flex flex-col justify-center xl:flex-row gap-6 xl:gap-0 xl:justify-between my-6'>
              <p className='text-center'>
                &copy; {new Date().getFullYear()} FriendVault. All Rights
                Reserved.
              </p>
              <ChangeTheme />
            </div>
          </footer>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
