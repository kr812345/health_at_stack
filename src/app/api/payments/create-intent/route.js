import { NextResponse } from 'next/server';
import { auth } from '@/middleware/auth';
import Stripe from 'stripe';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const decoded = await auth();
    if (!decoded?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { appointmentId } = await request.json();

    // Get appointment details
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(appointment.cost * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        appointmentId: appointmentId,
        userId: decoded.userId,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}