import { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ProjectInBio",
    default: "ProjectInBio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${redHatDisplay.className} bg-background-primary text-content-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
