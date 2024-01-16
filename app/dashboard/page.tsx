import DashboardLayout from '@/components/layouts/DashboardLayout';
import ContentCard from './content-card';
import Groups from './Groups';
import { Toaster } from '@/components/ui/sonner';
import LandingLayout from '@/components/layouts/LandingLayout';

export default async function Dashboard() {
  return (
    <DashboardLayout>
      <ContentCard />
      <Groups />
      <Toaster />
    </DashboardLayout>
  );
}
