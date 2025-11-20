import React, { useState } from 'react';
import { Plus, Search, Tv, Film } from 'lucide-react';
import VideoFeed from './components/VideoFeed';
import CommentDrawer from './components/CommentDrawer';
import ProfileView from './components/ProfileView';
import DiscoverView from './components/DiscoverView';
import InboxView from './components/InboxView';
import { VideoData, Comment } from './types';

// Initial Mock Data
const INITIAL_VIDEOS: VideoData[] = [
  {
    id: '1',
    url: 'https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Raindrops_Videvo_preview.mp4',
    username: 'nature_lover',
    userAvatar: 'https://picsum.photos/100/100?random=1',
    description: 'Rainy days in the forest 🌧️ relaxing vibes only.',
    songName: 'Rain Sounds - Nature',
    likes: 1240,
    comments: 45,
    shares: 89,
    isLiked: false,
    isFavorited: false,
    commentList: [
        { id: 'c1', username: 'alex_w', avatar: 'https://picsum.photos/50?random=10', text: 'So peaceful!', likes: 5, timestamp: '2h' },
        { id: 'c2', username: 'sarah_j', avatar: 'https://picsum.photos/50?random=11', text: 'I need this right now.', likes: 2, timestamp: '1h' }
    ]
  },
  {
    id: '2',
    url: 'https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4',
    username: 'city_wanderer',
    userAvatar: 'https://picsum.photos/100/100?random=2',
    description: 'Tokyo nights are just different 🏮✨',
    songName: 'Midnight City - M83',
    likes: 8500,
    comments: 120,
    shares: 430,
    isLiked: true,
    isFavorited: false,
    commentList: []
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    username: 'neon_vibes',
    userAvatar: 'https://picsum.photos/100/100?random=3',
    description: 'Cyberpunk aesthetic IRL 🤖',
    songName: 'Future Tech - Sound',
    likes: 560,
    comments: 12,
    shares: 4,
    isLiked: false,
    isFavorited: true,
    commentList: []
  }
];

type ViewState = 'home' | 'discover' | 'inbox' | 'me' | 'user_profile';

function App() {
  const [videos, setVideos] = useState<VideoData[]>(INITIAL_VIDEOS);
  const [activeCommentVideoId, setActiveCommentVideoId] = useState<string | null>(null);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [viewHistory, setViewHistory] = useState<ViewState[]>(['home']); // Simple history for back navigation
  const [selectedUserProfile, setSelectedUserProfile] = useState<string>('');

  const handleTabChange = (view: ViewState) => {
    if (view === currentView) return;
    setCurrentView(view);
    setViewHistory(prev => [...prev, view]);
  };

  const handleNavigateToProfile = (username: string) => {
    setSelectedUserProfile(username);
    setCurrentView('user_profile');
    setViewHistory(prev => [...prev, 'user_profile']);
  };

  const handleBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop(); // Remove current
      const prevView = newHistory[newHistory.length - 1];
      setViewHistory(newHistory);
      setCurrentView(prevView);
    } else {
      setCurrentView('home');
    }
  };

  // Interaction Handlers
  const handleToggleLike = (id: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 };
      }
      return v;
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id === id) return { ...v, isFavorited: !v.isFavorited };
      return v;
    }));
  };

  const handleShare = (id: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this video!',
        url: window.location.href
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard! (Simulated)");
    }
    
    setVideos(prev => prev.map(v => {
        if (v.id === id) return { ...v, shares: v.shares + 1 };
        return v;
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const videoUrl = URL.createObjectURL(file);
    const newVideo: VideoData = {
      id: Date.now().toString(),
      url: videoUrl,
      username: 'me',
      userAvatar: 'https://picsum.photos/100/100?random=99',
      description: `My uploaded video: ${file.name.slice(0, 20)}...`,
      songName: 'Original Sound - Me',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isFavorited: false,
      commentList: []
    };

    // Add to beginning of list
    setVideos(prev => [newVideo, ...prev]);
    
    // Reset input
    event.target.value = '';
    
    // Switch to home to see upload
    handleTabChange('home');
  };

  const handleAddComment = (text: string) => {
    if (!activeCommentVideoId) return;

    const newComment: Comment = {
        id: Date.now().toString(),
        username: 'me',
        avatar: 'https://picsum.photos/100/100?random=99',
        text: text,
        timestamp: 'Just now',
        likes: 0
    };

    setVideos(prev => prev.map(v => {
        if (v.id === activeCommentVideoId) {
            return { 
                ...v, 
                commentList: [...v.commentList, newComment],
                comments: v.comments + 1
            };
        }
        return v;
    }));
  };

  const activeVideo = videos.find(v => v.id === activeCommentVideoId);

  // Render Logic
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 z-40 pt-4 pb-2 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                <div className="flex justify-center items-center gap-4 text-base font-bold pointer-events-auto">
                    <button className="text-white/60 transition-all">Following</button>
                    <div className="w-[1px] h-3 bg-white/20"></div>
                    <button className="text-white scale-110 transition-all">For You</button>
                </div>
                <button className="absolute right-4 top-4 text-white pointer-events-auto">
                    <Search className="w-5 h-5" />
                </button>
                <button className="absolute left-4 top-4 text-white pointer-events-auto">
                    <Tv className="w-5 h-5" />
                </button>
            </div>
            <VideoFeed 
                videos={videos}
                onToggleLike={handleToggleLike}
                onToggleFavorite={handleToggleFavorite}
                onShare={handleShare}
                onOpenComments={setActiveCommentVideoId}
                onProfileClick={handleNavigateToProfile}
            />
          </div>
        );
      case 'discover':
        return <DiscoverView />;
      case 'inbox':
        return <InboxView />;
      case 'me':
        return (
            <ProfileView 
                username="me" 
                isCurrentUser={true} 
                videos={videos} 
                onBack={() => {}} 
            />
        );
      case 'user_profile':
        return (
            <ProfileView 
                username={selectedUserProfile} 
                isCurrentUser={selectedUserProfile === 'me'} 
                videos={videos} 
                onBack={handleBack} 
            />
        );
      default:
        return null;
    }
  };

  const isHome = currentView === 'home';

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden flex justify-center">
      
      {/* Main Container (Mobile Width on Desktop) */}
      <div className="w-full md:w-[400px] h-full relative bg-black md:border-x md:border-gray-800 shadow-2xl flex flex-col">
        
        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
            {renderContent()}
        </div>

        {/* Comment Drawer */}
        <CommentDrawer 
            isOpen={!!activeCommentVideoId}
            onClose={() => setActiveCommentVideoId(null)}
            comments={activeVideo?.commentList || []}
            onAddComment={handleAddComment}
            videoDescription={activeVideo?.description || ''}
        />

        {/* Bottom Tab Bar */}
        <div className={`h-14 ${isHome ? 'bg-black border-white/10' : 'bg-black border-gray-800'} border-t flex justify-around items-center px-2 z-40 shrink-0`}>
            <div 
                className={`flex flex-col items-center gap-1 cursor-pointer ${currentView === 'home' ? 'text-white' : 'text-gray-500'}`}
                onClick={() => handleTabChange('home')}
            >
                <Film className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
            </div>
            
            <div 
                className={`flex flex-col items-center gap-1 cursor-pointer ${currentView === 'discover' ? 'text-white' : 'text-gray-500'}`}
                onClick={() => handleTabChange('discover')}
            >
                <Search className="w-5 h-5" />
                <span className="text-[10px] font-medium">Discover</span>
            </div>

            {/* Upload Button */}
            <div className="relative">
                <label className="cursor-pointer flex items-center justify-center w-12 h-8 bg-gradient-to-r from-cyan-400 to-red-500 rounded-lg hover:opacity-90 transition-opacity">
                    <div className="w-10 h-full bg-white rounded-md flex items-center justify-center mx-[2px]">
                         <Plus className="w-5 h-5 text-black" />
                    </div>
                    <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={handleFileUpload}
                    />
                </label>
            </div>

            <div 
                className={`flex flex-col items-center gap-1 cursor-pointer ${currentView === 'inbox' ? 'text-white' : 'text-gray-500'}`}
                onClick={() => handleTabChange('inbox')}
            >
                <MessageCircleIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Inbox</span>
            </div>
            
            <div 
                className={`flex flex-col items-center gap-1 cursor-pointer ${currentView === 'me' ? 'text-white' : 'text-gray-500'}`}
                onClick={() => handleTabChange('me')}
            >
                <div className={`w-6 h-6 rounded-full overflow-hidden border ${currentView === 'me' ? 'border-white' : 'border-gray-600'}`}>
                    <img src="https://picsum.photos/100/100?random=99" alt="me" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-medium">Me</span>
            </div>
        </div>
      </div>
    </div>
  );
}

// Quick Icon Helper since Lucide import might conflict with my custom naming in tab bar
const MessageCircleIcon = ({ className }: { className: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);

export default App;