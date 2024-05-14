import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/util/tanstack/getQueryClient";
import Link from "next/link";
import TopMenu from "@/components/ui/TopMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather - Aquariux",
  description: "Technical assessment test using weather API @ Open Weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  return (
    <html lang="en">
      <Providers>
        <HydrationBoundary state={dehydratedState}>
          <body className={inter.className}>
            <TopMenu />
            <div className="container mx-auto p-4">{children}</div>
          </body>
        </HydrationBoundary>
      </Providers>
    </html>
  );
}
