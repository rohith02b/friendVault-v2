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
import { useFormState } from 'react-dom';
import { createFolder } from '@/app/actions';
import { toast } from 'sonner';

export function CreateFolder({ groupId, path }: any) {
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
          <Button>Create Folder</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription>
              Create a folder in the current direcotory
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            createFolder={createFolder}
            setOpen={setOpen}
            groupId={groupId}
            path={path}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Create Folder</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Create a folder in the current direcotory
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className='px-4'
          createFolder={createFolder}
          setOpen={setOpen}
          groupId={groupId}
          path={path}
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

function ProfileForm({ className, createFolder, setOpen, groupId, path }: any) {
  const initialState = {
    message: '',
  };
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [state, setState] = React.useState<any>();

  const handleClick = async () => {
    setLoading(true);
    const response = await createFolder(groupId, path, name);
    setState(response?.message);
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  React.useEffect(() => {
    if (state === 'Successfully created folder') {
      setOpen(false);
      toast.success(state);
    } else if (state === 'Error creating folder') {
      toast.error(state);
    }
    setLoading(false);
  }, [state]);

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <div className='grid gap-2'>
        <Label htmlFor='email'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={handleChange}
        />
      </div>
      <Button type='submit'>Save changes</Button>
    </form>
  );
}

export default CreateFolder;
