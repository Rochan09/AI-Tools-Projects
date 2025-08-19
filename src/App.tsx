import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import aiToolsData from './data/aiTools.json';

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

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedTools, setBookmarkedTools] = useLocalStorage<number[]>('bookmarkedTools', []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const tools: Tool[] = aiToolsData;
  
  const categories = useMemo(() => {
    return Array.from(new Set(tools.map(tool => tool.category))).sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filter by bookmarks if showing bookmarks only
    if (showBookmarks) {
      filtered = filtered.filter(tool => bookmarkedTools.includes(tool.id));
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by featured first, then by name
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [tools, selectedCategory, searchQuery, showBookmarks, bookmarkedTools]);

  const toggleBookmark = (toolId: number) => {
    setBookmarkedTools((prev: number[]) =>
      prev.includes(toolId)
        ? prev.filter((id: number) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {showBookmarks ? 'Bookmarked Tools' : 'Discover AI Tools'}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            </span>
          </div>
          {showBookmarks && bookmarkedTools.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start bookmarking your favorite AI tools to see them here.
              </p>
              <button
                onClick={() => setShowBookmarks(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Browse All Tools
              </button>
            </div>
          )}
          {!showBookmarks && filteredTools.length === 0 && searchQuery && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tools found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {filteredTools.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isBookmarked={bookmarkedTools.includes(tool.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 AI Tools Directory. Discover the best AI tools for your workflow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;