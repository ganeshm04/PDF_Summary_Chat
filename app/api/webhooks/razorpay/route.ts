/* eslint-disable @typescript-eslint/no-explicit-any */
// import { prisma } from '@/lib/prisma'; // Commented for later use
// import crypto from 'crypto'; // Commented for later use
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Payment webhook functionality temporarily disabled
    // TODO: Implement payment webhook logic later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _req = req; // Keep req for later use
    return NextResponse.json({ 
      message: 'Payment webhook functionality is currently disabled.',
      received: true 
    });

    // Original Razorpay webhook logic (commented for later use)
    /*
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return new NextResponse('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.type === 'payment.captured') {
      const { order_id, id: payment_id } = event.payload.payment.entity;

      // update the payment status
      await prisma.payment.update({
        where: {
          razorpayOrderId: order_id,
        },
        data: {
          status: true,
          razorpayPaymentId: payment_id,
        },
      });
    }

    return NextResponse.json({ received: true });
    */
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error?.message,
      },
      {
        status: 500,
      },
    );
  }
}
