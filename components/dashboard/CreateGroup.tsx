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
import { toast } from 'sonner';

export default function CreateGroup({ fetchGroups }: any) {
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
          <Button>Create Group</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create a Group</DialogTitle>
            <DialogDescription>
              Share files amongst your group.Remember the code to share it so
              your friends can join.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} fetchGroups={fetchGroups} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Create Group</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Create Group</DrawerTitle>
          <DrawerDescription>
            Share files amongst your group.Remember the code to share it so your
            friends can join.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className='px-4'
          setOpen={setOpen}
          fetchGroups={fetchGroups}
        />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, setOpen, fetchGroups }: any) {
  const [formData, setFormData] = React.useState({
    name: '',
    code: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('/api/groups/create', formData)
      .then((response: any) => {
        toast.success(response?.data);
        setOpen(false);
        fetchGroups();
      })
      .catch(() => {
        toast.error('An error occurred');
      });
  };

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={handleSubmit}
    >
      <div className='grid gap-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='code'>Code</Label>
        <Input
          type='text'
          id='code'
          name='code'
          value={formData.code}
          onChange={handleChange}
        />
      </div>
      <Button type='submit'>Save changes</Button>
    </form>
  );
}
