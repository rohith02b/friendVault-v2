import AuthLayout from '@/components/layouts/AuthLayout';
import Heading3 from '@/components/ui/heading3';
import RegisterForm from './RegisterForm';

const SignUp = () => {
  return (
    <AuthLayout pageToRedirect='sign-in'>
      <div className='mt-20 flex justify-center items-center flex-col pb-32'>
        <Heading3 content='Create an account'></Heading3>
        <p className='mt-2'>Enter your details below to create your account</p>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
