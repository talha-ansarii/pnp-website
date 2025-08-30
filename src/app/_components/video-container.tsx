"use client"
import { useEffect, useState } from "react";

const videos = [
  "/hero/1.mp4",
  "/hero/2.mp4",
  "/hero/3.mp4",
  "/hero/4.mp4",
  "/hero/5.mp4",
  "/hero/6.mp4",
  "/hero/7.mp4",
];


const VideoContainer = () => {
    const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
      setCurrentVideo(Math.floor(Math.random() * Object.keys(videos).length));
    }, []);


  return (
    <aside className="relative h-[60vh] md:h-[70vh] lg:sticky lg:top-0 lg:h-screen">
      <video
        key={videos[currentVideo]}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      >
        <source src={videos[currentVideo]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="absolute top-1/2 right-0 left-0 z-10 -translate-y-1/2 px-6 text-center">
        <div className="mb-2 text-[10px] tracking-[0.4em] text-white/60 sm:text-xs">
          PIXELS AND PROMPTS
        </div>
        <h1 className="mx-auto max-w-3xl text-lg font-light text-white sm:text-xl md:text-2xl">
          Welcome to Pixels and Prompts
        </h1>
      </div>
    </aside>
  );
}

export default VideoContainer