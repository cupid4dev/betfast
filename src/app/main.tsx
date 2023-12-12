"use client";
import { Sidebar, Header } from "@/components";
import { Suspense } from "react";
import Footer from "@/components/Footer";
const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-secondary_back">
        <Suspense>
          <div className="overflow-auto bg-secondary_back">
            <div className="flex main-container">
              <Sidebar />
              <div className="w-full pt-20 bg-secondary_3">{children}</div>
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
