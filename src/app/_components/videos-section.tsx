"use client";

import React, { useState } from 'react';
import VideoModal from './video-modal';
import Link from 'next/link';
import Image from 'next/image';
import { videos } from '@/data/videos';



const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; index: number, video: { title: string; timeUploaded: string } } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (videoSrc: string, index: number, video: { title: string; timeUploaded: string }) => {
    setSelectedVideo({ src: videoSrc, index, video: { title: video.title, timeUploaded: video.timeUploaded } });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className="min-h-screen bg-black px-6 py-10 sm:py-14 lg:py-16">
      <header className="mb-8">
        <h2 className="text-base font-semibold text-white sm:text-lg">
          Latest Videos
        </h2>
        <p className="mt-1 text-[11px] text-white/60 sm:text-xs">
          Curated videos from Pixels and Prompts
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <article key={video.src} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-md bg-zinc-900">
              <div className="relative aspect-[9/16] w-full">
                <div className="mt-2 mb-4 ml-2 flex w-full items-center gap-3">
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/pixel_and_prompt_/"
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    <Image
                      src="/logo.jpg"
                      alt="pixel_and_prompt_"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </Link>
                  <div>
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/pixel_and_prompt_/"
                      className="cursor-pointer text-sm font-semibold text-white underline-offset-4 hover:underline"
                    >
                      pixel_and_prompt_
                    </Link>
                    <p className="text-xs text-gray-400">{video.timeUploaded}</p>
                  </div>
                </div>
                <video
                  onClick={() => openModal(video.src, index, video)}
                  src={video.src}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                  onLoadedData={(e) => {
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />

                <Link
                  href={video.link}
                  className="absolute right-3 bottom-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-gray-900 shadow-sm backdrop-blur transition group-hover:bg-white"
                >
                  Link
                </Link>
              </div>
              </div>
            <div className="mt-3">
              <h3 className="text-lg text-white italic sm:text-xl">
                {video.title}
              </h3>
            </div>
          </article>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoSrc={selectedVideo.src}
          videoIndex={selectedVideo.index}
          video={selectedVideo.video}
        />
      )}
    </section>
  );
};

export default VideosSection;
