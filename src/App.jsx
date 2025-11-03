import { useState, useEffect } from 'react'
import Home from './pages/Home'
import EisenhowerMatrix from './pages/EisenhowerMatrix'
import Pomodoro from './pages/Pomodoro'
import TodoList from './pages/TodoList'
import CreateSchedule from './pages/CreateSchedule'
import Notes from './pages/Notes'
import SWOTModel from './pages/SWOTModel'
import JohariWindow from './pages/JohariWindow'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('ar')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navigateTo = (page) => setCurrentPage(page)
  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleLanguage = () => setLanguage(language === 'ar' ? 'en' : 'ar')

  const commonProps = {
    navigateTo,
    darkMode,
    toggleDarkMode,
    language,
    toggleLanguage,
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={darkMode ? 'dark' : ''}>
      {currentPage === 'home' && <Home {...commonProps} />}
      {currentPage === 'eisenhower' && <EisenhowerMatrix {...commonProps} />}
      {currentPage === 'pomodoro' && <Pomodoro {...commonProps} />}
      {currentPage === 'todo' && <TodoList {...commonProps} />}
      {currentPage === 'schedule' && <CreateSchedule {...commonProps} />}
      {currentPage === 'notes' && <Notes {...commonProps} />}
      {currentPage === 'swot' && <SWOTModel {...commonProps} />}
      {currentPage === 'johari' && <JohariWindow {...commonProps} />}
    </div>
  )
}

export default App