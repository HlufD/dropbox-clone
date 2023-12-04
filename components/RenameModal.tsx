"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

function RenameModal() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const [open, setIsRenameModalOpen, fileId, filename] = useAppStore(
    (store) => [
      store.isRenameModalOpen,
      store.setIsRenameModalOpen,
      store.fileId,
      store.filename,
    ]
  );
  async function renameFile() {
    if (!user && !fileId) return;
    const toastId = toast.loading("loading....");

    await updateDoc(doc(db, `users/${user?.id}/files/${fileId}`), {
      filename: input,
    });
    toast.success("Document Renamed ", {
      id: toastId,
    });
    setInput("");
    setIsRenameModalOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename File</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              onChange={(e) => setInput(e.target.value)}
              defaultValue={filename}
              onKeyDownCapture={(e) => {
                if (e.key == "Enter") {
                  renameFile();
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Button
            type="button"
            variant="ghost"
            className="px-3 flex-1"
            onClick={() => setIsRenameModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            Rename
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
