"use client";
import { Sidebar, Header } from "@/components";
import { Suspense } from "react";
import Footer from "@/components/Footer";
const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <div className="">
            <div className="flex">
              <Sidebar />
              <div className="w-full pt-20">{children}</div>
            </div>
            <Header />
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  );
};

export default CustomLayout;
