import { onAuthenticateUser } from '@/action/user-auth';
// import { prisma } from '@/lib/prisma'; // Commented for later use

export const isUserSubscribePlan = async () => {
  try {
    const user = await onAuthenticateUser();
    if (user.status != 200) {
      throw new Error(user.message);
    }

    // For now, all users have access to all features (no payment required)
    // TODO: Implement payment logic later
    return {
      success: true,
      message: 'user has access to all features.',
    };

    // Original payment logic (commented for later use)
    /*
    const isSubscirbedThePlane = await prisma.user.findFirst({
      where: {
        userId: user.data?.userId as string,
      },
    });

    if (isSubscirbedThePlane?.status) {
      return {
        success: true,
        message: 'user purched a plan.',
      };
    }
    */
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred in finding subscribed user',
    };
  }
};
