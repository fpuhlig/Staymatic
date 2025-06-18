export const Navigation = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center items-center h-14">
          <div className="flex space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl font-medium transition-colors duration-200">
              Properties
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl font-medium transition-colors duration-200">
              About
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl font-medium transition-colors duration-200">
              Contact
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl font-medium transition-colors duration-200">
              Help
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}; 