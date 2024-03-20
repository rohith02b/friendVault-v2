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
import { getMembers } from '@/app/actions/groups/getMembers.action';
import ConfirmDeleteModal from '../common/ConfirmDeleteModal';
import { getSession } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';
import { deleteGroup } from '@/app/actions/groups/deleteGroup.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ViewMembers({ groupId }: any) {
  const [members, setMembers] = useState<any>();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response: any = await getMembers(groupId);
          console.log(response);
          setMembers(response?.members);
          setIsAdmin(session.user?.email === response?.owner);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  const handleConfirmDelete = async () => {
    await deleteGroup(groupId).then((response: any) => {
      if (response) {
        router.push('/dashboard');
        toast.success('Deleted Group');
      } else {
        toast.error('Could not delete the group');
      }
    });
  };

  return (
    <>
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
          <div className='flex flex-col gap-4 py-4 max-h-[70vh]'>
            {loading
              ? [1, 2, 3].map((each: number) => {
                  return (
                    <div
                      key={each}
                      className='flex flex-row gap-3 items-center mt-3'
                    >
                      <Skeleton className='w-8 h-8 rounded-full' />
                      <Skeleton className='w-64 h-6 rounded-md' />
                    </div>
                  );
                })
              : members?.map((member: any) => {
                  return (
                    <div
                      key={member.image}
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
          {isAdmin && (
            <div className='mt-12 text-center'>
              <ConfirmDeleteModal handleConfirmDelete={handleConfirmDelete} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ViewMembers;
