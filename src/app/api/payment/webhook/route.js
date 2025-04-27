import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import { Appointment } from '@/models/Appointment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const appointmentId = paymentIntent.metadata.appointmentId;

        // Update appointment status
        await Appointment.findByIdAndUpdate(appointmentId, {
          'payment.status': 'completed',
          status: 'confirmed',
        });

        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        const failedAppointmentId = failedPayment.metadata.appointmentId;

        // Update appointment status
        await Appointment.findByIdAndUpdate(failedAppointmentId, {
          'payment.status': 'failed',
          status: 'cancelled',
        });

        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 