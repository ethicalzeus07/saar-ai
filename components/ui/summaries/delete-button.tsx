"use client";
import React, { useState, useTransition, useCallback } from "react";
import { deleteSummaryAction } from "@/actions/summary-action";
import { Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId: string;
  onDelete?: (id: string) => void;
}

export function DeleteButton({ summaryId, onDelete }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await deleteSummaryAction({ summaryId });
        if (result.success) {
          toast.success('Summary deleted successfully');
          setOpen(false);
          if (onDelete) onDelete(summaryId);
        } else {
          toast.error('Failed to delete summary');
        }
      } catch {
        toast.error('An error occurred while deleting the summary');
      }
    });
  }, [summaryId, onDelete]);

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const handleCancelClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <button
          className="text-gray-400 bg-white hover:text-yellow-400 transition-all duration-200 p-2 sm:p-3 rounded-full shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
          disabled={isPending}
          onClick={handleTriggerClick}
          aria-label="Delete summary"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-md mx-4"
        onPointerDownOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg lg:text-xl">ARE YOU SURE ABOUT THIS ?</DialogTitle>
        </DialogHeader>
        <p className="text-xs sm:text-sm lg:text-base">Are you sure you want to delete this summary? This action cannot be undone.</p>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="hover:text-white shadow-none text-xs sm:text-sm lg:text-base w-full sm:w-auto transition-all duration-200 min-h-[44px] sm:min-h-[48px]" 
              disabled={isPending}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            className="bg-yellow-400 hover:bg-yellow-500 text-white shadow text-xs sm:text-sm lg:text-base w-full sm:w-auto transition-all duration-200 disabled:opacity-75 min-h-[44px] sm:min-h-[48px]"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span className="hidden xs:inline">Deleting...</span>
                <span className="xs:hidden">Deleting</span>
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
