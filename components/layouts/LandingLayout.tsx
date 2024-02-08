import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChangeTheme from '@/components/common/changeTheme';
import { getServerSession } from 'next-auth';

export default async function LandingLayout({ children }: any) {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <div className='px-6 md:max-w-6xl mx-auto'>
      <nav className='my-6  flex flex-col gap-6 md:flex-row md:gap-0 justify-center md:justify-between'>
        <p className='text-xl text-center'>FRIENDVAULT</p>
        <div className='flex gap-6 justify-center'>
          {user ? (
            <Link href='/dashboard'>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href='/api/auth/login'>
                <Button>Sign in</Button>
              </Link>
              <Link href='/api/auth/register'>
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <div>{children}</div>
      <footer>
        <div className='flex flex-col justify-center md:flex-row gap-6 md:gap-0 md:justify-between my-6'>
          <p className='text-center'>
            &copy; {new Date().getFullYear()} FriendVault. All Rights Reserved.
          </p>
          <ChangeTheme />
        </div>
      </footer>
    </div>
  );
}
