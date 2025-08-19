import React from 'react';
import { Search, Filter, Sun, Moon, Bookmark } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showBookmarks: boolean;
  setShowBookmarks: (show: boolean) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  isDarkMode,
  toggleDarkMode,
  showBookmarks,
  setShowBookmarks
}: HeaderProps) {
  return (
    <header className="bg-[#f8fafc] dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Left: Logo and Title */}
          <div className="flex items-center space-x-2 min-w-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 rounded-full shadow-sm shrink-0 bg-white object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://ui-avatars.com/api/?name=AI&background=eeeeee&color=555555&size=64';
              }}
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent truncate">
              AI Tools Directory
            </h1>
          </div>
          {/* Right: Search and Icons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search AI tools by type or name…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-[#fafdff] dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                showBookmarks 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              title="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Categories Row */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              selectedCategory === 'All'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/15 scale-105'
                : 'bg-[#f1f5f9] dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#e2e8f0] dark:hover:bg-gray-700 hover:scale-105'
            }`}
            style={{ minWidth: 70 }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/15 scale-105'
                  : 'bg-[#f1f5f9] dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#e2e8f0] dark:hover:bg-gray-700 hover:scale-105'
              }`}
              style={{ minWidth: 70 }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}