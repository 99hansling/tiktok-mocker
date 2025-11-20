export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface VideoData {
  id: string;
  url: string;
  username: string;
  userAvatar: string;
  description: string;
  songName: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isFavorited: boolean;
  commentList: Comment[];
}

export interface VideoCardProps {
  video: VideoData;
  isActive: boolean;
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onShare: (id: string) => void;
  onOpenComments: (id: string) => void;
  onProfileClick: (username: string) => void;
}