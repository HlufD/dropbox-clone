"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

function DrapZoneCompoent() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const max = 20971520;

  const onDrop = (acceptedFiles: File[]) => {
    console.log("droped");

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted!");
      reader.onerror = () => console.log("There was error when uploading file");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);
    const toastId = toast.loading("loading....");
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImage: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    uploadBytes(imageRef, selectedFile).then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl: downloadUrl,
      });
    });
    toast.success("Document Uploaded ", {
      id: toastId,
    });
    setLoading(false);
  };
  return (
    <Dropzone maxSize={max} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileToLard =
          fileRejections.length > 0 && fileRejections[0].file.size > max;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "mt-4 w-full h-52 flex justify-center items-center border border-dashed p-5 rounded-xl text-center",
                isDragActive
                  ? "bg-[#035ffe] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click or Drag and Drop file"}
              {isDragActive && !isDragReject && "Drop to upload file"}
              {isDragReject && "File type not supported"}
              {isFileToLard && (
                <div className="text-red-500">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DrapZoneCompoent;
