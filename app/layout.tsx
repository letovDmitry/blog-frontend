"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import { setupStore } from "./store/store";

const inter = Inter({ subsets: ["latin"] });

const store = setupStore();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
