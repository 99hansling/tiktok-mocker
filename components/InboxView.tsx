import React from 'react';
import { MessageCircle, Heart, User } from 'lucide-react';

const InboxView: React.FC = () => {
  const activities = [
    { id: 1, type: 'like', user: 'sarah_j', text: 'liked your video', time: '2h', avatar: 'https://picsum.photos/50?random=11' },
    { id: 2, type: 'follow', user: 'mike_bike', text: 'started following you', time: '4h', avatar: 'https://picsum.photos/50?random=12' },
    { id: 3, type: 'comment', user: 'alex_w', text: 'commented: "Awesome!"', time: '1d', avatar: 'https://picsum.photos/50?random=10' },
    { id: 4, type: 'like', user: 'nature_lover', text: 'liked your comment', time: '1d', avatar: 'https://picsum.photos/50?random=1' },
    { id: 5, type: 'system', user: 'TikTok Clone', text: 'Welcome to the app!', time: '1w', avatar: 'https://picsum.photos/50?random=99' },
  ];

  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto pb-20 animate-in fade-in duration-300">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-800 py-3 flex justify-center items-center">
        <span className="font-bold text-base">All Activity</span>
      </div>

      {/* List */}
      <div className="p-4 space-y-6">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative">
                <img src={item.avatar} alt={item.user} className="w-12 h-12 rounded-full object-cover bg-gray-800" />
                {item.type === 'like' && (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border border-black">
                        <Heart className="w-3 h-3 text-white fill-white" />
                    </div>
                )}
                 {item.type === 'comment' && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border border-black">
                        <MessageCircle className="w-3 h-3 text-white fill-white" />
                    </div>
                )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{item.user}</div>
              <div className="text-sm text-gray-400">{item.text} <span className="text-gray-600 ml-2">{item.time}</span></div>
            </div>
            {item.type === 'follow' ? (
                 <button className="px-4 py-1.5 bg-[#fe2c55] text-white text-xs font-semibold rounded-sm">Follow back</button>
            ) : (
                <div className="w-10 h-12 bg-gray-800 rounded-sm overflow-hidden">
                     <img src={`https://picsum.photos/50/60?random=${item.id}`} alt="preview" className="w-full h-full object-cover" />
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxView;