import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Get the cookies instance
    const cookieStore = cookies();
    
    // Remove the auth token
    cookieStore.delete('health_token');

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `health_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`
        }
      }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Error during logout' },
      { status: 500 }
    );
  }
} 