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
import { getUrl } from '@/app/actions';
import { toast } from 'sonner';
import { UpdateContent } from '@/app/actions';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import uniqId from 'generate-unique-id';

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to array and add upload status
      const filesArray: any[] = Array.from(files).map((file: any) => ({
        file,
        status: 'uploading', // Initial status is pending
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
        // Update status to 'uploading'
        fileData.status = 'uploading';
        setSelectedFiles([...selectedFiles]);

        // Perform the actual file upload to Azure Blob Storage
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
            'x-ms-blob-type': 'BlockBlob',
          },
          body: file,
        });

        // Check if the upload was successful (you may need to customize this based on your Azure setup)
        if (response.ok) {
          let url = response.url.split('?');
          fileData.status = 'uploaded';
          UpdateContent({
            content_id: uniqId(),
            group_id: groupId,
            url: url[0],
            path: `/${path}`,
            content_name: file.name,
            content_type: 'file',
            content_mimetype: file.type,
            uploaded: true,
          });
        } else {
          fileData.status = 'error';
        }

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
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
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
                {each.status === 'uploading' ? (
                  <Loader2 className='animate-spin' />
                ) : each.status === 'uploaded' ? (
                  <CheckCircle className='text-green-500' />
                ) : (
                  <XCircle className='text-red-500' />
                )}
                <p>{each.file.name}</p>
              </div>
            );
          })}
        </div>
      ) : null}
      <Button type='submit' disabled={uploading}>
        {uploading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
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
