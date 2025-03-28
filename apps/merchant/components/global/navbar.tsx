"use client";

import { buttonVariants } from "@workspace/ui/components/button";
import Container from "./container";
import Link from "next/link";
import Icons from "./icons";
import { authClient, getSession } from "@/lib/auth-client";
import { ConnectWalletButton } from "@workspace/wallets";
import { cn } from "@workspace/ui/lib/utils";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const { user } = useUser();
  console.log("session", user);

  return (
    <header
      className={cn(
        "px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50",
        user && "bg-muted/50",
      )}
    >
      <Container reverse>
        <div
          className={cn(
            "flex items-center justify-between h-full mx-auto ",
            !user && "md:max-w-screen-xl",
          )}
        >
          <div className="flex items-start">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="w-8 h-8" />
              <span className="text-lg font-medium">Pay3now</span>
            </Link>
          </div>
          {!user && (
            <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center justify-center gap-8">
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  Features
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  Blog
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  Pricing
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  About
                </Link>
              </ul>
            </nav>
          )}
          <div className="flex items-center gap-4">
            {user ? (
              <ConnectWalletButton />
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden md:flex",
                  })}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
