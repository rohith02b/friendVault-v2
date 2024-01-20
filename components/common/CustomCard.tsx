'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IconFile, IconFolder, IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import { CustomCard } from '@/types/CustomCard';
import { useRouter } from 'next/navigation';

const GroupCard = ({ content_type, content }: CustomCard) => {
  const router = useRouter();

  if (content_type === 'group') {
    return (
      <Link href={`/groups/${content.id}`}>
        <Card
          style={{
            cursor: 'pointer',
          }}
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
    const truncatedName =
      content.content_name.length > 20
        ? `${content.content_name.substring(0, 15)}...`
        : content.content_name;
    return (
      <Card
        style={{
          cursor: 'pointer',
        }}
      >
        <CardHeader>
          <CardTitle>
            <IconFile width={50} height={50} stroke={1} className='mx-auto' />
          </CardTitle>
        </CardHeader>
        <CardContent>{truncatedName}</CardContent>
      </Card>
    );
  }

  if (content_type === 'folder') {
    const handleClick = (folder: any) => {
      const pathToRedirect = location.pathname + `/${content.content_name}`;
      router.push(pathToRedirect);
    };

    return (
      <Card
        style={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <CardHeader>
          <CardTitle>
            <IconFolder width={50} height={50} stroke={1} className='mx-auto' />
          </CardTitle>
        </CardHeader>
        <CardContent>{content.content_name}</CardContent>
      </Card>
    );
  }
};

export default GroupCard;
