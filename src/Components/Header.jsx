import { Sun, Moon, Globe } from 'lucide-react'

const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      darkMode
        ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700'
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'مساعدك' : 'Assistant'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`px-3 sm:px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 h-10 w-10 sm:w-auto ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
            }`}
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <div className="flex items-center justify-center">
              <Globe size={16} />
            </div>
            <span className="hidden sm:inline text-xs md:text-sm font-medium">
              {language === 'ar' ? 'EN' : 'AR'}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`px-3 sm:px-3 py-2 rounded-lg transition-all duration-200 h-10 w-10 sm:w-10 flex items-center justify-center ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
            }`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header