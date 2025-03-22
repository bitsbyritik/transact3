import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getMerchant } from "./getMerchant";
import prisma from "@workspace/db/client";

export async function getPaymentLinks() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if(!session){
            return {error: "User not found! Please re-login"}
        }

        const {merchant} = await getMerchant();

        const paymentLinks = await prisma.paymentLink.findMany({
            where: {
                merchantId: merchant?.id
            }
        })

        return {paymentLinks}

    } catch (err) {
        return {error: err}
    }
    
}