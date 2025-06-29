'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
// import { stat } from 'fs';

interface ClerkUser {
  email: string;
  fullName: string;
  primeId: string;
  userId?: string;
}

export async function createUser({
  email,
  fullName,
  primeId,
  userId,
}: ClerkUser) {
  try {
    // Check if user already exists by primeId and email
    const existingUser = await prisma.user.findUnique({
      where: { primeId, email },
    });

    const clerkUser = await auth();

    if (existingUser) {
      console.log('User already exists:', existingUser.id);
      return existingUser;
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        userId: (clerkUser.userId as string) || (userId as string),
        email,
        fullName,
        primeId,
      },
    });

    console.log('New user created:', newUser.id);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed.');
  }
}

export async function updateUser({ email, fullName, primeId }: ClerkUser) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { primeId, email },
    });

    if (!existingUser) {
      return {
        status: 404,
        message: 'User not found. Cannot update.',
      };
    }

    // Update user with new info
    const updatedUser = await prisma.user.update({
      where: { primeId, email },
      data: {
        email,
        fullName,
      },
    });

    console.log('[User Updated] ID:', updatedUser.id);
    return {
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    };
  } catch (error) {
    console.error('[Update User Error]:', error);
    return {
      status: 500,
      message: 'Failed to update user',
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    console.log({
      userId,
    });
    if (!userId) {
      return {
        status: 400,
        message: 'User id need to delete an account',
      };
    }

    // First find user and then delete from DB
    const user = await prisma.user.findFirst({
      where: {
        userId,
      },
    });

    if (!user) {
      return {
        status: 400,
        message: 'user not found',
      };
    }

    const deletedUser = await prisma.user.delete({
      where: {
        userId: user.userId,
      },
    });

    if (!deletedUser) {
      return {
        status: 500,
        message: 'something went wrong',
      };
    }

    return {
      status: 200,
      message: 'Account deleted successfully',
    };
  } catch (error) {
    console.log('User delete error ', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  }
}
