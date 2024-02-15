import { Bell } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-80'>
        <DropdownMenuLabel>Requests</DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;
