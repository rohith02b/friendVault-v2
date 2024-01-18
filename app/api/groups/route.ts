import prisma from '@/lib/dbConnect';
import { Groups } from '@/types/Groups';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const groups: Groups[] = await prisma.groups.findMany({
    where: {
      members: {
        has: user?.id || '',
      },
    },
  });

  await prisma.$disconnect();

  return NextResponse.json(groups);
}
