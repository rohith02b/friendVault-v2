'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

export default function JoinGroup({ groups }: any) {
  const [open, setOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth > 768);
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.innerWidth > 768);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>Join Group</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Join group</DialogTitle>
            <DialogDescription>
              Join an existing group to share files with your group
            </DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} groups={groups} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Join Group</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Join Group</DrawerTitle>
          <DrawerDescription>
            Join an existing group to share files with your group
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm setOpen={setOpen} groups={groups} className='px-4' />

        <DrawerFooter className=''>
          <DrawerClose asChild></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, setOpen, groups }: any) {
  const [code, setCode] = React.useState('');

  const handleChange = (e: any) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let userInGroupCodeAlready = false;

    groups?.map((each: any) => {
      if (each.code === code) userInGroupCodeAlready = true;
    });

    if (userInGroupCodeAlready) {
      toast.error('You are already in this group');
      return;
    }

    axios
      .put('/api/groups/join', {
        code: code,
      })
      .then((response: any) => {
        toast.success(response?.data);
        setOpen(false);
      })
      .catch(() => {
        toast.error('The following code does not exist');
      });
  };
  return (
    <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={handleSubmit}
    >
      <div className='grid gap-2'>
        <Label htmlFor='Code'>Code</Label>
        <Input id='Code' value={code} onChange={handleChange} defaultValue='' />
      </div>
      <Button className='mt-2' type='submit'>
        Save{' '}
      </Button>
    </form>
  );
}
