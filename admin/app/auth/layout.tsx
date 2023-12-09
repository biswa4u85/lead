import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Signin Page",
  description: "This is Signin page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main>{children}</main>
  )
}