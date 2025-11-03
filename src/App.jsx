import { useState, useEffect } from 'react'
import Home from './pages/Home'
import EisenhowerMatrix from './pages/EisenhowerMatrix'
import Pomodoro from './pages/Pomodoro'
import TodoList from './pages/TodoList'
import Notes from './pages/Notes'
import SWOTModel from './pages/SWOTModel'
import WelcomeAnimation from './Components/WelcomeAnimation'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('ar')
  const [mounted, setMounted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  // Initialize dark mode and language from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    let isDark = false

    if (savedDarkMode !== null) {
      isDark = JSON.parse(savedDarkMode)
    } else {
      // Use system preference if nothing is saved
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Apply immediately to DOM before React renders
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    setDarkMode(isDark)

    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage !== null) {
      setLanguage(savedLanguage)
    }

    setMounted(true)
  }, [])

  // Update DOM immediately when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const navigateTo = (page) => setCurrentPage(page)
  
  // Toggle dark mode - updates state which triggers useEffect to update DOM
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  
  const toggleLanguage = () => setLanguage(language === 'ar' ? 'en' : 'ar')

  const commonProps = {
    navigateTo,
    darkMode,
    toggleDarkMode,
    language,
    toggleLanguage,
  }

  // Determine font class based on language
  const fontClass = language === 'ar' ? 'font-ar' : 'font-sans'

return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'} 
      className={`${darkMode ? 'dark' : ''} ${fontClass}`}
      lang={language === 'ar' ? 'ar' : 'en'}
    >
      {/* Welcome Animation */}
      {showWelcome && (
        <WelcomeAnimation
          onComplete={() => setShowWelcome(false)}
          darkMode={darkMode}
          language={language}
        />
      )}

      {currentPage === 'home' && <Home {...commonProps} />}
      {currentPage === 'eisenhower' && <EisenhowerMatrix {...commonProps} />}
      {currentPage === 'pomodoro' && <Pomodoro {...commonProps} />}
      {currentPage === 'todo' && <TodoList {...commonProps} />}
      {currentPage === 'notes' && <Notes {...commonProps} />}
      {currentPage === 'swot' && <SWOTModel {...commonProps} />}
    </div>
  )}

export default App