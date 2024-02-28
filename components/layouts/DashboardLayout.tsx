import Link from 'next/link';
import ChangeTheme from '../common/changeTheme';
import { Toaster } from '../ui/sonner';
import { Button } from '../ui/button';
import Image from 'next/image';
import { IconUserCircle } from '@tabler/icons-react';
import { getServerSession } from 'next-auth';
import LogoutButton from '../common/LogoutButton';
import ViewMembers from '../group/ViewMembers';
import ProfileIcon from '../dashboard/ProfileIcon';
import Notifications from '../dashboard/Notifications';

export default async function DashboardLayout({
  option,
  groupId,
  children,
}: any) {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <div>
      <div className='flex flex-col'>
        <div className='w-full xl:max-w-[1500px] mx-auto px-6'>
          <div className='my-6 flex flex-row gap-6  gap-0 justify-between'>
            <div className='flex gap-4 items-center'>
              <ProfileIcon user={user} />
              <div>{user?.name}</div>
            </div>
            {option === 'logout' ? (
              <div className='flex flex-row gap-8 items-center'>
                {/* <Notifications /> */}
                <LogoutButton />
              </div>
            ) : (
              <ViewMembers groupId={groupId} />
            )}
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
