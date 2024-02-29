'use client';

import React, { useEffect, useState } from 'react';
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
import { downloadBlob } from '@/app/actions/files/downloadFile.action';
import JsFileDownloader from 'js-file-downloader';
import { toast } from 'sonner';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import deleteBlob from '@/app/actions/files/deleteFile.action';

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
          className={`hover:shadow-md transition-all duration-200 hover:py-4 ${
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
    const handleConfirmDelete = async () => {
      await deleteBlob(content?.content_id).then(
        (response: boolean | undefined) => {
          if (response) {
            toast.success('Successfully deleted');
          } else {
            toast.error('An error occurred');
          }
        }
      );
    };

    const handleDownload = async (id: any) => {
      try {
        const response: any = await downloadBlob(id);
        new JsFileDownloader({
          url: response?.message,
        }).catch((error: any) => {
          toast.error('An error occurred');
        });
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };

    const truncatedName =
      content.content_name.length > 20
        ? `${content.content_name.substring(0, 15)}...`
        : content.content_name;
    return (
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
                <DropdownMenuItem
                  onClick={(e: any) => {
                    e.preventDefault();
                  }}
                >
                  <ConfirmDeleteModal
                    handleConfirmDelete={handleConfirmDelete}
                    menu={true}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (content_type === 'folder') {
    const handleClick = () => {
      const currentUrl = window.location.pathname; // Get the current URL
      const newUrl = `${currentUrl}/${content.content_name}`; // Append content name to the URL
      router.push(newUrl); // Navigate to the new URL
    };

    return (
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
            <IconFolder width={50} height={50} stroke={1} className='mx-auto' />
          </CardTitle>
        </CardHeader>
        <CardContent>{content.content_name}</CardContent>
      </Card>
    );
  }
};

export default GroupCard;
