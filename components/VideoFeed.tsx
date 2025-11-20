import React, { useRef, useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { VideoData } from '../types';

interface VideoFeedProps {
  videos: VideoData[];
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onShare: (id: string) => void;
  onOpenComments: (id: string) => void;
  onProfileClick: (username: string) => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  onToggleLike,
  onToggleFavorite,
  onShare,
  onOpenComments,
  onProfileClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={index === activeIndex}
          onToggleLike={onToggleLike}
          onToggleFavorite={onToggleFavorite}
          onShare={onShare}
          onOpenComments={onOpenComments}
          onProfileClick={onProfileClick}
        />
      ))}
      
      {videos.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <p className="text-gray-400 mb-4">No videos yet</p>
            <p className="text-sm text-gray-600">Upload something to get started!</p>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;