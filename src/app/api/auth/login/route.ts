import { NextRequest, NextResponse } from 'next/server';
import { validateUserCredentials, findUserByUsername } from '@/lib/database';
import { generateToken, setAuthCookie } from '@/lib/auth';
import { ApiResponse, LoginCredentials, LoginResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Username and password are required'
      }, { status: 400 });
    }

    // Validate credentials
    const user = validateUserCredentials(username, password);
    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid username or password'
      }, { status: 401 });
    }

    // Generate token
    const token = generateToken(user);

    // Create response
    const response = NextResponse.json<ApiResponse<LoginResponse>>({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          profile: user.profile
        },
        token
      },
      message: 'Login successful'
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Handle GET request - check if user is already logged in
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Not authenticated'
      }, { status: 401 });
    }

    // Here you could verify the token and return user info
    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Authentication check endpoint'
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
