import { Sun, Moon, Globe } from 'lucide-react'

const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700'
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'مساعدك' : 'Assistant'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`p-2 md:p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
            }`}
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe size={18} className="md:size-20" />
            <span className="hidden sm:inline text-sm md:text-base font-medium">
              {language === 'ar' ? 'EN' : 'AR'}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
            }`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun size={20} className="md:size-20" /> : <Moon size={20} className="md:size-20" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header