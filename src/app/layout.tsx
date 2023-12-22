import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Provider";
import CustomLayout from "./main";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bet Fast",
  description: "Sports Betting platform on solana network.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-secondary_back"}>
        <Providers>
          <CustomLayout>{children}</CustomLayout>
        </Providers>
      </body>
    </html>
  );
}
