import { useState, useEffect, useCallback, useRef } from 'react'
import Header from '../components/Header'
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react'

const Pomodoro = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  // State for timer
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [isLoaded, setIsLoaded] = useState(false)
  const intervalRef = useRef(null)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('pomodoroState')
      if (savedState) {
        const state = JSON.parse(savedState)
        setTimeLeft(state.timeLeft || 25 * 60)
        setSessionsCompleted(state.sessionsCompleted || 0)
        setIsBreak(state.isBreak || false)
        setWorkMinutes(state.workMinutes || 25)
        setBreakMinutes(state.breakMinutes || 5)
      }
    } catch (error) {
      console.error('Error loading Pomodoro state:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        const state = {
          timeLeft,
          sessionsCompleted,
          isBreak,
          workMinutes,
          breakMinutes,
        }
        localStorage.setItem('pomodoroState', JSON.stringify(state))
      } catch (error) {
        console.error('Error saving Pomodoro state:', error)
      }
    }
  }, [timeLeft, sessionsCompleted, isBreak, workMinutes, breakMinutes, isLoaded])

  // Timer logic
  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Timer finished
          if (isBreak) {
            // Break finished, start new work session
            setIsBreak(false)
            setSessionsCompleted((prev) => prev + 1)
            return workMinutes * 60
          } else {
            // Work session finished, start break
            setIsBreak(true)
            return breakMinutes * 60
          }
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, isBreak, workMinutes, breakMinutes])

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Toggle timer
  const toggleTimer = useCallback(() => {
    setIsActive(!isActive)
  }, [isActive])

  // Reset timer
  const resetTimer = useCallback(() => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(workMinutes * 60)
  }, [workMinutes])

  // Clear everything (reset to defaults)
  const clearEverything = useCallback(() => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(25 * 60)
    setSessionsCompleted(0)
    setWorkMinutes(25)
    setBreakMinutes(5)
  }, [])

  // Skip to next session
  const skipSession = useCallback(() => {
    setIsActive(false)
    if (isBreak) {
      setIsBreak(false)
      setSessionsCompleted((prev) => prev + 1)
      setTimeLeft(workMinutes * 60)
    } else {
      setIsBreak(true)
      setTimeLeft(breakMinutes * 60)
    }
  }, [isBreak, workMinutes, breakMinutes])

  // Update work minutes
  const updateWorkMinutes = useCallback((minutes) => {
    setWorkMinutes(Math.max(1, Math.min(60, minutes)))
    if (!isActive && !isBreak) {
      setTimeLeft(Math.max(1, Math.min(60, minutes)) * 60)
    }
  }, [isActive, isBreak])

  // Update break minutes
  const updateBreakMinutes = useCallback((minutes) => {
    setBreakMinutes(Math.max(1, Math.min(60, minutes)))
  }, [])

  // Calculate progress percentage
  const maxTime = isBreak ? breakMinutes * 60 : workMinutes * 60
  const progress = ((maxTime - timeLeft) / maxTime) * 100

  const texts = {
    ar: {
      title: 'تقنية بومودورو',
      description: 'أتقن إدارة وقتك مع تقنية بومودورو',
      workSession: 'جلسة عمل',
      breakTime: 'وقت الراحة',
      sessionsCompleted: 'جلسات مكتملة',
      workDuration: 'مدة العمل (دقائق)',
      breakDuration: 'مدة الراحة (دقائق)',
      start: 'ابدأ',
      pause: 'إيقاف مؤقت',
      reset: 'إعادة تعيين',
      skip: 'تخطي',
      clearAll: 'حذف الكل',
      backHome: 'العودة للرئيسية',
      settings: 'الإعدادات',
    },
    en: {
      title: 'Pomodoro Technique',
      description: 'Master time management with the Pomodoro Technique',
      workSession: 'Work Session',
      breakTime: 'Break Time',
      sessionsCompleted: 'Sessions Completed',
      workDuration: 'Work Duration (minutes)',
      breakDuration: 'Break Duration (minutes)',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      skip: 'Skip',
      clearAll: 'Clear All',
      backHome: 'Back to Home',
      settings: 'Settings',
    },
  }

  const t = texts[language]

  if (!isLoaded) {
    return null
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.title}</h1>
            <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.description}
            </p>
          </div>

          {/* Main Timer Container */}
          <div
            className={`p-8 md:p-12 rounded-3xl mb-8 transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            }`}
          >
            {/* Session Type Indicator */}
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-2 rounded-full font-semibold mb-4 ${
                isBreak
                  ? darkMode
                    ? 'bg-green-900/30 text-green-400'
                    : 'bg-green-100 text-green-700'
                  : darkMode
                  ? 'bg-red-900/30 text-red-400'
                  : 'bg-red-100 text-red-700'
              }`}>
                {isBreak ? t.breakTime : t.workSession}
              </div>
            </div>

            {/* Timer Display with Circular Progress */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={darkMode ? '#374151' : '#e5e7eb'}
                  strokeWidth="2"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isBreak ? '#10b981' : '#ef4444'}
                  strokeWidth="3"
                  strokeDasharray={`${(2 * Math.PI * 45 * progress) / 100} ${2 * Math.PI * 45}`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Time Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions Completed */}
            <div className="text-center mb-8">
              <p className={`text-lg font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t.sessionsCompleted}: {sessionsCompleted}
              </p>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3 md:gap-4 justify-center mb-8 flex-wrap">
              <button
                onClick={toggleTimer}
                className={`px-6 md:px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause size={20} />
                    {t.pause}
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    {t.start}
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className={`px-6 md:px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                }`}
              >
                <RotateCcw size={20} />
                {t.reset}
              </button>

              <button
                onClick={skipSession}
                className={`px-6 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {t.skip}
              </button>

              <button
                onClick={clearEverything}
                className={`px-6 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {t.clearAll}
              </button>
            </div>
          </div>

          {/* Settings Section */}
          <div
            className={`p-6 md:p-8 rounded-2xl mb-8 transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            }`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              {t.settings}
            </h3>

            {/* Work Duration */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">
                {t.workDuration}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={workMinutes}
                  onChange={(e) => updateWorkMinutes(parseInt(e.target.value))}
                  disabled={isActive}
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: isActive
                      ? '#d1d5db'
                      : darkMode
                      ? '#4f46e5'
                      : '#3b82f6',
                  }}
                />
                <div
                  className={`text-center px-4 py-2 rounded-lg font-semibold min-w-16 ${
                    darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {workMinutes}
                </div>
              </div>
            </div>

            {/* Break Duration */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                {t.breakDuration}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={breakMinutes}
                  onChange={(e) => updateBreakMinutes(parseInt(e.target.value))}
                  disabled={isActive}
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: isActive
                      ? '#d1d5db'
                      : darkMode
                      ? '#10b981'
                      : '#34d399',
                  }}
                />
                <div
                  className={`text-center px-4 py-2 rounded-lg font-semibold min-w-16 ${
                    darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {breakMinutes}
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigateTo('home')}
              className={`px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                darkMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {language === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              {t.backHome}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pomodoro