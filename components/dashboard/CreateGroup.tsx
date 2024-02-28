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
import { createGroup } from '@/app/actions/groups/createGroup.action';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function CreateGroup() {
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
          <ProfileForm setOpen={setOpen} createGroup={createGroup} />
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
          createGroup={createGroup}
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

function ProfileForm({ className, setOpen, createGroup }: any) {
  const initialState = {
    message: '',
  };
  const [state, formAction] = useFormState(createGroup, initialState);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  React.useEffect(() => {
    if (state.message === 'Successfully created Group') {
      setOpen(false);
      toast.success(state.message);
    } else if (state.message === 'Code already exists.') {
      toast.error(state.message);
    }
    setLoading(false);
  }, [state]);

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      action={formAction}
    >
      <div className='grid gap-2'>
        <Label htmlFor='name'>Name*</Label>
        <Input type='text' id='name' name='name' required />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='code'>Code*</Label>
        <Input type='text' id='code' name='code' required />
      </div>
      {/* <div className='grid gap-2'>
        <Label htmlFor='connectionString'>Connection String </Label>
        <Input type='text' id='connectionString' name='connectionString' />
        <p className='text-sm text-muted-foreground'>
          The azure connection string which will be encrypted to store the files
          in your azure account
        </p>
      </div> */}
      <Button type='submit' onClick={handleClick}>
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {loading ? 'Saving changes' : 'Save changes'}
      </Button>
    </form>
  );
}
