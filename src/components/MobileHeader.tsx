"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// We'll use a custom event to toggle the sidebar from here
export default function MobileHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  };

  return (
    <header
      className="lg:hidden sticky top-0 z-40 flex items-center h-16 px-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(2, 4, 10, 0.9)" : "rgba(2, 4, 10, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="no-underline">
          <span className="text-sm font-bold tracking-[0.1em] uppercase heading-gradient">
            Quant OS
          </span>
        </Link>
      </div>
    </header>
  );
}
