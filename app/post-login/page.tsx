'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createUser } from '@/action/clerk-user-action';

import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PostLoginPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      const toastId = toast.loading('Syncing your profile...', {
        description: 'Almost ready to blossom 🌸',
      });

      try {
        await createUser({
          email: user.emailAddresses[0].emailAddress,
          fullName: `${user.firstName} ${user.lastName}`,
          primeId: user.primaryEmailAddressId as string,
        });

        toast.success('Welcome! 🌿 You are all set.', {
          id: toastId,
        });

        router.push('/dashboard');
      } catch (error) {
        toast.error('Oops! Something went wrong.', {
          description: 'Please try again or contact support.',
          id: toastId,
        });

        console.error('User sync failed:', error);
      }
    };

    syncUser();
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-rose-50 to-rose-100">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center space-y-4"
      >
        <Loader2 className={cn('animate-spin text-rose-500', 'w-10 h-10')} />
        <p className="text-lg font-medium text-gray-700">Logging you in...</p>
        <span className="text-sm text-gray-500">
          Preparing your dashboard 🌸
        </span>
      </motion.div>
    </div>
  );
}
