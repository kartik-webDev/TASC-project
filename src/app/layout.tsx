import type { Metadata } from "next";
import "./globals.css";
import {  AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";


export const metadata: Metadata = {
  title: "TASC",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <Navbar />
          <Toaster/>
          
        {children}
        {/* <Footer/> */}
        </AppContextProvider>
      </body>
    </html>
  );
}
