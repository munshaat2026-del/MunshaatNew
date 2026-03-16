"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationInfoGrid from "./ApplicationInfoGrid";
import { ApplicationGetPayloadWithCareer } from "@/types";

interface Props {
  applicationDetails: ApplicationGetPayloadWithCareer;
  markApplicationAsShownAction: (id: string) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function ApplicationDetailsClient({ applicationDetails, markApplicationAsShownAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkAsShown = async () => {
    if (!applicationDetails.id) return;
    setLoading(true);
    try {
      const result = await markApplicationAsShownAction(applicationDetails.id);
      if (result.status === 201) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <ApplicationHeader 
        isShown={!!applicationDetails.is_shown} 
        onMarkAsShown={handleMarkAsShown} 
        loading={loading} 
      />

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Sidebar */}
          <div className="lg:col-span-4">
            <ApplicationSidebar application={applicationDetails} />
          </div>

          {/* Right: Detailed Content */}
          <div className="lg:col-span-8">
            <ApplicationInfoGrid application={applicationDetails} />
          </div>
        </div>
      </main>
    </div>
  );
}