import React from 'react';
import { Search, Hash, Music2 } from 'lucide-react';

const DiscoverView: React.FC = () => {
  const tags = ['viral', 'comedy', 'dance', 'sports', 'pets', 'gaming'];
  
  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto pb-20 no-scrollbar">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-black p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2.5 rounded-sm text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Banner */}
      <div className="w-full h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4 flex items-center justify-center">
         <h2 className="text-2xl font-bold drop-shadow-md">Trending Now</h2>
      </div>

      {/* Trending Hashtags */}
      <div className="space-y-6 px-2">
        {tags.map((tag) => (
          <div key={tag} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
                    <Hash className="w-4 h-4 text-gray-300" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm">#{tag}</h3>
                    <p className="text-xs text-gray-400">Trending</p>
                 </div>
              </div>
              <div className="px-3 py-1 bg-gray-800 text-xs font-semibold rounded-sm">
                 {Math.floor(Math.random() * 100)}M >
              </div>
            </div>
            
            {/* Horizontal Scroll Preview */}
            <div className="flex gap-1 overflow-x-auto no-scrollbar pb-2">
               {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-24 h-32 bg-gray-800 shrink-0 rounded-sm overflow-hidden">
                      <img 
                        src={`https://picsum.photos/100/150?random=${tag}${i}`} 
                        alt="thumb" 
                        className="w-full h-full object-cover"
                      />
                  </div>
               ))}
            </div>
            <div className="h-[1px] bg-gray-900 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverView;