import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Auth Page",
  description: "This is Auth page",
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