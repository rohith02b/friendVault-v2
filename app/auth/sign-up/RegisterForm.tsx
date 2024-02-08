'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { GithubIcon, Loader2 } from 'lucide-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [loading, setLoading] = useState<Boolean>(false);

  return (
    <>
      <form
        className={cn('grid w-full md:w-1/2 mt-4 items-start gap-4')}
        // action={formAction}
      >
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input type='name' id='name' name='name' required />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' name='email' required />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input type='text' id='password' name='password' required />
        </div>
        <Button type='submit'>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {loading ? 'Saving changes' : 'Save changes'}
        </Button>
        <div className='relative mt-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t'></span>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
      </form>
      <div className='w-full md:w-1/2 gap-4 flex flex-col'>
        <Button
          className='mt-4'
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          <IconBrandGoogle className='mr-2 h-4 w-4' /> Continue with Google
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
