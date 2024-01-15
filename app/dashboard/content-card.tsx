import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ContentCard = () => {
  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-12 my-12'>
      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent>1</CardContent>
        <CardFooter className=''></CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent>2</CardContent>
        <CardFooter className=''></CardFooter>
      </Card>
    </div>
  );
};

export default ContentCard;
