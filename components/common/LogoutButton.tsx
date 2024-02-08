'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    signOut({ callbackUrl: 'http://localhost:3000' });
  };

  return <Button onClick={handleLogout}>Sign out</Button>;
};

export default LogoutButton;
