"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useView } from "./view-context";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [movedToBottom, setMovedToBottom] = React.useState(false);
  const { currentView, setCurrentView } = useView();
  const router = useRouter();
  const navRef = useRef < HTMLDivElement | null > (null);
  const hasAnimated = useRef< boolean >(false);
  const isMobile = useIsMobile();
  


  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      localStorage.setItem("scrollY", currentScrollY.toString());
      // Original scroll effect for background
      setScrolled(currentScrollY > 8);

      // Move to bottom with bounce when scrolled past 300px
      if (currentScrollY > 300 && !hasAnimated.current) {
        hasAnimated.current = true;
        setMovedToBottom(true);

        gsap.fromTo(
          navRef.current as Element,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          },
        );
      } else if (currentScrollY <= 300 && hasAnimated.current) {
        hasAnimated.current = false;
        setMovedToBottom(false);

        if(navRef.current) {
        gsap.fromTo(
          navRef.current,
          {
            y: -100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "bounce.out",
          },
        );
      }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initial entrance animation
  React.useEffect(() => {
    if(navRef.current) {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    }
  }, []);

  if(!isMobile) {
    return (
      <nav
        className={
          "fixed inset-x-0 top-0 z-50 transition-colors " +
          (scrolled
            ? "border-b border-white/10 bg-black/60 backdrop-blur"
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
            <button
              onClick={() => {
                router.push("/");
                setCurrentView("videos");
              }}
              className={`cursor-pointer text-[11px] transition hover:text-white ${
                currentView === "videos" ? "text-white" : "text-white/80"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => {
                router.push("/");
                setCurrentView("blog");
              }}
              className={`cursor-pointer text-[11px] transition hover:text-white ${
                currentView === "blog" ? "text-white" : "text-white/80"
              }`}
            >
              Blog
            </button>
            <Link
              href="https://www.manthanai.com/contact"
              target="_blank"
              className="rounded-full bg-white/85 px-3 py-1 text-[11px] text-gray-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Render bottom tab navigation
  if (movedToBottom && isMobile) {
    return (
      <nav
        ref={navRef}
        className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/20 bg-black/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                router.push("/");
                setCurrentView("videos");
              }}
              className={`relative flex-1 px-4 py-4 text-center transition-all ${
                currentView === "videos"
                  ? "text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className="text-xs font-medium">Videos</span>
              {currentView === "videos" && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-white" />
              )}
            </button>

            <button
              onClick={() => {
                router.push("/");
                setCurrentView("blog");
              }}
              className={`relative flex-1 px-4 py-4 text-center transition-all ${
                currentView === "blog"
                  ? "text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className="text-xs font-medium">Blog</span>
              {currentView === "blog" && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-white" />
              )}
            </button>

          </div>
        </div>
      </nav>
    );
  }

  
  // Render top navigation bar
  return (
    <nav
      ref={navRef}
      className={
        "fixed inset-x-0 top-0 z-[100] transition-colors " +
        (scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur"
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
          <button
            onClick={() => {
              router.push("/");
              setCurrentView("videos");
            }}
            className={`cursor-pointer text-[11px] transition hover:text-white ${
              currentView === "videos" ? "text-white" : "text-white/80"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => {
              router.push("/");
              setCurrentView("blog");
            }}
            className={`cursor-pointer text-[11px] transition hover:text-white ${
              currentView === "blog" ? "text-white" : "text-white/80"
            }`}
          >
            Blog
          </button>
          <Link
            href="https://www.manthanai.com/contact"
            target="_blank"
            className="rounded-full bg-white/85 px-3 py-1 text-[11px] text-gray-900 shadow-sm backdrop-blur transition hover:bg-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
