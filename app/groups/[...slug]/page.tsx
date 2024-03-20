'use server';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import Folders from './Folders';
import Files from './Files';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const groupId = params.slug.shift();
  const path = params.slug.join('/');

  return (
    <DashboardLayout option='members' groupId={groupId}>
      <Folders groupId={groupId} path={path} />
      <Files groupId={groupId} path={path} />
    </DashboardLayout>
  );
}
