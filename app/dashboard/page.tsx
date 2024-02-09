import DashboardLayout from '@/components/layouts/DashboardLayout';
import ContentCard from './content-card';
import Groups from './Groups';

export default async function Dashboard() {
  return (
    <DashboardLayout option='logout'>
      <ContentCard />
      <Groups />
    </DashboardLayout>
  );
}
