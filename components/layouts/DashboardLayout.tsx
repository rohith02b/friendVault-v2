import Link from 'next/link';
import ChangeTheme from '../common/changeTheme';
import { Toaster } from 'sonner';
import { Button } from '../ui/button';
import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function DashboardLayout({ children }: any) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <div className='flex flex-col'>
        <div className='w-full xl:max-w-[1500px] mx-auto px-6'>
          <div className='my-6 flex flex-row gap-6  gap-0 justify-between'>
            <div className='flex gap-4 items-center'>
              <Image
                src={user?.picture || ''}
                width={32}
                height={32}
                alt={user?.given_name || ''}
                className='rounded-full cursor-pointer'
              />
              <div>{user?.given_name}</div>
            </div>
            <Link href='/api/auth/logout' className='mx-0'>
              <Button>Logout</Button>
            </Link>
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
        </div>

        <Toaster />
      </div>
    </div>
  );
}
