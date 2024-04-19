"use client";

import { useEffect } from "react";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lol workaround
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return <section style={{ overflow: "hidden" }}>{children}</section>;
}
