// components/FloatingYoutubePlayer.tsx
'use client'
import YouTube from 'react-youtube';
import { Rnd } from 'react-rnd';
import React, { useEffect, useState } from 'react';

import './index.scss';

const FloatingYoutubePlayer = ({ playlistId }: { playlistId: string }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 420, height: 200 });

  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: window.innerWidth - size.width - 200,
        y: window.innerHeight - size.height - 10,
      });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [size]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      listType: 'playlist',
      list: playlistId,
    },
  };

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  return (
    <Rnd
      position={position}
      size={size}
      bounds="window"
      className="floating-player"
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPosition(position);
      }}
    >
      <YouTube className="youtube-player" videoId={playlistId} opts={opts} onReady={onReady} />
    </Rnd>
  );
};

export default FloatingYoutubePlayer;
