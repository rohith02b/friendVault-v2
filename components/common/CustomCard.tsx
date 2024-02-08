'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IconFile, IconFolder, IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import { CustomCard } from '@/types/CustomCard';
import { useRouter } from 'next/navigation';
import { IconDotsVertical } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { downloadBlob } from '@/app/actions';
import JsFileDownloader from 'js-file-downloader';
import { toast } from 'sonner';

const GroupCard = ({ content_type, content }: CustomCard) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  if (content_type === 'group') {
    return (
      <Link href={`/groups/${content.id}`}>
        <Card
          style={{
            cursor: 'pointer',
          }}
          className={`hover:shadow-md transition-all duration-200 ${
            resolvedTheme === 'dark' ? 'hover:shadow-slate-50' : ''
          }`}
        >
          <CardHeader>
            <CardTitle>
              <IconUsersGroup
                width={50}
                height={50}
                stroke={1}
                className='mx-auto'
              />
            </CardTitle>
          </CardHeader>
          <CardContent>{content.name}</CardContent>
        </Card>
      </Link>
    );
  }

  if (content_type === 'file') {
    const handleDownload = async (id: any) => {
      try {
        const response: any = await downloadBlob(id);
        console.log(decodeURIComponent(response?.message));
        new JsFileDownloader({
          url: response?.message,
        }).catch((error: any) => [toast.error('An error occurred')]);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };

    const truncatedName =
      content.content_name.length > 20
        ? `${content.content_name.substring(0, 15)}...`
        : content.content_name;
    return (
      <>
        <Card
          style={{
            cursor: 'pointer',
          }}
          className={`hover:shadow-md transition-all duration-200 ${
            resolvedTheme === 'dark' ? 'hover:shadow-slate-50' : ''
          }`}
        >
          <CardHeader>
            <CardTitle className='relative'>
              <IconFile width={50} height={50} stroke={1} className='mx-auto' />
            </CardTitle>
          </CardHeader>
          <CardContent className='relative'>
            {truncatedName}
            <div className='absolute top-0 right-4'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconDotsVertical width={25} height={25} stroke={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleDownload(content.content_id)}
                  >
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (content_type === 'folder') {
    const handleClick = (folder: any) => {
      let pathArr: any = location.pathname + `/${content.content_name}`;
      pathArr = pathArr.split('/').slice(1); // Use slice(1) to remove the empty string at the beginning

      // Find the index of 'vault' in the array
      const vaultIndex = pathArr.indexOf('vault');

      // If 'vault' is found, construct the path from the 'groups' index
      if (vaultIndex !== -1) {
        const newPath = `/${pathArr.slice(vaultIndex + 2).join('/')}`;
        router.push(newPath);

        // Redirect logic here (e.g., using Next.js router)
        // For example, using Next.js router
        // router.push(newPath);
      } else {
        console.error('Error: "vault" not found in the path.');
      }
    };

    return (
      <>
        <Card
          style={{
            cursor: 'pointer',
          }}
          onClick={handleClick}
          className={`hover:shadow-md transition-all duration-200 ${
            resolvedTheme === 'dark' ? 'hover:shadow-slate-50' : ''
          }`}
        >
          <CardHeader>
            <CardTitle className='relative'>
              <IconFile width={50} height={50} stroke={1} className='mx-auto' />
            </CardTitle>
          </CardHeader>
          <CardContent className='relative'>
            {content.content_name}
            <div className='absolute top-0 right-4'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconDotsVertical width={25} height={25} stroke={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
};

export default GroupCard;
