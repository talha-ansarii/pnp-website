"use client"
import React from 'react'
import Image from 'next/image'


const Home = () => {
  const HERO_GIF = "/hero1.mp4"; 
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const range = window.innerHeight 
      const p = Math.min(1, Math.max(0, -rect.top / range))
      setProgress(p)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scale = 1.06 - progress * 0.06

  React.useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const SCROLL_FACTOR = 0.7

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return 
      e.preventDefault()
      window.scrollBy({ top: e.deltaY * SCROLL_FACTOR, left: 0, behavior: 'auto' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <main className="w-full">
      <section ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `scale(${scale})` }}
          >
            <Image
              src={HERO_GIF}
              alt="Hero background"
              fill
              priority
              unoptimized
              className="absolute inset-0 object-cover"
            />
            {/* <video width="320" height="240" autoPlay loop muted controls preload="none">
              <source src="/hero2.mp4"
               type="video/mp4" />
              Your browser does not support the video tag.
            </video>*/}
          </div> 

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full flex-col">
            <section className="flex flex-1 items-center justify-center px-6 text-center">
              <div>
                <div className="mb-3 text-[10px] tracking-[0.4em] text-white/60 sm:text-xs">
                  {" "}
                  PIXELS AND PROMPTS
                </div>
                <h1 className="mx-auto max-w-3xl text-lg font-light text-white sm:text-xl md:text-2xl">
                  Welcome to Pixels and Prompts
                </h1>
              </div>
            </section>

            <div className="pointer-events-none px-6 pb-6 text-center text-white/80">
              <span className="text-xs">Keep Scrolling</span>
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="bg-black text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-white/60 italic sm:text-base md:text-lg">
            At Visual Identity we thrive in our pursuit, to act with integrity
            and respectfully in the spirit of creation. To create masterful
            design and unparalleled design expertise.
          </p>
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-24 text-center text-[11px] text-white/70 sm:text-xs">
          We are not limited by the rules of design; it is in our genes to
          question limiting beliefs and go beyond expectations of imagination,
          bringing it onto the canvas of our screens. We believe, and live by
          “The Spirit of Creation”.
        </div>
      </section>
      {/* Projects grid */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              { title: "Ai Fiesta" },
              { title: "Distributed Systems" },
              { title: "Tech Blaze" },
              { title: "The Art of AI" },
            ].map((item) => {
              const slug = item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const href = `/blog/${slug}`;
              return (
                <div key={item.title} className="">
                  <div className="group relative overflow-hidden rounded-md bg-zinc-900">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src="/blog/blog.jpg"
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      <a
                        href={href}
                        className="absolute right-3 bottom-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-gray-900 shadow-sm backdrop-blur transition hover:bg-white"
                      >
                        View Blog
                      </a>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg text-white italic sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home