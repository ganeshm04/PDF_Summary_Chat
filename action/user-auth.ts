/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export const onAuthenticateUser = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId) {
      return {
        status: 401,
        message: 'Unauthorized',
      };
    }

    return {
      status: 200,
      message: 'User is authenticated',
      data: {
        userId,
        email: user?.emailAddresses[0].emailAddress,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
};

export const ensureUserExists = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return {
        status: 401,
        message: 'Unauthorized',
      };
    }

    const email = user.emailAddresses[0].emailAddress;
    const fullName = user.fullName;

    // Check if user exists in database
    let dbUser = await prisma.user.findUnique({
      where: { userId },
    });

    // If user doesn't exist, create them
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          userId,
          email,
          fullName,
          primeId: userId, // Using userId as primeId for now
        },
      });
    }

    return {
      status: 200,
      message: 'User is authenticated and exists in database',
      data: {
        userId,
        email,
        fullName,
      },
    };
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
};
