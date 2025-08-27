import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import VideoContainer from "./_components/video-container";
import { ViewProvider } from "./_components/view-context";

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
            <div className="w-full lg:grid lg:grid-cols-3">
              <VideoContainer />
              <div className="w-full col-span-2">
                {children}
                <Footer />
              </div>
            </div>
          </ViewProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
