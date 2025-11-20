import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Heart } from 'lucide-react';
import { Comment } from '../types';
import { generateWittyComment } from '../services/gemini';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
  videoDescription: string;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
  videoDescription
}) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && commentsEndRef.current) {
        commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, comments]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      onAddComment(input);
      setInput('');
    }
  };

  const handleAIComment = async () => {
    setIsGenerating(true);
    const comment = await generateWittyComment(videoDescription);
    setInput(comment);
    setIsGenerating(false);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div 
        className="w-full h-[70vh] bg-[#121212] rounded-t-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="w-6" /> {/* Spacer */}
          <span className="font-semibold text-sm">{comments.length} comments</span>
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          {comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm opacity-60">
                <p>No comments yet. Be the first!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img 
                  src={comment.avatar} 
                  alt={comment.username} 
                  className="w-8 h-8 rounded-full bg-gray-700 object-cover"
                />
                <div className="flex-1">
                  <div className="text-xs text-gray-400 font-semibold mb-1">{comment.username}</div>
                  <p className="text-sm text-gray-200 leading-tight">{comment.text}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{comment.timestamp}</span>
                    <span className="font-semibold">Reply</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Heart className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">{comment.likes}</span>
                </div>
              </div>
            ))
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800 bg-[#121212] mb-safe">
            <div className="flex gap-2 items-center mb-2">
                <button 
                    onClick={handleAIComment}
                    disabled={isGenerating}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-xs font-medium hover:bg-purple-900/50 transition-colors disabled:opacity-50"
                >
                    <Sparkles className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Thinking...' : 'AI Suggestion'}
                </button>
            </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-900 text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className={`p-2 rounded-full ${input.trim() ? 'text-[#fe2c55] bg-[#fe2c55]/10' : 'text-gray-600'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentDrawer;
