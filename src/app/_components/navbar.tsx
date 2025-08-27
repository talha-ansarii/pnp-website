"use client";

import Link from "next/link";
import React from "react";
import { useView } from "./view-context";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const { currentView, setCurrentView } = useView();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors " +
        (scrolled
          ? "bg-black/60 backdrop-blur border-b border-white/10"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-[10px] tracking-[0.4em] text-white/80 hover:text-white sm:text-xs"
        >
          PIXELS AND PROMPTS
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/#projects"
            className="text-[11px] text-white/80 transition hover:text-white"
          >
            Work
          </Link>
          <button
            onClick={() => setCurrentView('blog')}
            className={`text-[11px] transition hover:text-white ${
              currentView === 'blog' ? 'text-white' : 'text-white/80'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => setCurrentView('videos')}
            className={`text-[11px] transition hover:text-white ${
              currentView === 'videos' ? 'text-white' : 'text-white/80'
            }`}
          >
            Videos
          </button>
          <Link
            href="#contact"
            className="rounded-full bg-white/85 px-3 py-1 text-[11px] text-gray-900 shadow-sm backdrop-blur transition hover:bg-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}


