import { useState, useEffect, useCallback, useRef } from 'react'
import Header from '../components/Header'
import { ArrowLeft, ArrowRight, Trash2, Plus, CheckCircle2, Circle } from 'lucide-react'

const TodoList = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const inputValueRef = useRef(inputValue)

  // Update ref whenever inputValue changes
  useEffect(() => {
    inputValueRef.current = inputValue
  }, [inputValue])

  // Load todos from localStorage on mount ONLY
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todoListTodos')
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos))
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save todos to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('todoListTodos', JSON.stringify(todos))
      } catch (error) {
        console.error('Error saving todos:', error)
      }
    }
  }, [todos, isLoaded])

  const texts = {
    ar: {
      title: 'قائمة المهام',
      description: 'أدر مهامك اليومية وتابع إنجازاتك',
      placeholder: 'أدخل مهمة جديدة...',
      addButton: 'إضافة',
      backHome: 'العودة للرئيسية',
      noTasks: 'لا توجد مهام',
      allTasks: 'جميع المهام',
      activeTasks: 'المهام النشطة',
      completedTasks: 'المهام المكتملة',
      clearCompleted: 'حذف المكتملة',
      clearAll: 'حذف الكل',
      stats: 'الإحصائيات',
      total: 'إجمالي المهام',
      completed: 'مكتملة',
      active: 'نشطة',
      completionRate: 'نسبة الإنجاز',
    },
    en: {
      title: 'To-do List',
      description: 'Manage your daily tasks and track your achievements',
      placeholder: 'Enter a new task...',
      addButton: 'Add',
      backHome: 'Back to Home',
      noTasks: 'No tasks',
      allTasks: 'All Tasks',
      activeTasks: 'Active Tasks',
      completedTasks: 'Completed Tasks',
      clearCompleted: 'Clear Completed',
      clearAll: 'Clear All',
      stats: 'Statistics',
      total: 'Total Tasks',
      completed: 'Completed',
      active: 'Active',
      completionRate: 'Completion Rate',
    },
  }

  const t = texts[language]

  // Memoized callback for adding tasks
  const handleAddTask = useCallback(() => {
    const taskText = inputValueRef.current.trim()

    if (taskText === '') {
      return
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])

    setInputValue('')
  }, [])

  // Memoized callback for deleting tasks
  const handleDeleteTask = useCallback((taskId) => {
    setTodos(prev => prev.filter(task => task.id !== taskId))
  }, [])

  // Memoized callback for toggling task completion
  const handleToggleComplete = useCallback((taskId) => {
    setTodos(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])

  // Memoized callback for clearing completed tasks
  const handleClearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(task => !task.completed))
  }, [])

  // Memoized callback for clearing all tasks
  const handleClearAll = useCallback(() => {
    setTodos([])
  }, [])

  // Filter todos based on filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Calculate statistics
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const activeTodos = totalTodos - completedTodos
  const completionRate = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100)

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
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.title}</h1>
            <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.description}
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div
              className={`p-4 rounded-xl text-center ${
                darkMode
                  ? 'bg-blue-950/30 border border-blue-700'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {totalTodos}
              </p>
              <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.total}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl text-center ${
                darkMode
                  ? 'bg-green-950/30 border border-green-700'
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {completedTodos}
              </p>
              <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.completed}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl text-center ${
                darkMode
                  ? 'bg-yellow-950/30 border border-yellow-700'
                  : 'bg-yellow-50 border border-yellow-200'
              }`}
            >
              <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {activeTodos}
              </p>
              <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.active}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl text-center ${
                darkMode
                  ? 'bg-purple-950/30 border border-purple-700'
                  : 'bg-purple-50 border border-purple-200'
              }`}
            >
              <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {completionRate}%
              </p>
              <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.completionRate}
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div
            className={`p-6 rounded-2xl mb-6 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTask()
                  }
                }}
                placeholder={t.placeholder}
                className={`flex-1 px-4 py-3 rounded-lg outline-none transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500'
                    : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                }`}
              />
              <button
                onClick={handleAddTask}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Plus size={20} />
                <span className="hidden sm:inline">{t.addButton}</span>
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === 'all'
                    ? darkMode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t.allTasks}
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === 'active'
                    ? darkMode
                      ? 'bg-yellow-600 text-white'
                      : 'bg-yellow-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t.activeTasks}
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === 'completed'
                    ? darkMode
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t.completedTasks}
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div
            className={`p-6 rounded-2xl mb-6 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            }`}
          >
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.noTasks}
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`p-4 rounded-lg flex items-center justify-between gap-3 transition-all duration-200 ${
                      darkMode
                        ? 'bg-gray-900 hover:bg-gray-800'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handleToggleComplete(todo.id)}
                        className={`flex-shrink-0 transition-all duration-200 ${
                          todo.completed
                            ? darkMode
                              ? 'text-green-400'
                              : 'text-green-600'
                            : darkMode
                            ? 'text-gray-500 hover:text-gray-400'
                            : 'text-gray-400 hover:text-gray-500'
                        }`}
                        title={todo.completed ? 'Mark as active' : 'Mark as completed'}
                      >
                        {todo.completed ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <Circle size={24} />
                        )}
                      </button>
                      <span
                        className={`flex-1 text-sm md:text-base transition-all duration-200 break-words ${
                          todo.completed
                            ? darkMode
                              ? 'line-through text-gray-500'
                              : 'line-through text-gray-400'
                            : darkMode
                            ? 'text-gray-100'
                            : 'text-gray-900'
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(todo.id)}
                      className={`p-2 rounded transition-all duration-200 flex-shrink-0 ${
                        darkMode
                          ? 'text-red-400 hover:bg-red-600/20'
                          : 'text-red-600 hover:bg-red-100'
                      }`}
                      title="Delete task"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          {todos.length > 0 && (
            <div className="flex gap-3 flex-wrap justify-center mb-8">
              {completedTodos > 0 && (
                <button
                  onClick={handleClearCompleted}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {t.clearCompleted}
                </button>
              )}
              <button
                onClick={handleClearAll}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {t.clearAll}
              </button>
            </div>
          )}

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

export default TodoList