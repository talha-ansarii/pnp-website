import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="text-[10px] tracking-[0.4em] text-white/70 sm:text-xs">
            PROMPTS AND PIXELS
          </div>
          <nav className="flex flex-wrap items-center gap-5">
            <Link href="/#projects" className="text-[11px] text-white/70 transition hover:text-white">
              Work
            </Link>
            <Link href="/blog/ai-fiesta" className="text-[11px] text-white/70 transition hover:text-white">
              Blog
            </Link>
            <Link href="#contact" className="text-[11px] text-white/70 transition hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Prompts and Pixels. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


