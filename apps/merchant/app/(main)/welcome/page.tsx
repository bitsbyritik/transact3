"use client"

import { createMerchant } from "@/actions/createMerchant";
import { useUser } from "@/hooks/useUser";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useSolanaWallet } from "@workspace/wallets/src/hooks/useSolanaWallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Welcome() {
  const {walletAddress, signSolanaMessage} = useSolanaWallet();
  const router = useRouter();


  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!walletAddress || !signSolanaMessage){
      toast.error("Wallet not connected!");
    }
    else {
      toast.loading("Creating Merchant");
      const formData = new FormData(event.currentTarget);
      const businessName = formData.get("businessName") as string;
      const message = `Create merchant for ${businessName}`;
      try {
         const signature = await signSolanaMessage(message);
         const signatureStr = Buffer.from(signature).toString("base64");
         const res = await createMerchant({message, businessName, walletAddress, signatureStr });
         if(res.newMerchant){
           toast.dismiss();
           toast.success("Registartion Completed");
           router.push("/dashboard");
         }
      } catch (err) {
        toast.dismiss();
        toast.error("Registration Failed!");
      }
  }}

  useEffect(() => {
    if(!walletAddress) {
      toast.warning("Connect Wallet first");
    }
  }, [walletAddress])


  return  (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
  <div className="w-full max-w-sm md:max-w-2xl">
  <div className="flex flex-col gap-6" >
  <Card className="overflow-hidden">
    <CardContent className="flex flex-col justify-center">
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome to Pay3Now</h1>
            <p className="text-balance text-muted-foreground">
              Register your merchant account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
                  <Label htmlFor="email">Business Name</Label>
                  <Input
                    type="text"
                    name="businessName"
                    placeholder="Business name"
                    required
                  />
                </div>
                <Button className="w-full cursor-pointer" type="submit">
                  Continue
                </Button>
          </form>
          </div>
          </div>
    </CardContent>
  </Card>
  <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
    and <a href="#">Privacy Policy</a>.
  </div>
</div>
</div>
</div> )
}
