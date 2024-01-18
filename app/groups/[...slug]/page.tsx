import DashboardLayout from '@/components/layouts/DashboardLayout';
import Folders from './Folders';
import Files from './Files';

export default function Page({ params }: { params: { slug: string[] } }) {
  let url = params.slug;
  const groupId = url.shift();
  const path = url.join('/');

  return (
    <DashboardLayout>
      <Folders />
      <Files />
    </DashboardLayout>
  );
}
