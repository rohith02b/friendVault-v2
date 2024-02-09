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
import { downloadBlob } from '@/app/actions';
import JsFileDownloader from 'js-file-downloader';
import { toast } from 'sonner';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { getSession } from 'next-auth/react';

const GroupCard = ({ content_type, content }: CustomCard) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [groupHover, setGroupHover] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const session = await getSession();
      if (session?.user?.email === content?.owner) setIsAdmin(true);
    };

    getUserDetails();
  }, []);

  if (content_type === 'group') {
    const handleGroupClick = () => {
      router.push(`/groups/${content.id}`);
    };

    const handleViewMembersClick = (event: any) => {
      event.stopPropagation(); // Prevent the event from bubbling up to the parent card
      // Handle logic for viewing members here
    };

    const handleConfirmDelete = () => {
      console.log('confirmed');
    };

    return (
      <Card
        style={{
          cursor: 'pointer',
        }}
        onClick={handleGroupClick}
        className={`hover:shadow-md transition-all duration-200 ${
          resolvedTheme === 'dark' ? 'hover:shadow-slate-50' : ''
        }`}
        onMouseEnter={() => setGroupHover(true)}
        onMouseLeave={() => setGroupHover(false)}
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
        {groupHover && isAdmin && (
          <div className=' mb-7 ' onClick={handleViewMembersClick}>
            <ConfirmDeleteModal handleConfirmDelete={handleConfirmDelete} />
          </div>
        )}
      </Card>
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
    const handleClick = () => {
      const currentUrl = window.location.pathname; // Get the current URL
      const newUrl = `${currentUrl}/${content.content_name}`; // Append content name to the URL
      router.push(newUrl); // Navigate to the new URL
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
