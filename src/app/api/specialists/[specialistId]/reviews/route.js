import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Specialist from '@/models/Specialist';
import { withAuth } from '@/lib/auth';

// GET /api/specialists/[specialistId]/reviews
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { specialistId } = params;

    const specialist = await Specialist.findById(specialistId)
      .populate('reviews.user', 'name');
      
    if (!specialist) {
      return NextResponse.json(
        { message: 'Specialist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ reviews: specialist.reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/specialists/[specialistId]/reviews
export const POST = withAuth(async (request, { params }) => {
  try {
    await connectToDatabase();
    const { specialistId } = params;
    const { rating, comment } = await request.json();
    const userId = request.user.id;

    if (!rating || !comment) {
      return NextResponse.json(
        { message: 'Rating and comment are required' },
        { status: 400 }
      );
    }

    const specialist = await Specialist.findById(specialistId);
    if (!specialist) {
      return NextResponse.json(
        { message: 'Specialist not found' },
        { status: 404 }
      );
    }

    // Check if user has already reviewed
    const hasReviewed = specialist.reviews.some(
      (review) => review.user.toString() === userId
    );

    if (hasReviewed) {
      return NextResponse.json(
        { message: 'You have already reviewed this specialist' },
        { status: 400 }
      );
    }

    // Add new review
    specialist.reviews.push({
      user: userId,
      rating,
      comment,
      createdAt: new Date(),
    });

    // Update average rating
    const totalRating = specialist.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    specialist.rating = totalRating / specialist.reviews.length;

    await specialist.save();

    // Populate the user information for the new review
    const populatedSpecialist = await Specialist.findById(specialistId)
      .populate('reviews.user', 'name');

    return NextResponse.json(
      { 
        message: 'Review added successfully', 
        review: populatedSpecialist.reviews[populatedSpecialist.reviews.length - 1] 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}); 