"use client";

import { usePathname } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register";

  if (hideLayout) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
