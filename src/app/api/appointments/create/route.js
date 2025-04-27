import { NextResponse } from 'next/server';
import { auth } from '@/middleware/auth';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function POST(request) {
  try {
    const decoded = await auth();
    if (!decoded?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { 
      specialistId, 
      serviceId, 
      date, 
      time, 
      consultationType, 
      reasonForVisit,
      cost 
    } = await request.json();

    // Validate required fields
    if (!specialistId || !serviceId || !date || !time || !consultationType || !reasonForVisit || !cost) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId: decoded.userId,
      specialistId,
      serviceId,
      date: new Date(date),
      time,
      consultationType,
      reasonForVisit,
      cost,
      status: 'pending',
      paymentStatus: 'pending'
    });

    return NextResponse.json(appointment, { status: 201 });

  } catch (error) {
    console.error('Appointment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}