import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffee Snob Coming Soon",
  icons: {
    icon: "/snob-wordmark.svg",
  },
};

const area = localFont({
  src: [
    {
      path: "../../public/fonts/area-normal/fonnts.com-Area_Inktrap_Regular.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/area-normal/fonnts.com-Area_Normal_SemiBold.otf",
      weight: "900",
      style: "bold",
    },
    {
      path: "../../public/fonts/area-normal/fonnts.com-Area_Inktrap_Thin.otf",
      weight: "100",
      style: "thin",
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
