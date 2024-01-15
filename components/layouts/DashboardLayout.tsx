'use client';

import SideBar from '../common/SideBar';
import ChangeTheme from '../common/changeTheme';

export default function DashboardLayout({ children }: any) {
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='lg:w-[15vw] px-8 lg:px-0'>
        <SideBar />
      </div>
      <div className='w-full lg:w-[85vw] px-8 lg:px-24'>
        <div className='min-h-screen'>{children}</div>
        <footer>
          <div className='flex flex-col justify-center lg:flex-row gap-6 lg:gap-0 lg:justify-between my-6'>
            <p className='text-center'>
              &copy; {new Date().getFullYear()} FriendVault. All Rights
              Reserved.
            </p>
            <ChangeTheme />
          </div>
        </footer>
      </div>
    </div>
  );
}
