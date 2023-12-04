import DrapZoneCompoent from "@/components/DrapZoneCompoent";
import TableWrapper from "@/components/Table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

async function Dashboard() {
  const { userId } = auth();
  const documets = await getDocs(collection(db, "users", userId!, "files"));
  const skelteonData: FileType[] = documets.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    profileImage: doc.data().profileImage,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="mb-16">
      <DrapZoneCompoent />
      <section className="container space-y-5">
        <h2 className="font-bold mt-10">All files</h2>
        <div>
          {/* Taable Wrapper */}
          <TableWrapper skelteonData={skelteonData} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
