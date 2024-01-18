import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import { CustomCard } from '@/types/CustomCard';

const GroupCard = ({ content_type, content }: CustomCard) => {
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
};

export default GroupCard;
