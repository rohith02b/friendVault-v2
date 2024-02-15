'use client';

import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconUserCircle } from '@tabler/icons-react';
import Settings from './Settings';

export function ProfileIcon({ user }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Account settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Settings user={user} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileIcon;
