"use server"
import prisma from "@workspace/db/client";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function createMerchant({ message, businessName, walletAddress, signatureStr}:{
   message: string, businessName: string, walletAddress: string, signatureStr: string
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        const userId = session?.user.id;
        
        if(!userId) throw new Error("Authentication failed");

        const publicKey = new PublicKey(walletAddress);
        const decodedSign = Buffer.from(signatureStr, "base64");
        const encodedMessage = new TextEncoder().encode(message);

        const isValid = nacl.sign.detached.verify(encodedMessage, decodedSign, publicKey.toBytes());
        if(!isValid) throw new Error("Signature verification failed");

        const newMerchant = await prisma.merchant.create({
            data:{
                businessName: businessName,
                walletAddress: walletAddress,
                userId: userId
            }
        })
        
        await prisma.user.update({
            where:{
                id: userId
            },
            data:{
                merchantId: newMerchant.id
            }
        })

        return {newMerchant}

    } catch (error) {
        return {error: error}
    }
}