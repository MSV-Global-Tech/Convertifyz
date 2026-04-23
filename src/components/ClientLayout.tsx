"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    
    // Simulate a small "loading bar" at the top
    const bar = document.createElement("div");
    bar.id = "nprogress";
    bar.innerHTML = '<div class="bar"><div class="peg"></div></div>';
    document.body.appendChild(bar);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      const existingBar = document.getElementById("nprogress");
      if (existingBar) existingBar.remove();
    }, 300); // Quick 300ms transition

    return () => {
      clearTimeout(timer);
      const existingBar = document.getElementById("nprogress");
      if (existingBar) existingBar.remove();
    };
  }, [pathname]);

  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  );
}
