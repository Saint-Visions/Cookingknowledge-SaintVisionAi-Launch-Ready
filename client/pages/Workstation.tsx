import React from "react";
import { AppLayout } from "@/components/AppLayout";

export default function Workstation() {
  return (
    <AppLayout>
      <div className="p-8 text-white bg-black min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Workstation</h1>
        <p className="text-xl">Enterprise Command Center</p>
        <p className="mt-4">This is the workstation page - working!</p>
      </div>
    </AppLayout>
  );
}
