import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { IconCloudDownload, IconMenu } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

export function MobileSidebar({ pages }: any) {
  const { user } = useKindeBrowserClient();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <IconMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle className='mx-auto mt-5'>
            <IconCloudDownload width={150} height={150} stroke={1} />
          </SheetTitle>
        </SheetHeader>
        <div className='mx-auto mt-12'>
          {pages.map((each: any, idx: number) => {
            const Icon = each.icon;
            return (
              <Link href='#' key={idx}>
                <Button
                  variant='ghost'
                  className='w-full flex justify-center mt-6 '
                >
                  <Icon width={24} height={24} stroke={1} className='mr-6' />
                  {each.name}
                </Button>
              </Link>
            );
          })}
        </div>
        <Link href='/api/auth/logout'>
          <Button
            variant='ghost'
            className='w-full left-0  absolute bottom-12 mt-6 '
          >
            <Image
              src={user?.picture || ''}
              alt={user?.given_name || ''}
              width={24}
              height={24}
              className='mr-6 rounded-full'
            />
            Logout
          </Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
