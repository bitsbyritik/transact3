"use client"

import { ContentCard } from "@/components/ContentCartd";
import { useMerchant } from "@/hooks/useMerchant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const {merchant} = useMerchant();
  const router = useRouter();

  useEffect(() => {
    if(!merchant?.id){
      router.push('/welcome');
    }
  }, [merchant, router])

  if(!merchant?.id){
    return <div>Loading...</div>
  }
 
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 -mt-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <ContentCard className="aspect-video">Hi</ContentCard>
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
