import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { withAuth } from '@/middleware/auth';

// Get user profile
export const GET = withAuth(async (request) => {
  try {
    const userId = request.user._id;

    // Connect to database
    await connectToDatabase();

    // Find user
    const user = await User.findById(userId)
      .select('-password')
      .populate({
        path: 'appointments',
        populate: {
          path: 'specialist',
          select: 'name title',
        },
      });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
});

// Update user profile
export const PUT = withAuth(async (request) => {
  try {
    const userId = request.user._id;
    const updates = await request.json();

    // Connect to database
    await connectToDatabase();

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}); 