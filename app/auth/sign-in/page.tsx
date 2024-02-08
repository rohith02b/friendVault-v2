import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import Heading3 from '@/components/ui/heading3';
import LoginForm from './LoginForm';

const SignIn = () => {
  return (
    <AuthLayout pageToRedirect='sign-up'>
      <div className='mt-20 flex justify-center items-center flex-col pb-32'>
        <Heading3 content='Log in to your account'></Heading3>
        <p className='mt-2'>
          Enter your details below to log in to your account
        </p>
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default SignIn;
