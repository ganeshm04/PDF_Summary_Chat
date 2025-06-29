'use server';

import { prisma } from '@/lib/prisma';
import { ensureUserExists } from './user-auth';
import { revalidatePath } from 'next/cache';
import { UTApi } from 'uploadthing/server';
// import { auth } from '@clerk/nextjs/server';

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
  logLevel: 'All',
});

export interface SavePDFSummaryType {
  userId?: string;
  originalFileUrl: string;
  summaryText: string;
  title: string;
  fileName: string;
}
export const savePDFSummary = async ({
  originalFileUrl,
  summaryText,
  title,
  fileName,
}: SavePDFSummaryType) => {
  try {
    const user = await ensureUserExists();
    if (user.status !== 200) {
      throw new Error(user.message);
    }

    console.log({ user });

    // save pdf summary
    const savedSummary = await prisma.pdfSummaries.create({
      data: {
        userId: user.data?.userId as string,
        originalFileUrl,
        summaryText,
        title,
        fileName,
      },
    });

    console.log({
      savedSummary,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: 'PDF Summary not saved in DB.',
      };
    }

    console.log('✅ PDF summary saved to database:', savedSummary.id);
    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'PDF Summary is save into DB',
      summaryId: savedSummary.id,
    };
  } catch (error) {
    console.error('❌ Failed to save PDF summary:', error);
    return {
      success: false,
      message: 'Failed to save PDF summary.',
      error,
    };
  }
};

export const getPDFSummaries = async () => {
  try {
    const { status, data, message } = await ensureUserExists();

    if (status !== 200) {
      throw new Error(message);
    }

    const summaries = await prisma.pdfSummaries.findMany({
      where: {
        userId: data?.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!summaries || summaries.length === 0) {
      return {
        success: false,
        message: 'No summaries found.',
        summaries: [],
      };
    }

    return {
      success: true,
      message: 'Successfully fetched all summaries.',
      summaries,
    };
  } catch (error) {
    console.error('❌ Error fetching summaries:', error);
    return {
      success: false,
      message: 'Failed to get summaries.',
      error: (error as Error).message,
    };
  }
};

export const deletePDFSummary = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: 'Id must be for delete a PDF',
      };
    }

    const { status, message } = await ensureUserExists();

    if (status != 200) {
      throw new Error(message);
    }

    const resp = await prisma.pdfSummaries.delete({
      where: {
        id,
      },
    });

    if (!resp) {
      return {
        success: false,
        message: 'delete pdf operation failed on db lavel',
      };
    }

    const uploadthingDeleteResp = await utapi.deleteFiles([resp.fileName]);

    if (!uploadthingDeleteResp.success) {
      return {
        success: false,
        message: 'delete pdf operation failed on db lavel',
      };
    }

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'PDF delete successfully',
      deleteCount: uploadthingDeleteResp.deletedCount,
    };
  } catch (error) {
    console.log('PDF delete failed');
    return {
      success: false,
      message: 'Internal server error',
      error,
    };
  }
};

export const getPDFSummaryById = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: 'Id must require for get PDF summary',
      };
    }

    const { status, message } = await ensureUserExists();
    if (status != 200) {
      throw new Error(message);
    }

    const summary = await prisma.pdfSummaries.findFirst({
      where: {
        id,
      },
    });

    if (!summary) {
      return {
        success: false,
        message: 'Operation failed for getting a PDF summary',
      };
    }

    return {
      success: true,
      message: 'Successfully getting a PDF Summary',
      summary,
    };
  } catch (error) {
    console.log('Error while getting PDF summary ', error);
    return {
      success: false,
      message: 'Internal server error',
      error,
    };
  }
};

export const toggleSummaryStatus = async (
  summaryId: string,
  value: boolean,
) => {
  try {
    if (!summaryId) {
      return {
        success: false,
        message: 'Summary ID is missing.',
      };
    }

    const { status, message } = await ensureUserExists();
    if (status !== 200) {
      return {
        success: false,
        message: message || 'User not authenticated.',
      };
    }

    await prisma.pdfSummaries.update({
      where: { id: summaryId },
      data: { status: value },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Summary status updated successfully.',
    };
  } catch (error) {
    console.error('❌ Error toggling summary status:', error);
    return {
      success: false,
      message: 'Failed to update summary status.',
      error: (error as Error).message,
    };
  }
};
