'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Heading3 from '../ui/heading3';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IconUserCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getMembers } from '@/app/actions';

export function ViewMembers({ groupId }: any) {
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    const fetchMembers = async () => {
      await getMembers(groupId)
        .then((response: any) => {
          setMembers(response);
        })
        .catch((error: any) => {
          console.error(error);
        });
    };

    fetchMembers();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='default'>View Members</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>All members present in the group</SheetTitle>
          <SheetDescription>
            Only admins can add or remove members
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          {members?.map((member: any) => {
            return (
              <div
                key={member.name}
                className='flex flex-row gap-3 items-center mt-3'
              >
                <Avatar>
                  <AvatarImage src={member.image} />
                  <AvatarFallback>
                    <IconUserCircle
                      width={32}
                      height={32}
                      stroke={1}
                      className='rounded-full cursor-pointer'
                    />
                  </AvatarFallback>
                </Avatar>
                <Heading3 content={member.name} />
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ViewMembers;
