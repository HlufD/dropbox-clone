"use client";

import { FileType } from "@/typing";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

function TableWrapper({ skelteonData }: { skelteonData: FileType[] }) {
  const { user } = useUser();
  const [initialFiels, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [docs, loadding, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );
  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      profileImage: doc.data().profileImage,
      downloadUrl: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
    }));
    setInitialFiles(files);
  }, [docs]);
  if (docs?.docs.length == undefined) {
    return (
      <div className="flex flex-col">
        <Button variant="outline" className="h-10 w-36 ml-auto mb-4">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </Button>
        <div className="border rounded-lg">
          <div className="border-b h-12"></div>
          {skelteonData.map((doc) => {
            return (
              <div
                key={doc.id}
                className="flex items-center w-full space-x-4 p-5"
              >
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (skelteonData.length == 0) {
    return (
      <div className="flex items-center w-full space-x-4 p-5">
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Button
        variant="outline"
        className="h-10 w-fit ml-auto mb-4"
        onClick={() => setSort(sort == "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiels} />
    </div>
  );
}

export default TableWrapper;
