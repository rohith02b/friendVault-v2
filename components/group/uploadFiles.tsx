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
import { getUrl } from '@/app/actions/files/upload.action';
import { toast } from 'sonner';
import { UpdateContent } from '@/app/actions/files/uploadToDb.action';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import uniqId from 'generate-unique-id';
import axios from 'axios';

export function UploadFiles({ groupId, path }: any) {
  const [open, setOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>();

  const customFunc = () => {
    if (open) setOpen(true);
  };

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
      <>
        <Dialog open={open} onOpenChange={customFunc}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Upload Files</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
              <DialogDescription>
                Upload multiple files to the current directory
              </DialogDescription>
            </DialogHeader>
            <ProfileForm
              setOpen={setOpen}
              getUrl={getUrl}
              UpdateContent={UpdateContent}
              groupId={groupId}
              path={path}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Drawer open={open} dismissible={false} onOpenChange={customFunc}>
        <DrawerTrigger asChild>
          <Button onClick={() => setOpen(true)}>Upload Files</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Upload multiple files to the current directory
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm
            className='px-4'
            setOpen={setOpen}
            getUrl={getUrl}
            UpdateContent={UpdateContent}
            groupId={groupId}
            path={path}
          />
          <DrawerFooter className='pt-2'>
            <DrawerClose asChild></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ProfileForm({
  className,
  setOpen,
  getUrl,
  UpdateContent,
  groupId,
  path,
}: any) {
  const initialState = {
    message: '',
  };
  const [state, formAction] = useFormState(getUrl, initialState);
  const [selectedFiles, setSelectedFiles] = React.useState<any>();
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // State to store progress percentage

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray: any[] = Array.from(files).map((file: any) => ({
        file,
        status: 'uploading',
      }));
      setSelectedFiles(filesArray);
    }
  };

  const uploadToAzure = async (SasUrl: string) => {
    const urlArr = SasUrl.split('?');
    try {
      for (const fileData of selectedFiles) {
        const { file } = fileData;
        const id = uniqId();
        let name = file.name.split('.');

        let url = `${urlArr[0]}/${groupId}/${path ? path + '/' : ''}${
          name[0]
        }-${id}.${name[1]}?${urlArr[1]}`;
        fileData.status = 'uploading';
        setSelectedFiles([...selectedFiles]);

        const response: any = await axios.post('/api/uploadFile', file, {
          onUploadProgress: (progressEvent: any) => {
            const progressPercentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progressPercentage); // Update progress percentage
          },
        });

        fileData.status = 'uploaded';
        setSelectedFiles([...selectedFiles]);
      }

      setOpen(false);
    } catch (error) {
      console.error('Error during file upload:', error);
      selectedFiles.forEach((fileData: any) => {
        fileData.status = 'error';
      });
      toast.error('Could not upload files.');
      setSelectedFiles([...selectedFiles]);
      setUploading(false);
    }
  };

  React.useEffect(() => {
    if (!state.message) {
    } else if (state.message === 'Could not generate SAS token') {
      setOpen(false);
      toast.error(state.message);
    } else {
      setUploading(true);
      uploadToAzure(state.message);
    }
  }, [state]);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (uploading) {
        const message =
          'You have uploads in progress. Are you sure you want to leave?';
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [uploading]);

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      action={formAction}
    >
      <div className='grid gap-2'>
        <Label htmlFor='files'>Upload files </Label>
        <Input
          type='file'
          id='files'
          name='files'
          multiple
          required
          className='cursor-pointer'
          onChange={handleFileChange}
        />
      </div>
      {uploading ? (
        <div className='grid gap-2 max-h-[10rem] overflow-y-scroll ml-4'>
          {selectedFiles?.map((each: any, index: number) => {
            return (
              <div
                key={index}
                className='flex flex-row gap-5 items-center mt-2'
              >
                <p>
                  {each.status === 'uploading' ? (
                    progress + '%'
                  ) : (
                    <CheckCircle className='text-green-500 inline mr-4' />
                  )}
                  {each.file.name}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
      <Button type='submit' disabled={uploading}>
        {uploading ? 'Uploading' : 'Upload'}
      </Button>
      {!uploading && (
        <Button type='reset' onClick={() => setOpen(false)}>
          Close
        </Button>
      )}
    </form>
  );
}

export default UploadFiles;
