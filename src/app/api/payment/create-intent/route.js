import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import { Appointment } from '@/models/Appointment';
import { withAuth } from '@/middleware/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = withAuth(async (request) => {
  try {
    const { amount, appointmentId } = await request.json();
    const userId = request.user._id;

    // Connect to database
    await connectToDatabase();

    // Find appointment
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      user: userId,
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        appointmentId,
        userId,
      },
    });

    // Update appointment with payment intent ID
    appointment.payment.transactionId = paymentIntent.id;
    await appointment.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}); 