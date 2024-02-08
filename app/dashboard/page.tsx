import DashboardLayout from '@/components/layouts/DashboardLayout';
import ContentCard from './content-card';
import Groups from './Groups';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  return (
    <DashboardLayout>
      <ContentCard />
      <Groups />
    </DashboardLayout>
  );
}
