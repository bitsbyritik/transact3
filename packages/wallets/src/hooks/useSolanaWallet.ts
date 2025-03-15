"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

export const useSolanaWallet = () => {
  const {
    publicKey,
    signTransaction,
    signMessage,
    connect,
    disconnect,
    wallet,
  } = useWallet();

  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
    } else {
      setWalletAddress(null);
    }
  }, []);

  const handleConnect = useCallback(async () => {
    try {
      if (!wallet) {
        setVisible(true);
        return;
      }
      await connect();
    } catch (error) {
      console.error("Failed tp connect wallet", error);
    }
  }, [connect, wallet, setVisible]);

  const handleDisconnect = useCallback(async () => {
    disconnect();
    setWalletAddress(null);
  }, [disconnect]);

  const signSolanaTransaction = useCallback(
    async (transaction: Transaction) => {
      if (!publicKey || !signTransaction) {
        throw new Error("Wallet not connected");
      }

      //TODO:- need to update transaction logic
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.feePayer = publicKey;
      return await signTransaction(transaction);
    },
    [signTransaction, publicKey, connection],
  );

  const signSolanaMessage = useCallback(
    async (message: string) => {
      if (!publicKey || !signMessage) {
        throw new Error("Wallet not connected");
      }
      const encodedMessage = new TextEncoder().encode(message);
      return await signMessage(encodedMessage);
    },
    [signMessage, publicKey],
  );

  return {
    connect: handleConnect,
    disconnect: handleDisconnect,
    walletAddress,
    signSolanaTransaction,
    signSolanaMessage,
  };
};
