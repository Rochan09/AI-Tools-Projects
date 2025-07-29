import React from 'react';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  website: string;
  logo: string;
  tags: string[];
  featured: boolean;
}

interface ToolCardProps {
  tool: Tool;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: number) => void;
}

export default function ToolCard({ tool, isBookmarked, onToggleBookmark }: ToolCardProps) {
  const handleCardClick = () => {
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(tool.id);
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'Popular':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'Free':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'New':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      case 'Paid':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400';
      case 'Freemium':
        return 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400';
      case 'Open Source':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-1 ${
        tool.featured ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''
      }`}
    >
      {tool.featured && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
          Featured
        </div>
      )}
      
      <button
        onClick={handleBookmarkClick}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 z-10 group-hover:scale-110"
        title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      >
        {isBookmarked ? (
          <BookmarkCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        ) : (
          <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" />
        )}
      </button>

      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
            <img 
              src={tool.logo} 
              alt={`${tool.name} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTIiIGZpbGw9IiNGMUY1RjkiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0ibWFyZ2luOiAxMnB4Ij4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNjM2NkYxIi8+Cjwvc3ZnPgo8L3N2Zz4K';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
              {tool.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              {tool.category}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visit Tool
          </span>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
}