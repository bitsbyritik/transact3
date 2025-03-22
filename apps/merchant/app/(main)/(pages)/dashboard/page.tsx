import { getMerchant } from "@/actions/getMerchant";
import { ContentCard } from "@/components/ContentCard";
import { TransactionCard } from "@/components/TransactionCard";
import { SectionCards } from "@/components/section-card";
import { redirect } from "next/navigation";

export default async function Page() {
  const {merchant} = await getMerchant();

  if(!merchant?.id){
    redirect("/welcome");
  }

  return (
    <div className="-mt-10">
    <div className="@container/main flex flex-1 flex-col gap-2">
       <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      </div>
      <TransactionCard />
    </div>
    </div>
  );
}
