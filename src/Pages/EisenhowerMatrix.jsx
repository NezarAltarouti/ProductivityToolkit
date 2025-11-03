import { useState, useEffect, useCallback, memo, useRef } from 'react'
import Header from '../components/Header'
import { ArrowLeft, ArrowRight, Trash2, Plus } from 'lucide-react'

// Memoized Quadrant Component to prevent unnecessary re-renders
const QuadrantCard = memo(({ 
  quadrant, 
  title, 
  description, 
  bgColor, 
  borderColor,
  tasks,
  inputValue,
  onInputChange,
  onAddTask,
  onDeleteTask,
  onToggleComplete,
  onClearAll,
  darkMode,
  placeholder,
  noTasksText,
  clearAllText
}) => {
  return (
    <div className={`p-6 rounded-2xl border-2 ${borderColor} transition-all duration-300 ${bgColor}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold mb-1">{title}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAddTask()
            }
          }}
          placeholder={placeholder}
          className={`flex-1 px-3 py-2 rounded-lg outline-none transition-all duration-200 text-sm ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500'
              : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
          }`}
        />
        <button
          onClick={onAddTask}
          className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-1 ${
            darkMode
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Tasks List */}
      <div className="mb-3 max-h-64 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className={`text-center py-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {noTasksText}
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`p-3 rounded-lg flex items-center justify-between gap-2 transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="w-4 h-4 rounded cursor-pointer flex-shrink-0"
                  />
                  <span
                    className={`flex-1 text-sm transition-all duration-200 break-words ${
                      task.completed
                        ? darkMode
                          ? 'line-through text-gray-500'
                          : 'line-through text-gray-400'
                        : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className={`p-2 rounded transition-all duration-200 flex-shrink-0 ${
                    darkMode
                      ? 'text-red-400 hover:bg-red-600/20'
                      : 'text-red-600 hover:bg-red-100'
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clear All Button */}
      {tasks.length > 0 && (
        <button
          onClick={onClearAll}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            darkMode
              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
              : 'bg-red-100 text-red-600 hover:bg-red-200'
          }`}
        >
          {clearAllText}
        </button>
      )}
    </div>
  )
})

QuadrantCard.displayName = 'QuadrantCard'

const EisenhowerMatrix = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [tasks, setTasks] = useState({
    doFirst: [],
    schedule: [],
    delegate: [],
    eliminate: [],
  })

  const [inputValues, setInputValues] = useState({
    doFirst: '',
    schedule: '',
    delegate: '',
    eliminate: '',
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const inputValuesRef = useRef(inputValues)

  // Update ref whenever inputValues changes
  useEffect(() => {
    inputValuesRef.current = inputValues
  }, [inputValues])

  // Load tasks and input values from localStorage on mount ONLY
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('eisenhowerTasks')
      const savedInputs = localStorage.getItem('eisenhowerInputs')

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }

      if (savedInputs) {
        setInputValues(JSON.parse(savedInputs))
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
    }

    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('eisenhowerTasks', JSON.stringify(tasks))
      } catch (error) {
        console.error('Error saving tasks:', error)
      }
    }
  }, [tasks, isLoaded])

  // Save input values to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('eisenhowerInputs', JSON.stringify(inputValues))
      } catch (error) {
        console.error('Error saving inputs:', error)
      }
    }
  }, [inputValues, isLoaded])

  const texts = {
    ar: {
      title: 'مصفوفة أيزنهاور',
      description: 'نظم مهامك بناءً على الأولوية والاستعجالية',
      doFirst: 'افعلها الآن',
      doFirstDesc: 'مهم وعاجل',
      schedule: 'جدول لاحقاً',
      scheduleDesc: 'مهم غير عاجل',
      delegate: 'فوض الآخرين',
      delegateDesc: 'غير مهم وعاجل',
      eliminate: 'ألغِ المهام',
      eliminateDesc: 'غير مهم وغير عاجل',
      addTask: 'إضافة مهمة',
      placeholder: 'أدخل مهمة جديدة...',
      backHome: 'العودة للرئيسية',
      noTasks: 'لا توجد مهام',
      clearAll: 'حذف الكل',
    },
    en: {
      title: 'Eisenhower Matrix',
      description: 'Organize your tasks based on priority and urgency',
      doFirst: 'Do First',
      doFirstDesc: 'Important & Urgent',
      schedule: 'Schedule',
      scheduleDesc: 'Important & Not Urgent',
      delegate: 'Delegate',
      delegateDesc: 'Not Important & Urgent',
      eliminate: 'Eliminate',
      eliminateDesc: 'Not Important & Not Urgent',
      addTask: 'Add Task',
      placeholder: 'Enter a new task...',
      backHome: 'Back to Home',
      noTasks: 'No tasks',
      clearAll: 'Clear All',
    },
  }

  const t = texts[language]

  // Memoized callback for input changes
  const handleInputChange = useCallback((quadrant, value) => {
    setInputValues(prev => ({
      ...prev,
      [quadrant]: value
    }))
  }, [])

  // Fixed callback for adding tasks - using ref to avoid closure issues
  const handleAddTask = useCallback((quadrant) => {
    const taskText = inputValuesRef.current[quadrant].trim()
    
    if (taskText === '') {
      return
    }

    // Add task
    setTasks(prevTasks => ({
      ...prevTasks,
      [quadrant]: [
        ...prevTasks[quadrant],
        {
          id: Date.now(),
          text: taskText,
          completed: false,
        },
      ],
    }))

    // Clear input - separate state update
    setInputValues(prevInputs => ({
      ...prevInputs,
      [quadrant]: '',
    }))
  }, [])

  // Memoized callback for deleting tasks
  const handleDeleteTask = useCallback((quadrant, taskId) => {
    setTasks(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].filter(task => task.id !== taskId),
    }))
  }, [])

  // Memoized callback for toggling task completion
  const handleToggleComplete = useCallback((quadrant, taskId) => {
    setTasks(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }))
  }, [])

  // Memoized callback for clearing all tasks
  const handleClearAll = useCallback((quadrant) => {
    setTasks(prev => ({
      ...prev,
      [quadrant]: [],
    }))
  }, [])

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
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.title}</h1>
            <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.description}
            </p>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Do First - Red */}
            <QuadrantCard
              quadrant="doFirst"
              title={t.doFirst}
              description={t.doFirstDesc}
              bgColor={darkMode ? 'bg-red-950/20' : 'bg-red-50/50'}
              borderColor={darkMode ? 'border-red-700' : 'border-red-300'}
              tasks={tasks.doFirst}
              inputValue={inputValues.doFirst}
              onInputChange={(value) => handleInputChange('doFirst', value)}
              onAddTask={() => handleAddTask('doFirst')}
              onDeleteTask={(taskId) => handleDeleteTask('doFirst', taskId)}
              onToggleComplete={(taskId) => handleToggleComplete('doFirst', taskId)}
              onClearAll={() => handleClearAll('doFirst')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noTasksText={t.noTasks}
              clearAllText={t.clearAll}
            />

            {/* Schedule - Yellow */}
            <QuadrantCard
              quadrant="schedule"
              title={t.schedule}
              description={t.scheduleDesc}
              bgColor={darkMode ? 'bg-yellow-950/20' : 'bg-yellow-50/50'}
              borderColor={darkMode ? 'border-yellow-700' : 'border-yellow-300'}
              tasks={tasks.schedule}
              inputValue={inputValues.schedule}
              onInputChange={(value) => handleInputChange('schedule', value)}
              onAddTask={() => handleAddTask('schedule')}
              onDeleteTask={(taskId) => handleDeleteTask('schedule', taskId)}
              onToggleComplete={(taskId) => handleToggleComplete('schedule', taskId)}
              onClearAll={() => handleClearAll('schedule')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noTasksText={t.noTasks}
              clearAllText={t.clearAll}
            />

            {/* Delegate - Blue */}
            <QuadrantCard
              quadrant="delegate"
              title={t.delegate}
              description={t.delegateDesc}
              bgColor={darkMode ? 'bg-blue-950/20' : 'bg-blue-50/50'}
              borderColor={darkMode ? 'border-blue-700' : 'border-blue-300'}
              tasks={tasks.delegate}
              inputValue={inputValues.delegate}
              onInputChange={(value) => handleInputChange('delegate', value)}
              onAddTask={() => handleAddTask('delegate')}
              onDeleteTask={(taskId) => handleDeleteTask('delegate', taskId)}
              onToggleComplete={(taskId) => handleToggleComplete('delegate', taskId)}
              onClearAll={() => handleClearAll('delegate')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noTasksText={t.noTasks}
              clearAllText={t.clearAll}
            />

            {/* Eliminate - Gray */}
            <QuadrantCard
              quadrant="eliminate"
              title={t.eliminate}
              description={t.eliminateDesc}
              bgColor={darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}
              borderColor={darkMode ? 'border-gray-600' : 'border-gray-300'}
              tasks={tasks.eliminate}
              inputValue={inputValues.eliminate}
              onInputChange={(value) => handleInputChange('eliminate', value)}
              onAddTask={() => handleAddTask('eliminate')}
              onDeleteTask={(taskId) => handleDeleteTask('eliminate', taskId)}
              onToggleComplete={(taskId) => handleToggleComplete('eliminate', taskId)}
              onClearAll={() => handleClearAll('eliminate')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noTasksText={t.noTasks}
              clearAllText={t.clearAll}
            />
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

export default EisenhowerMatrix