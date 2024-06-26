import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { CSPostHogProvider } from "~/app/_analytics/provider";
import TopNav from "../components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { SideNav } from "~/components/sidenav";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Gallery",
  description: "A gallery of images",
  icons: [{ rel: "icon", url: "/gallery.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body className={`${inter.className} dark relative`}>
            <SignedOut>
              <div className="sticky top-0 z-50 flex w-full items-center justify-center bg-[#020617]">
                <TopNav />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="sticky top-0 z-50 flex w-full items-center justify-center">
                <TopNav />
              </div>
            </SignedIn>
            <main className="flex">
              <SignedIn>
                <SideNav className="z-50 w-0 md:w-1/5" />
              </SignedIn>
              {children}
            </main>
            <Toaster />
            {process.env.NODE_ENV === "development" ? "" : <SpeedInsights />}
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
