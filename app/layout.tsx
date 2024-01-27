"use client";
import { SessionProvider } from 'next-auth/react'
import { Flip, ToastContainer } from "react-toastify";
import "../assets/css/font.css";
import "../assets/css/color.css";
import "../assets/css/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function Root({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
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