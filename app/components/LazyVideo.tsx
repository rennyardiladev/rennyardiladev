'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  title?: string;
  story?: boolean;
  poster?: string;
}

export default function LazyVideo({ src, title, story, poster }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      videoRef.current?.play().catch(() => {});
    }
  }, [ready]);

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-black/80 ${story ? 'aspect-[9/16]' : 'aspect-video'}`}>
      {ready ? (
        <video
          ref={videoRef}
          src={src}
          preload="auto"
          playsInline
          muted={story}
          autoPlay={story}
          loop={story}
          controls={!story}
          className={`h-full w-full object-cover ${story ? 'object-top' : ''}`}
        />
      ) : poster ? (
        <>
          <img
            src={poster}
            alt={title ?? 'Video preview'}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <button
            type="button"
            onClick={() => setReady(true)}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/30"
            aria-label={title ? `Reproducir ${title}` : 'Reproducir video'}
          >
            <svg
              className="h-12 w-12 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setReady(true)}
          className="absolute inset-0 flex h-full w-full items-center justify-center"
          aria-label={title ? `Reproducir ${title}` : 'Reproducir video'}
        >
          <svg
            className="h-12 w-12 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
