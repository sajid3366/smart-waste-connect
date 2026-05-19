"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  // Routes where navbar and footer should NOT appear
  const hideNavFooterRoutes = ["/login", "/signup", "/dashboard"];

  // Check if current path starts with any of the hidden prefixes
  const hideNavFooter = hideNavFooterRoutes.some((route) =>
    pathName.startsWith(route)
  );

  return (
    <>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
}
