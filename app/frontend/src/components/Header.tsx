import { DarkModeToggle } from './DarkModeToggle';

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Staymatic</h1>
            <span className="text-gray-500 dark:text-gray-400 hidden sm:block">Find your perfect stay</span>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-xl font-medium transition-colors duration-200">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}; 