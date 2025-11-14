import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "coffee-snob-coming-soon",
  description: "",
};

const area = localFont({
  src: [
    {
      path: "../../public/fonts/area-normal/fonnts.com-Area_Normal_Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/area-normal/fonnts.com-Area_Extended_ExtraBold.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/area-normal/fonnts.com-Area_Normal_Thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={area.className}>
        {children}
      </body>
    </html>
  );
}
