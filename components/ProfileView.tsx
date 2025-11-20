import React from 'react';
import { ArrowLeft, Instagram, Link as LinkIcon, Menu, Settings } from 'lucide-react';
import { VideoData } from '../types';

interface ProfileViewProps {
  username: string;
  isCurrentUser: boolean;
  videos: VideoData[];
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ username, isCurrentUser, videos, onBack }) => {
  // Filter videos for this user (mock logic: if 'me', show uploaded, otherwise show specific or random subset)
  const userVideos = isCurrentUser 
    ? videos.filter(v => v.username === 'me' || v.username === 'currentUser') 
    : videos.filter(v => v.username === username);

  // If viewing someone else and they have no videos in our mock data, just show some random ones for visual completeness
  const displayVideos = userVideos.length > 0 ? userVideos : (isCurrentUser ? [] : videos.slice(0, 3));

  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto no-scrollbar pb-20 animate-in fade-in duration-300">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <div className="w-8">
          {!isCurrentUser && (
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          {isCurrentUser && <button><Settings className="w-6 h-6" /></button>}
        </div>
        <div className="font-bold text-base">{isCurrentUser ? 'Profile' : username}</div>
        <div className="w-8 flex justify-end">
          <button><Menu className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
             <img 
               src={isCurrentUser ? "https://picsum.photos/100/100?random=99" : `https://picsum.photos/seed/${username}/200/200`} 
               alt={username} 
               className="w-full h-full object-cover" 
             />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-1">@{username}</h2>
        
        <div className="flex items-center gap-6 mt-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">142</span>
            <span className="text-xs text-gray-400">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">10.5K</span>
            <span className="text-xs text-gray-400">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">50K</span>
            <span className="text-xs text-gray-400">Likes</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
           {isCurrentUser ? (
             <button className="px-8 py-3 bg-gray-800 rounded-[4px] text-sm font-semibold">Edit profile</button>
           ) : (
             <>
                <button className="px-10 py-3 bg-[#fe2c55] rounded-[4px] text-sm font-semibold text-white">Follow</button>
                <button className="px-4 py-3 bg-gray-800 rounded-[4px] text-sm font-semibold"><Instagram className="w-4 h-4"/></button>
             </>
           )}
        </div>
        
        <p className="text-sm text-center px-8 text-gray-300">
          {isCurrentUser ? "Digital creator 🎥 | Tech enthusiast 💻 | Creating cool stuff" : "Just living life one frame at a time. 📸"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-gray-800 mt-2">
        <div className="flex-1 py-3 flex justify-center border-b-2 border-white cursor-pointer">
           <Menu className="w-5 h-5" />
        </div>
        <div className="flex-1 py-3 flex justify-center text-gray-500 cursor-pointer">
           <div className="w-5 h-5 text-center font-bold leading-none">♡</div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-[1px]">
        {displayVideos.map((video, idx) => (
            <div key={idx} className="aspect-[3/4] bg-gray-900 relative">
                <video 
                    src={video.url} 
                    className="w-full h-full object-cover" 
                    muted // muted to act as thumbnail
                />
                <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-xs drop-shadow-md">
                    <span>▷</span>
                    <span>{video.likes}</span>
                </div>
            </div>
        ))}
        {/* Fillers to look populated if empty */}
        {displayVideos.length === 0 && (
             <div className="col-span-3 py-10 text-center text-gray-500 text-sm">
                No videos yet
             </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;