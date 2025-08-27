"use client";

import React, { useState } from 'react';
import VideoModal from './video-modal';

const videos = [
  "/hero/1.mp4",
  "/hero/2.mp4",
  "/hero/3.mp4",
  "/hero/4.mp4",
  "/hero/5.mp4",
  "/hero/6.mp4",
  "/hero/7.mp4",
];

const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; index: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (videoSrc: string, index: number) => {
    setSelectedVideo({ src: videoSrc, index });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className="min-h-screen bg-black px-6 py-10 sm:py-14 lg:py-16">
      <header className="mb-8">
        <h2 className="text-base font-semibold text-white sm:text-lg">Latest Videos</h2>
        <p className="mt-1 text-[11px] text-white/60 sm:text-xs">
          Curated videos from Pixels and Prompts
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((videoSrc, index) => (
          <article key={videoSrc} className="group cursor-pointer" onClick={() => openModal(videoSrc, index)}>
            <div className="relative overflow-hidden rounded-md bg-zinc-900">
              <div className="relative aspect-[9/16] w-full">
                <video
                  src={videoSrc}
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
                
                <div className="absolute right-3 bottom-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-gray-900 shadow-sm backdrop-blur transition group-hover:bg-white">
                  Video {index + 1}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-lg text-white italic sm:text-xl">
                Hero Video {index + 1}
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
        />
      )}
    </section>
  );
};

export default VideosSection;
