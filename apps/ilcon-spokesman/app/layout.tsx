import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "ILCON 2026",
  description: "Building the next generation of leaders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
