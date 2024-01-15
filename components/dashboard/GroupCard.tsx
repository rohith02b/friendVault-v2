import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { IconUsersGroup } from '@tabler/icons-react';

const GroupCard = ({ Group }: any) => {
  return (
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
      <CardContent>{Group.name}</CardContent>
    </Card>
  );
};

export default GroupCard;
