"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getMerchant } from "./getMerchant";
import prisma from "@workspace/db/client";

export async function createpaymentLink({amount}: {amount: string}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if(!session){
            return {error:"User not found! Please re-login"}
        }

        const {merchant} = await getMerchant();
        if(!merchant){
            return {error: "No merchant found!"}
        }

        const paymentLink = await prisma.paymentLink.create({
            data:{
                merchantId: merchant?.id,
                amount: amount,
                status: "ACTIVE"
            }
        })

        if(paymentLink){
            return {success: "Payment link Created!"}
        }

    } catch(err){
        return {error: err}
    }
}