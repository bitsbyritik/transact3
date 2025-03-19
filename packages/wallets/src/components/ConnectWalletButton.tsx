"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSolanaWallet } from "../hooks/useSolanaWallet";
import { Button } from "@workspace/ui/components/button";
import { useWallet } from "@solana/wallet-adapter-react";

export const ConnectWalletButton = () => {
  const { connect, disconnect, walletAddress } = useSolanaWallet();
  const { connected } = useWallet();
  return (
    <Button
      className="cursor-pointer"
      variant={"default"}
      onClick={() => (connected ? disconnect() : connect())}
    >
      {connected ? "Disconnect" : "Connect Wallet"}
    </Button>
  );
};
