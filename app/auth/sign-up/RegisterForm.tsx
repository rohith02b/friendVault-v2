'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Loader2, Router } from 'lucide-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [googleLoading, setGLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Handle successful registration, maybe redirect user to dashboard
        router.push('/auth/sign-in');
      } else {
        // Handle registration error
        toast.error('The email already exists');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className={cn('grid w-full md:w-1/2 mt-4 items-start gap-4')}
        onSubmit={handleSubmit}
      >
        <div className='grid gap-2'>
          <Label htmlFor='name'>name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type='submit'>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {loading ? 'Signing up' : 'Sign up'}
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
      <div className='w-full mt-2 md:w-1/2 gap-4 flex flex-col'>
        <Button
          className='mt-4'
          disabled={googleLoading}
          onClick={(e: any) => {
            setGLoading(true);
            signIn('google', { callbackUrl: '/dashboard' });
          }}
        >
          {googleLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          <IconBrandGoogle className='mr-2 h-4 w-4' /> Continue with Google
        </Button>
      </div>

      <Toaster />
    </>
  );
};

export default RegisterForm;
