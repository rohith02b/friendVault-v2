import * as React from 'react';

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
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export function DeleteModal({ handleConfirmDelete }: any) {
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
          <Button>Delete Group</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete the group</DialogTitle>
            <DialogDescription>
              Only group admins can delete the group. Beware that all the
              folders and files will be deleted completely.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-row gap-6 justify-center'>
            <Button
              variant='destructive'
              onClick={() => {
                handleConfirmDelete();
                setOpen(false);
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Delete Group</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Are you sure you want to delete the group</DrawerTitle>
          <DrawerDescription>
            Only group admins can delete the group. Beware that all the folders
            and files will be deleted completely.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='pt-2'></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DeleteModal;
