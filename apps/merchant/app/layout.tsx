import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { SolanaProvider } from "@workspace/wallets";
import { base, heading } from "@/config/font";
import { Toaster } from "sonner";
import { cn } from "@workspace/ui/lib/utils";
// export const metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          base.variable,
          heading.variable,
        )}
      >
        <Providers>
          <SolanaProvider>
            {children}
            <Toaster richColors />
          </SolanaProvider>
        </Providers>
      </body>
    </html>
  );
}
