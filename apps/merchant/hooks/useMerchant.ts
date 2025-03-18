import prisma from "@workspace/db/client";
import { useUser } from "./useUser"
import { useEffect, useState } from "react";

interface Merchant {
    id: String;
    walletAddress: string;
    businessName?: string;
}

export const useMerchant = () => {
    const user = useUser();
    const [merchant, setMerchant] = useState<Merchant | null>(null);

    useEffect(() => {
        (async() => {
            const merchantData = await prisma.merchant.findUnique({
                where: {
                    userId: user.user?.id
                }
            })

            if(merchantData){
                setMerchant({
                    id: merchantData.id,
                    walletAddress: merchantData.walletAddress,
                    businessName: merchantData.businessName || undefined
                });
            }
            else {
                setMerchant(null);
            }
        })
    }, []);

    return {merchant};
}