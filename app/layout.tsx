"use client";
import { SessionProvider } from 'next-auth/react'
import { Flip, ToastContainer } from "react-toastify";
import "../assets/css/font.css";
import "../assets/css/color.css";
import "../assets/css/globals.css";
import "react-toastify/dist/ReactToastify.css";

import localFont from 'next/font/local';
const cooper = localFont({
  src: [
    {
      path: '../public/fonts/Fellix-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/Fellix-Regular.ttf',
      weight: '700',
    },
  ],
});

export default function Root({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <style jsx global>{`
        :root {
          /* ... */
          --cooper-font: ${cooper.style.fontFamily};
        }
      `}</style>
        <SessionProvider>
          {children}
        </SessionProvider>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
        />
      </body>
    </html>
  );
}