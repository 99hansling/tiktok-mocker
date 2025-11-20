import React, { useRef, useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music2, Play } from 'lucide-react';
import { VideoData } from '../types';

interface VideoCardProps {
  video: VideoData;
  isActive: boolean;
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onShare: (id: string) => void;
  onOpenComments: (id: string) => void;
  onProfileClick: (username: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive,
  onToggleLike,
  onToggleFavorite,
  onShare,
  onOpenComments,
  onProfileClick
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle auto-play/pause based on active state
  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPlayIcon(false);
          })
          .catch((error) => {
            console.warn("Autoplay prevented:", error);
            setIsPlaying(false);
            setShowPlayIcon(true);
          });
      }
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowPlayIcon(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowPlayIcon(false);
        // Flash effect for play icon could go here
        setTimeout(() => setShowPlayIcon(false), 200);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent video pause
    onProfileClick(video.username);
  };

  return (
    <div className="relative w-full h-full bg-black snap-start shrink-0 overflow-hidden">
      {/* Video Player */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover cursor-pointer"
        loop
        playsInline
        muted={false} // In a real app, manage mute state globally or start muted
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Play Pause Overlay Icon */}
      {showPlayIcon && (
        <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in fade-in duration-200"
        >
            <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm">
                <Play className="w-12 h-12 text-white/90 fill-white/90 ml-1" />
            </div>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800/50 z-20">
         <div 
            className="h-full bg-white/80 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
         />
      </div>

      {/* Right Sidebar Actions */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-6 z-20">
        
        {/* Avatar */}
        <div className="relative group cursor-pointer" onClick={handleProfileClick}>
          <div className="w-12 h-12 rounded-full p-[1px] bg-white transition-transform hover:scale-105">
             <img 
                src={video.userAvatar} 
                alt={video.username} 
                className="w-full h-full rounded-full object-cover" 
             />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fe2c55] rounded-full w-5 h-5 flex items-center justify-center">
            <span className="text-white text-lg font-bold leading-none">+</span>
          </div>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); onToggleLike(video.id); }}>
          <Heart 
            className={`w-8 h-8 transition-all duration-200 ${video.isLiked ? 'fill-[#fe2c55] text-[#fe2c55] scale-110' : 'text-white fill-white/10 hover:scale-105'}`} 
          />
          <span className="text-white text-xs font-medium drop-shadow-md">{video.likes}</span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); onOpenComments(video.id); }}>
          <MessageCircle className="w-8 h-8 text-white fill-white/90 drop-shadow-md hover:scale-105 transition-transform" />
          <span className="text-white text-xs font-medium drop-shadow-md">{video.comments}</span>
        </div>

        {/* Favorite */}
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); onToggleFavorite(video.id); }}>
          <Bookmark className={`w-8 h-8 transition-all duration-200 ${video.isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-white fill-white/10'}`} />
          <span className="text-white text-xs font-medium drop-shadow-md">{video.shares}</span> 
          {/* Using shares count as favorites for demo simplicity */}
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); onShare(video.id); }}>
          <Share2 className="w-8 h-8 text-white fill-white/10 drop-shadow-md hover:scale-105 transition-transform" />
          <span className="text-white text-xs font-medium drop-shadow-md">Share</span>
        </div>

        {/* Disc Animation */}
        <div className="mt-4 relative">
             <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden animate-[spin_5s_linear_infinite]">
                <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                    <img src={video.userAvatar} alt="disc" className="w-full h-full object-cover opacity-80" />
                </div>
             </div>
        </div>
      </div>

      {/* Bottom Info Area */}
      <div className="absolute bottom-4 left-4 right-16 z-10 flex flex-col gap-2 pointer-events-none">
        <div 
            className="text-white font-bold text-lg drop-shadow-md text-shadow cursor-pointer pointer-events-auto w-fit hover:underline"
            onClick={handleProfileClick}
        >
            @{video.username}
        </div>
        <div className="text-white/90 text-sm leading-tight line-clamp-2 drop-shadow-md">
            {video.description} <span className="font-bold">#viral #fyp</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
            <Music2 className="w-3 h-3 text-white" />
            <div className="text-white text-xs font-medium w-32 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block">
                   {video.songName} &nbsp; • &nbsp; Original Sound &nbsp; • &nbsp;
                </div>
            </div>
        </div>
      </div>

      {/* Background Gradient for readability */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-0" />
    </div>
  );
};

export default VideoCard;