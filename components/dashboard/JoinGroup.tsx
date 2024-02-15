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
import { toast } from 'sonner';
import { joinGroup } from '@/app/actions/groups/joinGroup.action';
import { useFormState } from 'react-dom';
import { Loader2 } from 'lucide-react';

export default function JoinGroup() {
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
          <Button>Join Group</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Join group</DialogTitle>
            <DialogDescription>
              Join an existing group to share files with your group
            </DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} joinGroup={joinGroup} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Join Group</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Join Group</DrawerTitle>
          <DrawerDescription>
            Join an existing group to share files with your group
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm setOpen={setOpen} joinGroup={joinGroup} className='px-4' />

        <DrawerFooter className=''>
          <DrawerClose asChild></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, setOpen, joinGroup }: any) {
  const initialState = {
    message: '',
  };
  const [state, formAction] = useFormState(joinGroup, initialState);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  React.useEffect(() => {
    if (state.message === 'Successfully joined Group') {
      setOpen(false);
      toast.success(state.message);
    } else if (state.message === 'Group does not exist') {
      toast.error(state.message);
    } else if (state.message === 'You are a member of the group') {
      toast.info(state.message);
    }
    setLoading(false);
  }, [state]);

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      action={formAction}
    >
      <div className='grid gap-2'>
        <Label htmlFor='code'>Code</Label>
        <Input type='text' id='code' name='code' required />
      </div>
      <Button type='submit' onClick={handleClick}>
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {loading ? 'Saving ' : 'Save '}
      </Button>
    </form>
  );
}
