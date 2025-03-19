"use server"
import { auth } from "@/lib/auth"
import prisma from "@workspace/db/client";
import { headers } from "next/headers"

export async function getMerchant() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        const userId = session?.user.id;

        const merchant = await prisma.merchant.findUnique({
            where:{
                userId: userId
            }
        })
        
        return {merchant};


    } catch (err) {
        return {error: err};
    }
}