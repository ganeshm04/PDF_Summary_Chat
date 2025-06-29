'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deletePDFSummary } from '@/action/summary-actions';
import { toast } from 'sonner';

type DeleteButtonProps = {
  summaryId: string;
};

export const DeleteButton = ({ summaryId }: DeleteButtonProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      toast.info('Delete operation start');
      const resp = await deletePDFSummary(id);
      if (resp.success) {
        toast.success('PDF deleted successfully');
      } else {
        toast.error(resp.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Delete operation failed');
      console.error(error);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-gray-500"
          aria-label="Delete Summary"
        >
          <Trash2 className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            summary and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            aria-label="Cancel deletion"
            className="bg-white hover:bg-gray-200 text-black"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(summaryId)}
            aria-label="Confirm deletion"
            className="bg-gray-800 hover:bg-gray-900"
          >
            {loading ? 'Deleting....' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
