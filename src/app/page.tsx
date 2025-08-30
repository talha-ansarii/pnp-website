"use client";
import React from 'react';
import Image from 'next/image';
import { useView } from './_components/view-context';
import VideosSection from './_components/videos-section';
import { blogs } from '@/data/blog';


const Home = () => {
  const { currentView } = useView();
  
  
  return (
    <main className="bg-black text-white">
      {currentView === "videos" ? (
        <VideosSection />
      ) : (
        <section className="min-h-screen max-w-3xl mx-auto bg-black px-6 py-10 sm:py-14 lg:py-16">
          <header className="mb-8">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Latest Blogs
            </h2>
            <p className="mt-1 text-[11px] text-white/60 sm:text-xs">
              Curated reads from Pixels and Prompts
            </p>
          </header>

          <div className="space-y-8">
            {blogs.map((item) => {
              const href = `/blog/${item.slug}`;
              return (
                <article key={item.title} className="">
                  <div className="group relative overflow-hidden rounded-md bg-zinc-900">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={item.src}
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
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

export default Home