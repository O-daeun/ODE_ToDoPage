import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToDoList",
  description: "To do list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
