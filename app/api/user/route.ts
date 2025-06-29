/* eslint-disable @typescript-eslint/no-explicit-any */
import { onAuthenticateUser } from '@/action/user-auth';
// import { prisma } from '@/lib/prisma'; // Commented for later use
// import { razorpay } from '@/lib/razorpay'; // Commented for later use
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // check user is authenticated or not
    const user = await onAuthenticateUser();
    if (user.status != 200) {
      throw new Error(user.message);
    }

    // Payment functionality temporarily disabled
    // TODO: Implement payment logic later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _req = req; // Keep req for later use
    return NextResponse.json({ 
      message: 'Payment functionality is currently disabled. All features are available for free.',
      order: null 
    });

    // Original payment logic (commented for later use)
    /*
    const { plan } = await req.json();

    if (!['basic', 'pro'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const amount = plan === 'pro' ? 2999 * 100 : 0;

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `${plan}--plan--receipt--${Date.now()}`,
      notes: {},
    });

    // save the order in DB
    await prisma.payment.create({
      data: {
        amount,
        razorpayOrderId: order.id,
        plan,
        status: false,
        userId: user.data?.userId as string,
        userEmail: user.data?.email as string,
      },
    });

    return NextResponse.json({ order });
    */
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
