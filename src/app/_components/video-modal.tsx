"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  videoIndex: number;
  video: {
    title: string;
    timeUploaded: string;
    
  };
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, videoIndex, video }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-90 fixed inset-0 z-[100] flex items-center justify-center bg-black p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-black lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white transition-colors hover:text-gray-300"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video Section */}
        <div className="flex min-h-[50vh] flex-1 items-center justify-center bg-black lg:min-h-[80vh]">
          <div className="relative h-full w-full max-w-lg">
            <video
              src={videoSrc}
              className="h-full w-full object-contain"
              controls
              autoPlay
              loop
              playsInline
              style={{ aspectRatio: "9/16" }}
            />
          </div>
        </div>

        {/* Metadata Section */}
        <div className="flex w-full flex-col border-t border-gray-800 bg-black p-6 lg:w-80 lg:border-t-0 lg:border-l">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <Link target="_blank" href="https://www.instagram.com/pixel_and_prompt_/" className="flex h-8 w-8 items-center justify-center rounded-full">
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
                className="text-sm font-semibold text-white cursor-pointer hover:underline underline-offset-4"
              >
                pixel_and_prompt_
              </Link>
              <p className="text-xs text-gray-400">{video.timeUploaded}</p>
            </div>
          </div>

          {/* Video Title */}
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-semibold text-white">
              {video.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-300">
              Professional cinematic video showcase featuring dynamic camera
              movements, stunning visual effects, and high-quality production.
              Part of our creative video collection showcasing the artistry of
              Pixels and Prompts.
            </p>
          </div>

          {/* Video Stats */}
          <div className="flex items-center gap-4 border-t border-gray-800 py-3">
            <button className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm">847</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm">23</span>
            </button>
            <button className="ml-auto flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
          </div>

          {/* Technical Details */}
          <div className="mt-4 border-t border-gray-800 pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">5.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Aspect Ratio:</span>
                <span className="text-white">9:16</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quality:</span>
                <span className="text-white">4K UHD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Style:</span>
                <span className="text-white">Cinematic</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 border-t border-gray-800 pt-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300">
                cinematic
              </span>
              <span className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300">
                hero
              </span>
              <span className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300">
                professional
              </span>
              <span className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300">
                4k
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
