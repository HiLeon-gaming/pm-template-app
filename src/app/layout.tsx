import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExecNoteShop — PM Template Studio",
  description:
    "Professional Project Management templates for OneNote & Word. Built for PMP-certified leaders.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
