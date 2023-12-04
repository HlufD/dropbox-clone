"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteMadal() {
  const { user } = useUser();
  const [open, setIsDeleteModalOpen, fileId] = useAppStore((store) => [
    store.isDeleteModalOpen,
    store.setIsDeleteModalOpen,
    store.fileId,
  ]);
  const deleteFile = async () => {
    if (!user && !fileId) return;
    const toastId = toast.loading("loading....");
    const fileRef = ref(storage, `users/${user?.id}/files/${fileId}`);
    try {
      deleteObject(fileRef).then(async () => {
        deleteDoc(doc(db, "users", `${user?.id}`, "files", `${fileId}`))
          .then(() => {
            toast.success("Docmunent Deleted", {
              id: toastId,
            });
          })
          .finally(() => {
            setIsDeleteModalOpen(false);
          });
      });
    } catch (error) {
      toast.error("Error Occured", {
        id: toastId,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want delet this file?</DialogTitle>
          <DialogDescription>
            This action can not be be undone!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            className="px-3 flex-1"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
