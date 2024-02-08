'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { GithubIcon, Loader2 } from 'lucide-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      console.log(result);
      if (!result?.ok) {
        toast.error(
          'It seems that there may be an issue with either the email or password you entered, or perhaps your email is linked to the Google provider.'
        );
      } else {
        router.push('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <>
      <form
        className={cn('grid w-full md:w-1/2 mt-4 items-start gap-4')}
        onSubmit={handleSubmit}
      >
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
          {loading ? 'Signing in' : 'Sign in'}
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
          onClick={(e: any) => handleGoogleLogin('google')}
        >
          <IconBrandGoogle className='mr-2 h-4 w-4' /> Continue with Google
        </Button>
      </div>

      <Toaster />
    </>
  );
};

export default LoginForm;
