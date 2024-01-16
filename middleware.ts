import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { NextResponse, NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) return NextResponse.next();

  return NextResponse.redirect(new URL('/api/auth/login', request.url));
}

export const config = {
  matcher: ['/dashboard', '/groups/:path*'],
};
