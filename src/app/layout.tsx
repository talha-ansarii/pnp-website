import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import VideoContainer from "./_components/video-container";
import { ViewProvider } from "./_components/view-context";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Prompts and Pixels",
  description: "Prompts and Pixels",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-black text-white antialiased">
        <TRPCReactProvider>
          <ViewProvider>
            <Navbar />

            {/* Desktop / Large screens: show resizable panels */}
            <div className="hidden lg:block">
              <ResizablePanelGroup
                direction="horizontal"
                className="h-[100dvh] w-full"
              >
                <ResizablePanel defaultSize={30}>
                  <div className="h-[100dvh]">
                    <VideoContainer />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel maxSize={100} minSize={70} defaultSize={70}>
                  <div className="h-[100dvh] overflow-y-auto">
                    {children}
                    <Footer />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>

            {/* Mobile view: show the commented layout */}
            <div className="relative block w-full lg:hidden" id="main-layout">
              <div className="sticky top-0 z-10">
                <VideoContainer />
              </div>
              <div className="relative z-50 -mt-[50px] w-full overflow-y-auto rounded-t-[50px]">
                {children}
                <Footer />
              </div>
            </div>
            <Toaster />
          </ViewProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
