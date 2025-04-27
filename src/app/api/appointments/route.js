import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Appointment } from '@/models/Appointment';
import { withAuth } from '@/middleware/auth';

// Create appointment
export const POST = withAuth(async (request) => {
  try {
    const { specialistId, service, date, time, reason, mode } = await request.json();
    const userId = request.user._id;

    // Connect to database
    await connectToDatabase();

    // Create appointment
    const appointment = await Appointment.create({
      user: userId,
      specialist: specialistId,
      service,
      date,
      time,
      reason,
      mode,
      payment: {
        amount: 150.00, // Mock amount, should be fetched from service/specialist
        status: 'pending',
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Create appointment error:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
});

// Get user's appointments
export const GET = withAuth(async (request) => {
  try {
    const userId = request.user._id;

    // Connect to database
    await connectToDatabase();

    // Find appointments
    const appointments = await Appointment.find({ user: userId })
      .populate('specialist', 'name title')
      .sort({ date: -1 });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}); 